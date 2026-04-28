# Contributing

## Conventions

### Open Graph and canonical URLs — always use the `www.` subdomain

All Open Graph meta tags (`og:url`, `og:image`, canonical) must use the
`https://www.smartscratcherapp.com/` prefix, **not** the bare
`smartscratcherapp.com` domain. The bare apex domain currently points to a
different server, so OG previews fail when bare-domain URLs are referenced
in meta tags.

This rule covers, at minimum, these tag types inside `<head>`:

- `<meta property="og:url" content="...">`
- `<meta property="og:image" content="...">`
- `<meta property="og:image:secure_url" content="...">`
- `<meta property="og:image:url" content="...">`
- `<meta name="twitter:image" content="...">`
- `<meta name="twitter:url" content="...">`
- `<link rel="canonical" href="...">`

#### Where to apply it

Every HTML file that gets crawled by social platforms — at minimum:
homepage, blog index, every article in `/articles/`, and any future pages
that surface on social.

#### Where it does **not** apply

In-body links, share buttons, copy-link handlers, footer text, pricing CTAs,
etc. can use whatever URL form the original author wrote — those don't get
scraped by FB/X/LinkedIn and don't affect previews.

#### Quick check before merging a new article

```bash
# Should print nothing — every head-meta URL should already be on www.
grep -nE 'og:url|og:image|twitter:image|twitter:url|canonical' articles/<slug>.html \
  | grep -v 'www\.smartscratcherapp'
```

If anything prints, fix it before merging.
