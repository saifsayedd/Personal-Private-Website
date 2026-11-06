# Saif Sayed — Personal Website

A responsive personal website with a homepage and story, CV preview, marketing portfolio, reading list, and essays page.

## Preview locally

Run `python3 -m http.server 8000 --directory dist`, then open http://localhost:8000.

## Deploy

Publish the `dist` directory as a static website. No build command or environment variables are required.

## Edit

- `dist/index.html`: content and page structure
- `dist/style.css`: desktop, tablet, and phone layouts
- `dist/script.js`: page navigation
- `dist/assets/`: images, fonts, CV, and portfolio PDF

Fonts are hosted locally. Navigation uses hash routes. The repository contains no hosting credentials or private hosting configuration.
