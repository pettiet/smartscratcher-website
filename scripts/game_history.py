#!/usr/bin/env python3
"""Per-game daily history of prizes remaining.

Writes one file per state to data/history/<state>.json:

    {
      "state": "ok",
      "schema": 1,
      "games": {
        "761": {
          "name": "$2,000 STACKED", "cost": 20.0, "odds": 3.15,
          "prizes_total": 240047,
          "points": [["2026-08-14", 81234, 240047], ["2026-08-15", 81002, 240047], ...]
        }
      }
    }

Each point is [data_date, prizes_left, prizes_total], both summed across
every prize tier. Estimated tickets sold between two points is
(prizes_left[a] - prizes_left[b]) * odds. prizes_total normally never
moves; when it jumps, the lottery reprinted the game, and prizes_left
jumps with it, so readers should treat that step as a reprint rather
than negative sales. Some days repeat the previous count (the lottery
did not publish) and some states skip days entirely; spread the delta
across the gap rather than charting a spike. Keep the raw counts in the
file and derive sales at read time so the method can change without
rewriting history.

Usage:
    game_history.py append            # upsert today's data/games/*.json
    game_history.py backfill          # rebuild from every git commit
    game_history.py show <state> <n>  # print one game's daily series
"""
import json
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
GAMES_DIR = ROOT / "data" / "games"
HIST_DIR = ROOT / "data" / "history"


def load_history(state):
    path = HIST_DIR / f"{state}.json"
    if path.exists():
        return json.loads(path.read_text())
    return {"state": state, "schema": 1, "games": {}}


def save_history(hist):
    HIST_DIR.mkdir(parents=True, exist_ok=True)
    path = HIST_DIR / f"{hist['state']}.json"
    path.write_text(json.dumps(hist, separators=(",", ":"), sort_keys=True) + "\n")


def upsert(hist, snapshot):
    """Fold one data/games/<state>.json snapshot into the history."""
    date = snapshot["updated"]
    for g in snapshot["games"]:
        prizes = g.get("prizes") or []
        if not prizes or g.get("odds") in (None, 0):
            continue
        left = sum(int(p["left"]) for p in prizes)
        total = sum(int(p["total"]) for p in prizes)
        rec = hist["games"].setdefault(g["n"], {"points": []})
        rec["name"] = g["name"]
        rec["cost"] = g["cost"]
        rec["odds"] = g["odds"]
        rec["prizes_total"] = total
        pts = rec["points"]
        for pt in pts:
            if pt[0] == date:
                pt[1], pt[2] = left, total
                break
        else:
            pts.append([date, left, total])
        pts.sort()


def cmd_append():
    for f in sorted(GAMES_DIR.glob("*.json")):
        snap = json.loads(f.read_text())
        hist = load_history(snap["state"])
        upsert(hist, snap)
        save_history(hist)
        print(f"{snap['state']}: {len(hist['games'])} games through {snap['updated']}")


def git(*args):
    return subprocess.run(["git", *args], cwd=ROOT, check=True,
                          capture_output=True, text=True).stdout


def cmd_backfill():
    # Oldest first, with the state files each commit touched.
    log = git("log", "--reverse", "--format=@%H", "--name-only",
              "--diff-filter=AM", "--", "data/games")
    commits = []
    for line in log.splitlines():
        if line.startswith("@"):
            commits.append((line[1:], []))
        elif line.startswith("data/games/") and line.endswith(".json"):
            commits[-1][1].append(line)
    hists = {}
    for sha, files in commits:
        for rel in files:
            try:
                snap = json.loads(git("show", f"{sha}:{rel}"))
            except (subprocess.CalledProcessError, json.JSONDecodeError):
                continue
            state = snap["state"]
            hist = hists.setdefault(state, {"state": state, "schema": 1, "games": {}})
            upsert(hist, snap)
    for hist in hists.values():
        save_history(hist)
        dates = sorted({pt[0] for g in hist["games"].values() for pt in g["points"]})
        print(f"{hist['state']}: {len(hist['games'])} games, "
              f"{len(dates)} days, {dates[0]} .. {dates[-1]}")


def cmd_show(state, n):
    rec = load_history(state)["games"][n]
    odds = rec["odds"]
    print(f"{rec['name']} (${rec['cost']:g}, odds 1 in {odds}, "
          f"{rec['prizes_total']} prizes printed)")
    print(f"{'date':<12}{'prizes_left':>12}{'claimed':>9}{'~tickets sold':>15}  note")
    prev = None
    for date, left, total in rec["points"]:
        note = ""
        if prev is not None and total != prev[1]:
            note = f"reprint: total {prev[1]} -> {total}"
        claimed = "" if prev is None else prev[0] - left
        sold = "" if prev is None else round(claimed * odds)
        print(f"{date:<12}{left:>12}{claimed:>9}{sold:>15}  {note}")
        prev = (left, total)


if __name__ == "__main__":
    cmd = sys.argv[1] if len(sys.argv) > 1 else "append"
    if cmd == "append":
        cmd_append()
    elif cmd == "backfill":
        cmd_backfill()
    elif cmd == "show" and len(sys.argv) == 4:
        cmd_show(sys.argv[2], sys.argv[3])
    else:
        sys.exit(__doc__)
