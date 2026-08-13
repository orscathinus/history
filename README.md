# The History of the World

Version 1.0.0 of an interactive, museum-style world history website built as a lightweight static site for GitHub Pages.

## What is included

- 11 historical sectors, from Prehistory through the Modern Age plus Science & Technology and Space Exploration
- 9 opening exhibits
- interactive master timeline and year slider
- search and an Explore All directory
- interactive human migration visualization
- sector and exhibit deep links using URL hashes
- responsive layouts, keyboard support, reduced-motion support, and image attribution links
- public-domain or freely licensed historical imagery from Wikimedia Commons / NASA sources

## Local preview

No build step is required. Serve the repository root with any static server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

A Pages deployment workflow lives at `.github/workflows/pages.yml` and deploys the repository root on pushes to `main`.

If Pages has never been enabled for the repository, open **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions** once. After that, pushes to `main` deploy automatically.
