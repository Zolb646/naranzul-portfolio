# Designer content brief

A separate bilingual (Mongolian / English) website for collecting interior-design portfolio content. It does not modify or submit answers to the portfolio application in `../naranzul`.

## Run and verify

```sh
npm ci
npm run dev
npm run lint
npm test
npm run build
```

## Designer workflow

1. Choose Mongolian or English, then complete profile, contact details, website direction and one or more projects.
2. Add Drive/Dropbox or other folder links for portraits, original photography, plans, brand assets and CV. This app does **not** upload or bundle the image files.
3. Draft answers are saved in browser local storage. Download a JSON draft as a portable backup. Importing asks before replacing current answers.
4. Review the answers, check the content-use permission, and download the final JSON or readable TXT file.
5. Send the downloaded file to the website developer separately. No email or server submission is performed.

A private reply email is separate from the email intended for publication. Project fields capture permissions, photographer credits, confidential details to withhold and publication embargoes. No data is sent to a database. Do not enter passwords or sensitive client information. On shared devices, clear the local draft after exporting.

## Hosting

Deploy this directory as its own Vercel project; the framework is Next.js. It has no environment variables, database, server upload endpoints or external services. Keep indexing disabled because this is a worksheet, not the public portfolio.

The local-storage format is versioned. JSON export preserves all answers and project order; TXT export uses the selected language. Required-field and URL/email validation runs before final exports. Draft export remains available for incomplete answers.
