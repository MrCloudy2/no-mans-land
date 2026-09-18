# No Man's Land

An independent news and commentary blog for two writers. Static site — Markdown in, plain HTML out.
Nothing to run on your own server.

## Run it locally

```bash
npm install
npm start        # http://localhost:8080, live reloads as you type
npm run build    # writes the finished site to _site/
```

Node 18 or newer. The only dependency is Eleventy.

## Make it yours

1. **`src/_data/site.js`** — title, tagline, the two author names and bios, nav, and `url`. Set
   `url` to your real domain before launch; the RSS feed uses it to build absolute links.
2. **`src/about.njk`** — rewrite the house rules and put a real contact address in.
3. **Delete the three sample posts** in `src/posts/` once you have written your own. They exist to
   show the front matter and to let you see the design with real text in it.

## Writing a post

Create `src/posts/some-slug.md`. The filename becomes the URL.

```markdown
---
title: The paperwork is the policy
standfirst: One or two sentences that appear under the headline and in the RSS feed.
author: second
date: 2026-09-05
---

Body text in Markdown.
```

`author` is a key from `site.authors` — `cloudy` or `second` as shipped. Rename those keys to
whatever you like, just keep the front matter and `site.js` in sync. Everything else (layout, URL,
feed entry, archive listing) is handled by `src/posts/posts.json`.

Images go in `src/images/` and are referenced as `/images/name.jpg`.

## Writing and reviewing before it goes public

Every post has a `draft` switch in its front matter.

- `draft: true` — the piece is invisible on the public site. No page, no listing, no feed entry.
- `draft: false` — published.

Drafts are always visible while you run `npm start`, so you see your own work in progress. To build
a site that includes drafts on purpose, use `npm run build:drafts`.

That gives you a two-site setup:

| Site | Branch | Build command | Who sees it |
| --- | --- | --- | --- |
| Public | `main` | `npm run build` | Everyone |
| Review | `draft` | `npm run build:drafts` | You two |

On Netlify, add `draft` as a branch deploy and it gets its own URL. `netlify.toml` already switches
the build command for that branch. The review URL is unguessable but not secret — Netlify's password
protection is a paid feature, and Cloudflare Access is the free alternative if that matters to you.

## The editor

`src/static/admin/` holds [Sveltia CMS](https://sveltiacms.app/): a writing interface at
`yoursite.com/admin/` that works properly on a phone. You log in with GitHub, write in a normal
editor with a title field, an author picker and a draft toggle, and pressing save commits the
markdown file to the repo. The host sees the commit and rebuilds. There is no server and no
database — the whole thing is one JavaScript file loaded from a CDN.

Two things before it works:

1. The site has to be in a GitHub repo, deployed from that repo.
2. Open `src/static/admin/config.yml` and change `repo:` to your `owner/repository`.

Point it at the `draft` branch instead of `main` if you would rather everything land in review
first. `/admin/` is excluded in `robots.txt` and carries a `noindex` tag, but anyone can load the
page — it is the GitHub login and your repository permissions that keep people out, so only invite
collaborators you want writing.

## Publish it

Push the repo to GitHub, then pick one:

**Cloudflare Pages** — Create a project, connect the repo, set build command `npm run build` and
output directory `_site`. Free, fast, and it handles the certificate.

**Netlify** — `netlify.toml` is already in the repo, so connecting it is enough.

**GitHub Pages** — Works too, but needs an Actions workflow to run the build. The other two are
less fiddly.

After the first deploy, point your domain at the host and set `url` in `site.js` to match.

## Notes on the design

The look is called **Rail**: white ground, black text, one red, and a left column that carries the
date next to every piece.

- **Colours** live as six custom properties at the top of `src/css/style.css`. The only one you are
  likely to touch is `--red: #e10600`. A deeper `#c1121f` reads more serious; pure `#ff0000` reads
  louder. Change it in one place and it moves everywhere.
- **Type** is Instrument Serif for the wordmark, headlines and pull quotes, Karla for body text,
  navigation and metadata. Both come from Google Fonts via a `<link>` in
  `src/_includes/base.njk`. To stop calling out to Google, download the woff2 files into
  `src/fonts/`, delete those `<link>` tags, and add `@font-face` rules to the stylesheet.
- **The logo** is three bars: black, red gap, black. It is inline SVG in `base.njk` so it inherits
  crisp rendering at any size, and the same shape is in `src/images/favicon.svg` (with a white
  backing square so it survives dark browser tabs) and `src/images/logo.svg` for anywhere else you
  need it. If you change the red, change it in all three.
- **No dark mode.** White paper with one red is the identity; a dark variant would dilute it and
  the red gets harsh on black. If you want one later it is about fifteen lines of CSS.
- **No JavaScript**, no analytics, no cookie banner, nothing to consent to.

### The rail on small screens

Above 44rem the date sits in its own left column. Below that the grid collapses and the date and
author move to a single line above the headline. That breakpoint is in `style.css` under
`@media (max-width: 44rem)`.

## Housekeeping

Corrections in the sample posts sit at the bottom of the piece with a date, and the original wording
stays in the git history. Worth keeping — it is cheap and it is the thing that makes a two-person
blog trustworthy.
