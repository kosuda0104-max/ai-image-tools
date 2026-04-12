# AI Image Tools

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
RESEND_API_KEY=your_resend_api_key
CONTACT_TO_EMAIL=hello@example.com
CONTACT_FROM_EMAIL=noreply@example.com
```

`CONTACT_FROM_EMAIL` is optional. If omitted, the contact API falls back to
`onboarding@resend.dev`.

## Scripts

- `npm run dev` - start the development server
- `npm run build` - create a production build
- `npm run start` - run the production server
- `npm run lint` - run ESLint
