# Tag Trace — Tracking Code Extractor

A single-file, client-side tool that scans pasted HTML (or a fetched URL) and extracts the marketing tracking tags installed on a page — vendor, account/container ID, and the exact `<script>` where it lives — while separating real marketing tags from tracking that's just native to the hosting platform (HubSpot CMS, Shopify, Wix, WordPress.com/Jetpack, Squarespace).

Everything runs in the browser. Nothing pasted or fetched is sent to any server.

## Features

- **Scanner** — paste raw HTML (or try fetching a URL directly, CORS permitting) and detect ~35 known trackers: GTM, GA4, Google Ads, Meta/LinkedIn/TikTok/X/Pinterest/Snapchat pixels, Hotjar, Lucky Orange, Microsoft Clarity, HubSpot, Segment, chat widgets, B2B visitor-ID tools, and more.
- Groups every destination driven by a single `gtag.js` loader (GA4 + Google Ads + Floodlight) into one card instead of listing them as unrelated tags.
- Detects when a tracker (e.g. HubSpot) is native to the site's hosting platform vs. a deliberately-installed marketing tag, and files it under a separate, hidden-by-default "platform" bucket.
- **Tracker Catalog** — reference glossary of every tracker Tag Trace knows about: what it is, and the standard copy-paste install snippet.
- **Plain Text** — a full plain-text report (title, description, exact code found) of the last scan, ready to paste into a doc, ticket, or client email.

## Usage

Open `index.html` in any browser — no build step, no dependencies.

## Deploying

This repo can be served for free via GitHub Pages: **Settings → Pages → Deploy from branch → main → / (root)**. The tool will be live at `https://deiv-jf.github.io/tracking-extractor/`.
