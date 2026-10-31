# Game-page FAQ: "How many tickets are left?"

Draft for a fifth "Quick answers" question on every active game page.
The page generator isn't in this repo, so this is the spec to drop into
the template. Visible HTML and the FAQPage JSON-LD must carry the same
text.

## Placement

Second question, right after "How many top prizes are left on …". The
two questions answer the same intent (is this game played out?) and the
tickets question gives the AI-snippet crowd a number they can quote.

## Inputs

| Variable | Source |
|---|---|
| `name`, `state_name`, `cost`, `odds`, `left_pct` | game record |
| `prizes_total` | sum of `total` over all prize tiers |
| `prizes_left` | sum of `left` over all prize tiers |
| `printed_est` | `prizes_total × odds` |
| `left_est` | `prizes_left × odds` |
| `data_date` | same date string the other FAQ answers use |

Use prize-tier sums, not `left_pct`. The percent is a whole number and
is `null` on a few games.

## Rounding

Two significant figures, always with "roughly" or "about" in front.

- 1,000,000 and up: one decimal in millions. `1,561,602 → 1.6 million`, `3,663,592 → 3.7 million`
- Under 1,000,000: nearest 10,000 above 100k, nearest 1,000 below. `720,953 → 720,000`, `108,144 → 110,000`, `84,602 → 85,000`

## Question

```
Roughly how many {name} tickets are left in {state_name}?
```

## Answer template

```
Roughly {left_est} {name} tickets are still out there, out of about
{printed_est} printed.{final_stretch} That's an estimate: the
{state_name} Lottery doesn't publish ticket counts, so we take the
prizes still unclaimed and multiply by the game's overall odds of 1 in
{odds}. On its own this number doesn't tell you whether a ticket is a
good buy. For that, look at which prizes are still unclaimed in the
table above. Based on official {state_name} data from {data_date}.
```

`{final_stretch}` is empty unless `left_pct ≤ 15`, then:

```
 That's about {left_pct}% of the print run, so this game is in its
final stretch.
```

Skip the question entirely when `left_pct` is `null` or the game status
is `ended`.

## Filled examples (Oct 14, 2026 data)

**Ultimate Millions, OK #637, $50, 43% left**

> Roughly how many Ultimate Millions tickets are left in Oklahoma?
>
> Roughly 1.6 million Ultimate Millions tickets are still out there, out
> of about 3.7 million printed. That's an estimate: the Oklahoma Lottery
> doesn't publish ticket counts, so we take the prizes still unclaimed
> and multiply by the game's overall odds of 1 in 2.6. On its own this
> number doesn't tell you whether a ticket is a good buy. For that, look
> at which prizes are still unclaimed in the table above. Based on
> official Oklahoma data from Oct 14, 2026.

**Mystery Crossword, OK #806, $10, 10% left**

> Roughly how many Mystery Crossword tickets are left in Oklahoma?
>
> Roughly 85,000 Mystery Crossword tickets are still out there, out of
> about 880,000 printed. That's about 10% of the print run, so this game
> is in its final stretch. That's an estimate: the Oklahoma Lottery
> doesn't publish ticket counts, so we take the prizes still unclaimed
> and multiply by the game's overall odds of 1 in 2.86. On its own this
> number doesn't tell you whether a ticket is a good buy. For that, look
> at which prizes are still unclaimed in the table above. Based on
> official Oklahoma data from Oct 14, 2026.

**14K Gold, OK #853, $2, 84% left**

> Roughly how many 14K Gold tickets are left in Oklahoma?
>
> Roughly 620,000 14K Gold tickets are still out there, out of about
> 740,000 printed. That's an estimate: the Oklahoma Lottery doesn't
> publish ticket counts, so we take the prizes still unclaimed and
> multiply by the game's overall odds of 1 in 4.14. On its own this
> number doesn't tell you whether a ticket is a good buy. For that, look
> at which prizes are still unclaimed in the table above. Based on
> official Oklahoma data from Oct 14, 2026.

## Markup

Visible block, matching the existing `faq-item` pattern:

```html
<details class="faq-item">
  <summary>Roughly how many Ultimate Millions tickets are left in Oklahoma?</summary>
  <p>Roughly 1.6 million Ultimate Millions tickets are still out there, out of about 3.7 million printed. That&#39;s an estimate: the Oklahoma Lottery doesn&#39;t publish ticket counts, so we take the prizes still unclaimed and multiply by the game&#39;s overall odds of 1 in 2.6. On its own this number doesn&#39;t tell you whether a ticket is a good buy. For that, look at which prizes are still unclaimed in the table above. Based on official Oklahoma data from Oct 14, 2026.</p>
</details>
```

JSON-LD entry, inserted as the second item of `mainEntity`:

```json
{
  "@type": "Question",
  "name": "Roughly how many Ultimate Millions tickets are left in Oklahoma?",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Roughly 1.6 million Ultimate Millions tickets are still out there, out of about 3.7 million printed. That's an estimate: the Oklahoma Lottery doesn't publish ticket counts, so we take the prizes still unclaimed and multiply by the game's overall odds of 1 in 2.6. On its own this number doesn't tell you whether a ticket is a good buy. For that, look at which prizes are still unclaimed in the table above. Based on official Oklahoma data from Oct 14, 2026."
  }
}
```

## Why it's worded this way

- "Roughly" leads the question and the answer, so no reader or AI
  summary can quote it as a hard count.
- It names the method in one plain sentence. The method is already on
  the homepage, so nothing paywalled leaks.
- It refuses to say fewer tickets means better chances. Whether a game
  is worth it is the prize table's job on the page and the Score's job
  in the app.
- "Still out there" and "final stretch" keep the gas-station voice
  without any "hurry before it's gone" push.
- Known bias, not stated in the answer: unclaimed prizes include tickets
  already sold but not yet cashed, so the estimate runs a little high.
  Fine for "roughly," worth a line in a future methodology page.

## Brand check

No guarantee language, no real game criticised, no claim that value
only drops over time, no aviation. Disclaimers already live in the
page footer.
