# PNTL · NSSLGlobal

Multi-page research lab website for the Positioning, Navigation and Timing Laboratory at NSSLGlobal.

## GitHub Pages

The site is configured as a static Next.js export and includes a GitHub Pages deployment workflow. It supports both account sites (`owner.github.io`) and project sites (`owner.github.io/repository-name`) without manual path edits.

1. Push this directory to a GitHub repository whose default branch is `main`.
2. In **Settings → Pages**, choose **GitHub Actions** as the source.
3. Push to `main`, or run **Deploy to GitHub Pages** from the Actions tab.

The deployed URL is calculated automatically by `.github/workflows/deploy-pages.yml`.

## Local development

Use Node.js 22 or newer.

```bash
npm install
npm run dev
```

Create the static export with:

```bash
npm run build:pages
```
