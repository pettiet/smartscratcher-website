#!/usr/bin/env python3
"""Render share-card HTML templates to 1200x630 PNGs via Playwright.

Templates live in share/templates/<slug>.html.
Outputs land at share/<slug>.png.

Re-run after editing any template:
  python3 share/render.py [slug ...]

With no args, renders every template in share/templates/.
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent
TEMPLATES = ROOT / "templates"


def render(slugs):
    with sync_playwright() as p:
        browser = p.chromium.launch()
        ctx = browser.new_context(viewport={"width": 1200, "height": 630}, device_scale_factor=1)
        page = ctx.new_page()
        for slug in slugs:
            template = TEMPLATES / f"{slug}.html"
            output = ROOT / f"{slug}.png"
            if not template.exists():
                print(f"  ! missing: {template}")
                continue
            page.goto(f"file://{template}")
            # Wait for fonts to be ready before screenshot
            page.evaluate("document.fonts.ready")
            page.wait_for_load_state("networkidle")
            page.screenshot(path=str(output), clip={"x": 0, "y": 0, "width": 1200, "height": 630})
            size = output.stat().st_size
            print(f"  ✓ {slug}.png ({size:,} bytes)")
        browser.close()


if __name__ == "__main__":
    args = sys.argv[1:]
    if args:
        slugs = args
    else:
        slugs = sorted(t.stem for t in TEMPLATES.glob("*.html"))
    print(f"Rendering {len(slugs)} share image(s)...")
    render(slugs)
    print("Done.")
