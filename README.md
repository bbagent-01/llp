# bbase-app-template

Next.js 15 + Tailwind v4 starter for web apps, pre-configured for Cloudflare Pages.
Clone → build → push → live at `yourapp.bbase.ai`.

## Stack
- Next.js 15 (App Router, static export)
- Tailwind CSS v4 with BB Base Theme tokens
- Plus Jakarta Sans + JetBrains Mono
- GitHub Actions auto-deploy to Cloudflare Pages

## Quick Start

1. Create a new repo from this template on GitHub
2. Clone in VS Code → `npm install` → `npm run dev`
3. Edit pages in `src/app/`
4. Push → auto-deploys in ~90 seconds

## File Structure
```
├── src/
│   ├── app/
│   │   ├── globals.css     ← Theme tokens + Tailwind
│   │   ├── layout.jsx      ← Root layout (fonts, metadata)
│   │   └── page.jsx        ← Home page
│   └── components/         ← Shared components
├── public/                 ← Static assets
├── .github/workflows/      ← Auto-deploy on push
├── next.config.mjs         ← Static export config
└── package.json
```

## Adding Pages
Create new folders in `src/app/`:
```
src/app/about/page.jsx     → yourapp.bbase.ai/about
src/app/pricing/page.jsx   → yourapp.bbase.ai/pricing
```

## Theme Colors
- `bg-surface-1` through `bg-surface-4` (dark backgrounds)
- `text-coral`, `bg-coral` (primary accent)
- `text-amber`, `bg-amber` (secondary accent)
- Full zinc scale for light sections
