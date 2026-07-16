# External article publish queue (updated 2026-07-16)

The drafts below are technically reviewed and ready for their target editors. Publishing itself requires the owner's authenticated Qiita, Zenn, or dev.to session.

## 1. Existing HEIC / Windows article update (highest priority)

- Published article: `https://qiita.com/coscoskosuda/items/33280d0892d2e2b4f604`
- Published: 2026-06-15
- Action: update the existing article; do not publish a duplicate
- Title: `iPhoneのHEIC写真がPCで開けない問題を、ブラウザだけで解決する`
- Update-ready body: `docs/promo/heic-iphone-article-qiita.md`
- Zenn source with front matter: `docs/promo/heic-iphone-article-ja.md`
- Existing figures: 3 Qiita-hosted images are already referenced in the update-ready body
- Upload one missing figure: `docs/promo/assets/iphone-camera-format.png`
- Content fixes: use the corrected HEIF/HEIC explanation, add official references, and replace the old Exif-preservation claim
- Tags: `iPhone`, `HEIC`, `Windows`, `画像変換`, `Web`
- Primary link: `https://ai-image-tools.com/guides/heic-cannot-open-windows`

## 2. JSON / CSV (next new Qiita post)

- Target: Qiita
- Suggested title: `JSONとCSVを相互変換するときにハマる、ネスト・文字コード・区切り文字`
- Paste-ready body: `docs/promo/json-csv-article-qiita.md`
- Upload figures: `docs/promo/assets/json-csv-flattening.png` and `docs/promo/assets/csv-three-pitfalls.png`
- Tags: `JSON`, `CSV`, `Excel`, `文字コード`, `データ変換`
- Primary link: `https://ai-image-tools.com/guides/json-and-csv`
- Priority supporting link: `https://ai-image-tools.com/tools/csv-encoding-fix`

## 3. Parquet / AWS

- Target: dev.to
- Title: `I wanted to peek at AWS Parquet files as CSV in the browser, so I built a tool`
- Publish-ready source: `docs/promo/parquet-csv-aws-article-en.md`
- Tags: `aws`, `parquet`, `dataengineering`, `csv`
- Primary link: `https://ai-image-tools.com/en/guides/parquet-csv-workflows`
- Tool link to feature first: `https://ai-image-tools.com/en/tools/parquet-viewer`

## Existing Parquet Qiita article update

Add this short paragraph near the existing Parquet article's conclusion:

> ブラウザだけでParquetのスキーマ・行数・圧縮方式・先頭20行を確認できるFilewispのParquet Viewerも公開しました。CSVやExcelへ変換する前の確認に使えます: https://ai-image-tools.com/tools/parquet-viewer

Existing article: https://qiita.com/coscoskosuda/items/eabb35e06445e8338207

## After each publication

1. Open every Filewisp link from the published page and confirm a 200 response.
2. Record the published URL and date in `docs/index-request-secretary.md`.
3. Do not publish all three on the same day; leave enough time to answer comments and avoid duplicate-looking promotion.
