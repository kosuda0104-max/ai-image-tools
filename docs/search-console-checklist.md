# Search Console Checklist

## Before connecting

- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` to the verification token from Google Search Console.
- Confirm `app/robots.ts` points to the real sitemap URL.
- Confirm `app/sitemap.ts` includes all public landing pages and tool pages you want indexed.

## After deployment

- Add the site property in Google Search Console.
- Verify the property with the meta tag token already supported by `app/layout.tsx`.
- Submit `/sitemap.xml`.
- Check that both `/` and `/en` page groups are being discovered.

## First review cycle

- Watch for indexing issues on new tool pages.
- Look for pages with impressions but weak click-through rate.
- Tighten `title` and `description` on pages that get shown but not clicked.
- Expand pages that get indexed but stay low because the query intent is not answered clearly enough.

## Ongoing use

- Review top-performing pages first: format conversion, compression, and PDF workflow pages.
- Add internal links from strong pages to the next logical tool or guide.
- Keep thin or duplicate pages from piling up without unique search intent.
