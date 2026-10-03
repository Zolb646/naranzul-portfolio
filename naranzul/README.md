# Thresholds

An interior-design exhibition built with Next.js App Router, TypeScript, and CSS. All three studies are explicitly marked placeholders. The geometric spatial drawings are not completed projects or generated interior photography.

## Run

```sh
pnpm install
pnpm dev
```

```sh
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

Routes: `/`, `/index`, `/projects/a-study-in-thresholds`, `/projects/the-quiet-passage`, `/projects/where-light-settles`, `/practice`.

## Content

Edit `lib/projects.ts`. Replace the provisional study titles and story notes with verified project information. `ImageAsset` supports source, dimensions, alt text, credit and separate desktop/mobile focal points. The `Space` component renders optimized images when an asset is supplied and an explicitly labelled SVG placeholder otherwise. Add an entry asset and assets to image story blocks; pair blocks accept `asset` and `contextAsset` for the detail and its spatial context. Entry assets also appear on the homepage and index.

Set the verified designer name and email in `practice`. Until an email is supplied, no nonfunctional contact link is shown. Replace the biography and process notes on the practice page. Font licenses are included under `public/fonts`.

## Before publishing

Supply actual photography, permission/credits, project metadata, designer biography and contact details. Review crops on desktop and mobile. Remove draft placeholders before marking a project as publishable. This preview deliberately has `noindex, nofollow` metadata and a disallow-all robots policy. Once content and a real domain are approved, add canonical URLs, project Open Graph images and a sitemap of published projects, then enable indexing. No deployment configuration or domain has been invented.

## Interaction

The index preview responds to mouse and keyboard focus; mobile uses directly linked images. Selection is stored locally for returning visitors. All essential navigation works without JavaScript. Native scrolling is preserved. The entrance clip reveal is progressive CSS enhancement, with a static fallback and reduced-motion support.
