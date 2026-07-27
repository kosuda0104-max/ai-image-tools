# Filewisp

Browser-based image and PDF utilities built with Next.js. The app provides
Japanese and English pages for format conversion and lightweight editing tools
such as JPG/PNG/WebP conversion, PDF utilities, resizing, cropping, rotation,
and watermarking.

## Features

- Client-side processing for most image workflows
- Japanese and English localized pages
- Tool-specific metadata for SEO and sharing
- Contact form powered by Resend

## Development

Install dependencies and start the local dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file with the values you need:

```bash
NEXT_PUBLIC_SITE_URL=https://example.com
NEXT_PUBLIC_AD_SLOT_GUIDE=1234567890
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=hello@example.com
CONTACT_FROM_EMAIL=noreply@example.com
TOOL_FEEDBACK_TO_EMAIL=feedback@example.com
TOOL_FEEDBACK_WEBHOOK_URL=https://example.com/feedback-webhook
```

`CONTACT_FROM_EMAIL` is optional. If omitted, the contact API falls back to
`onboarding@resend.dev`.

Tool assistant feedback is stored as one structured JSON file per event in the
private Vercel Blob store connected to the project. Vercel creates
`BLOB_READ_WRITE_TOKEN` when the store is linked. Files are grouped under
`tool-feedback/YYYY-MM-DD/` and can be downloaded from the Storage dashboard.

Resend and `TOOL_FEEDBACK_WEBHOOK_URL` are optional additional destinations.
Email uses `TOOL_FEEDBACK_TO_EMAIL`, falling back to `CONTACT_TO_EMAIL`. The
webhook can point to Google Apps Script, Make, or another HTTPS endpoint for
spreadsheet or database collection. Every destination receives the same
`feedbackId`, so the initial unresolved rating and its optional detail can be
joined later.

AdSense uses `ca-pub-9678380581323736` by default and reuses
`NEXT_PUBLIC_AD_SLOT_GUIDE` across guide, tool, home, and directory placements
if no page-specific slot is set. Optional page-specific slots are
`NEXT_PUBLIC_AD_SLOT_TOOL`, `NEXT_PUBLIC_AD_SLOT_HOME`, and
`NEXT_PUBLIC_AD_SLOT_DIRECTORY`.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
