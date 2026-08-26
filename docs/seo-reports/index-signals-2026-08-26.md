# インデックス信号監査（2026-08-26）

対象: `https://ai-image-tools.com/`

## 公開環境の確認結果

- `robots.txt` と `sitemap.xml` は HTTP 200。
- サイトマップ掲載は 240 URL。重複 URL はなし。
- 240 URLすべて HTTP 200、自己 canonical、`noindex` なし、HTML言語指定あり、H1は1件。
- サイトマップ内の重複 canonical はなし。
- `https://www.ai-image-tools.com/` が HTTP 200で表示され、非`www`版と重複していた。
- 固定ページを含む全URLに同じ古い`lastmod`、`priority`、`changefreq`が付いていた。

## 対応

- `www`を非`www`へ恒久リダイレクトする。
- XMLサイトマップに日本語・英語・繁体字中国語の相互`hreflang`を追加する。
- Googleが使用しない`priority`と`changefreq`を削除する。
- 内容の更新日を管理しているツール・ガイドだけに`lastmod`を出す。
- 固定ページは、正確な更新日を保証できないため`lastmod`を省略する。
- 公開後に全サイトマップURLのHTTP状態、canonical、`hreflang`、`noindex`、HTML言語、`www`転送を自動検査する。

## 公開後に見るもの

- Search Consoleで`/sitemap.xml`を再送信する。
- URL検査はホーム、`/en/guides/parquet-csv-workflows`、`/en/tools/csv-to-parquet`、`/tools/bmp-to-png`を優先する。
- 2〜4週間後、クロール済み・未登録と重複ページの件数を前回と比較する。
