# SMS Counter

A small SolidJS tool for checking how a text message will be billed before you send it. Type or paste a message and it shows the character count, encoding (GSM-7 or UCS-2), and how many SMS segments it will be split into.

## Features

-   **Character count** — live count as you type.
-   **Encoding detection** — flags whether the message fits in GSM-7 or falls back to UCS-2 (e.g. due to emoji or non-GSM characters), since UCS-2 messages have a much lower per-segment limit.
-   **Segment calculation** — 160 chars for a single GSM-7 SMS (153 per segment once split), or 70 chars for a single UCS-2 SMS (67 per segment once split), accounting for the concatenation header used across multi-part messages.
-   **Template merge fields** — write a template with `#{fieldName}` placeholders (e.g. `#{record.rego}`) and fill them in via generated input fields; the preview and counter update live with the merged text.
-   **Shareable links** — the current message is kept in the page's query string, so you can copy the URL to share or reload a draft.

## Usage

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in development mode with hot reload.

### `npm run build`

Builds the app for production to the `dist` folder, minified with hashed filenames.

### `npm run serve`

Serves the production build locally for a final check before deploying.

## Deployment

The `dist` folder is a static site and can be deployed to any static host (Netlify, Vercel, Surge, etc.).

## Stack

Built with [SolidJS](https://solidjs.com), Vite, and Tailwind CSS.
