# Tag Trace — Tracking Code Extractor

A single-file, client-side tool that scans pasted HTML (or a fetched URL) and extracts the marketing tracking tags installed on a page — vendor, account/container ID, and the exact `<script>` where it lives — while separating real marketing tags from tracking that's just native to the hosting platform (HubSpot CMS, Shopify, Wix, WordPress.com/Jetpack, Squarespace).

Everything runs in the browser. Nothing pasted or fetched is sent to any server.

## Features

- **Scanner** — paste raw HTML, or fetch a URL directly, and detect ~35 known trackers: GTM, GA4, Google Ads, Meta/LinkedIn/TikTok/X/Pinterest/Snapchat pixels, Hotjar, Lucky Orange, Microsoft Clarity, HubSpot, Segment, chat widgets, B2B visitor-ID tools, and more.
- Groups every destination driven by a single `gtag.js` loader (GA4 + Google Ads + Floodlight) into one card instead of listing them as unrelated tags.
- Detects when a tracker (e.g. HubSpot) is native to the site's hosting platform vs. a deliberately-installed marketing tag, and files it under a separate, hidden-by-default "platform" bucket.
- **Tracker Catalog** — reference glossary of every tracker Tag Trace knows about: what it is, and the standard copy-paste install snippet.
- **Plain Text** — a full plain-text report (title, description, exact code found) of the last scan, ready to paste into a doc, ticket, or client email.

## Usage

**Quick look, paste-only:** open `index.html` directly in any browser — no build step, no dependencies. You can paste HTML manually (View Source / Ctrl-U on any page) and scan it.

**Full URL-fetching, locally:** most sites block cross-origin `fetch()` from a plain browser tab (CORS), so fetching a URL by pasting it into the box only works for the rare site that allows it. To fetch *any* URL's HTML without hitting CORS, run the included local proxy server instead of opening the file directly:

```bash
node server.js
# → Tag Trace running at http://localhost:5173
```

Open `http://localhost:5173` — the "Fetch & Scan" box now tries a direct fetch first, and falls back to the local `/fetch-proxy` endpoint (which fetches server-side, so CORS doesn't apply) whenever the direct one is blocked.

## Deploying

This repo can be served for free via GitHub Pages: **Settings → Pages → Deploy from branch → main → / (root)**. The tool will be live at `https://deiv-jf.github.io/tracking-extractor/` — note that GitHub Pages is static hosting, so the local-proxy fallback for URL fetching only works when running `node server.js` on your own machine, not on the Pages-hosted version.
