# 🗂️ インデックス申請 AI秘書（Filewisp / ai-image-tools.com）

Google Search Console への手動インデックス申請を管理するためのファイルです。
**毎日10件まで**の申請を、このチェックリストに沿って消化していきます。

---

## 🤖 AIへの依頼方法（このファイルの使い方）

Claude にこう頼めば、秘書として機能します：

> 「`docs/index-request-secretary.md` を読んで、今日申請する10件を出して」
> 「バッチAを申請し終わったのでチェックを付けて」
> 「進捗サマリーを更新して」

---

## 📋 申請のやり方（毎回同じ）

1. [Google Search Console](https://search.google.com/search-console) を開く
2. 上部の検索窓（URL検査）に下のURLを**1件ずつ**貼り付けて Enter
3. 「インデックス登録をリクエスト」をクリック
4. 「リクエスト済み」になったら次のURLへ
5. **1日10件まで**（超えたら翌日に回す）

### ⚠️ ルール
- 「検証を開始」したものは**押し直さない**（カウントがリセットされる）
- 申請済みかわからないURLは、URL検査すると現在の状態が表示される
- 反映は数日〜2週間。すぐ載らなくても正常

---

## ✅ 申請済み（完了バッチ）

### バッチ1：主力ページ（2026/06/05 申請済み）
- [x] https://ai-image-tools.com/
- [x] https://ai-image-tools.com/tools
- [x] https://ai-image-tools.com/tools/heic-to-jpg
- [x] https://ai-image-tools.com/tools/jpg-to-png
- [x] https://ai-image-tools.com/tools/png-to-jpg
- [x] https://ai-image-tools.com/tools/image-compress
- [x] https://ai-image-tools.com/tools/pdf-to-jpg
- [x] https://ai-image-tools.com/tools/jpg-to-pdf
- [x] https://ai-image-tools.com/tools/image-to-pdf
- [x] https://ai-image-tools.com/tools/compress-pdf

### バッチ2：データ系＋変換（2026/06/05 申請済み）
- [x] https://ai-image-tools.com/tools/parquet-to-csv
- [x] https://ai-image-tools.com/tools/csv-to-parquet
- [x] https://ai-image-tools.com/tools/json-to-csv
- [x] https://ai-image-tools.com/tools/csv-to-json
- [x] https://ai-image-tools.com/tools/image-to-base64
- [x] https://ai-image-tools.com/tools/avif-to-jpg
- [x] https://ai-image-tools.com/tools/avif-to-png
- [x] https://ai-image-tools.com/tools/gif-to-jpg
- [x] https://ai-image-tools.com/tools/gif-to-png
- [x] https://ai-image-tools.com/tools/svg-to-png

---

## ⬜ 残りの申請（1日1バッチずつ）

### ★バッチ最優先：Parquet⇄CSV 訴求（2026/06/13・次回はこれから申請）
> 「AWSでParquet⇄CSVをブラウザだけで変換したい」需要を取りに行く最重要クラスタ。
> ツール本体（/tools/parquet-to-csv・/tools/csv-to-parquet）はバッチ2で申請済みなので、
> ここでは新ガイドとEN版・データ系ガイドを優先する。
- [ ] https://ai-image-tools.com/guides/what-is-parquet
- [x] https://ai-image-tools.com/guides/parquet-csv-workflows ✅ 登録済み確認（2026/06/19 URL検査）
- [ ] https://ai-image-tools.com/en/guides/what-is-parquet
- [ ] https://ai-image-tools.com/en/guides/parquet-csv-workflows
- [ ] https://ai-image-tools.com/en/tools/parquet-to-csv
- [ ] https://ai-image-tools.com/en/tools/csv-to-parquet
- [ ] https://ai-image-tools.com/guides/csv-encoding-fix
- [ ] https://ai-image-tools.com/guides/json-and-csv
（残り2枠：余裕があれば https://ai-image-tools.com/guides/png-transparency-basics と https://ai-image-tools.com/guides/what-is-avif も）

### バッチ3：人気ツール第2弾 ※未申請なら最優先
- [ ] https://ai-image-tools.com/tools/merge-pdf
- [ ] https://ai-image-tools.com/tools/jpg-to-webp
- [ ] https://ai-image-tools.com/tools/png-to-webp
- [ ] https://ai-image-tools.com/tools/webp-to-jpg
- [ ] https://ai-image-tools.com/tools/heic-to-png
- [ ] https://ai-image-tools.com/tools/resize-image
- [ ] https://ai-image-tools.com/tools/split-pdf
- [ ] https://ai-image-tools.com/guides
- [ ] https://ai-image-tools.com/en
- [ ] https://ai-image-tools.com/en/tools/heic-to-jpg

### バッチ4：圧縮・編集・PDF系
- [ ] https://ai-image-tools.com/tools/webp-to-png
- [ ] https://ai-image-tools.com/tools/jpg-compress
- [ ] https://ai-image-tools.com/tools/png-compress
- [ ] https://ai-image-tools.com/tools/webp-compress
- [ ] https://ai-image-tools.com/tools/crop-image
- [ ] https://ai-image-tools.com/tools/rotate-image
- [ ] https://ai-image-tools.com/tools/pdf-to-png
- [ ] https://ai-image-tools.com/tools/pdf-to-webp
- [ ] https://ai-image-tools.com/tools/rotate-pdf
- [ ] https://ai-image-tools.com/tools/pdf-remove-pages

### バッチ5：残りの変換・編集ツール
- [ ] https://ai-image-tools.com/tools/svg-to-jpg
- [ ] https://ai-image-tools.com/tools/bmp-to-jpg
- [ ] https://ai-image-tools.com/tools/bmp-to-png
- [ ] https://ai-image-tools.com/tools/tiff-to-jpg
- [ ] https://ai-image-tools.com/tools/tiff-to-png
- [ ] https://ai-image-tools.com/tools/ico-to-png
- [ ] https://ai-image-tools.com/tools/ico-to-jpg
- [ ] https://ai-image-tools.com/tools/flip-image
- [ ] https://ai-image-tools.com/tools/grayscale-image
- [ ] https://ai-image-tools.com/tools/watermark-image

### バッチ6：運営ページ＋ガイド前半
- [ ] https://ai-image-tools.com/about
- [ ] https://ai-image-tools.com/contact
- [ ] https://ai-image-tools.com/privacy-policy
- [ ] https://ai-image-tools.com/terms
- [ ] https://ai-image-tools.com/guides/image-format-basics
- [ ] https://ai-image-tools.com/guides/jpg-vs-png
- [ ] https://ai-image-tools.com/guides/png-vs-webp
- [ ] https://ai-image-tools.com/guides/pdf-workflows
- [ ] https://ai-image-tools.com/guides/heic-to-jpg-guide
- [ ] https://ai-image-tools.com/guides/compress-images-without-losing-quality

### バッチ7：ガイド後半
- [ ] https://ai-image-tools.com/guides/pdf-to-jpg-guide
- [ ] https://ai-image-tools.com/guides/resize-images-for-web
- [ ] https://ai-image-tools.com/guides/merge-or-split-pdf
- [ ] https://ai-image-tools.com/guides/choose-best-image-format-for-web
- [ ] https://ai-image-tools.com/guides/how-to-remove-pages-from-pdf
- [ ] https://ai-image-tools.com/guides/prepare-images-for-upload
- [ ] https://ai-image-tools.com/guides/iphone-photos-to-pdf
- [ ] https://ai-image-tools.com/guides/parquet-csv-workflows
- [ ] https://ai-image-tools.com/guides/optimize-blog-and-site-images
- [ ] https://ai-image-tools.com/en/tools

### バッチ7.5：新規ガイド（2026/06/05追加・AdSense対策記事）
- [ ] https://ai-image-tools.com/guides/heic-cannot-open-windows
- [ ] https://ai-image-tools.com/guides/send-large-photos-by-email
- [ ] https://ai-image-tools.com/guides/pdf-upload-size-limit
- [ ] https://ai-image-tools.com/guides/what-is-webp
- [ ] https://ai-image-tools.com/guides/convert-images-on-smartphone

### バッチ7.6：新規ガイド第2弾（2026/06/05追加）
- [ ] https://ai-image-tools.com/guides/jpg-vs-jpeg-difference
- [ ] https://ai-image-tools.com/guides/screenshot-to-pdf
- [ ] https://ai-image-tools.com/guides/resume-photo-size
- [ ] https://ai-image-tools.com/guides/what-is-tiff
- [ ] https://ai-image-tools.com/guides/marketplace-product-photos

### バッチ7.7：新規ガイド第3弾（2026/06/13追加・データ系＋透過＋AVIF＋Parquet）
- [ ] https://ai-image-tools.com/guides/png-transparency-basics
- [ ] https://ai-image-tools.com/guides/csv-encoding-fix
- [ ] https://ai-image-tools.com/guides/what-is-parquet
- [ ] https://ai-image-tools.com/guides/json-and-csv
- [ ] https://ai-image-tools.com/guides/what-is-avif

### バッチ8（任意）：英語の主要ページ
※基本はサイトマップ任せでOK。余裕があれば。
- [ ] https://ai-image-tools.com/en/tools/jpg-to-png
- [ ] https://ai-image-tools.com/en/tools/png-to-jpg
- [ ] https://ai-image-tools.com/en/tools/image-compress
- [ ] https://ai-image-tools.com/en/tools/pdf-to-jpg
- [ ] https://ai-image-tools.com/en/tools/compress-pdf
- [ ] https://ai-image-tools.com/en/guides

---

## 📈 進捗サマリー

| 日付 | 申請したバッチ | 登録済み数（GSC） | メモ |
|---|---|---|---|
| 2026/06/05 | バッチ1・2 | 9 | 検出-未登録123→0、クロール済み-未登録2（EN×2、検証中） |
| 2026/06/19 | （申請なし・状況確認） | 23 | クロール済み-未登録9（Parquet/CSVクラスタ＋/en/tools等）。06/17に新検証開始（内部リンク修正後の初回）。GSC画面の最終更新は06/12でラグあり。parquet-csv-workflows はURL検査で登録済み確認 |
|  |  |  |  |

> 申請した日にこの表へ1行追記する。「登録済み数」はGSCの「ページのインデックス登録」画面の緑の数字。

---

## 🛠️ 対応ログ（やったこと記録）

### 2026/06/19 — インデックス状況の確認＋方針整理
**きっかけ:** GSC「ページのインデックス登録」が登録済み23／クロール済み-未登録9。06/17に新しい検証が開始されている状態をスクショで共有。

**確認したこと:**
- 「クロール済み-未登録」9件 = Parquet/CSVクラスタ中心（`/guides/json-and-csv`, `/guides/csv-encoding-fix`, `/guides/what-is-parquet`, `/guides/parquet-csv-workflows`, `/en/guides/what-is-parquet`, `/en/tools/csv-to-parquet`, `/en/tools/parquet-to-csv`）＋ `/en/tools/jpg-to-png` ＋ `/en/tools`（英語ハブ）。
- 技術的SEOは問題なし（再検証済み）:
  - サイトマップに全ガイド・全ツールが日英とも含まれる（`app/sitemap.ts`）
  - canonical はロケールごと自己参照、hreflang `ja`/`en`/`x-default` 正しい（`src/lib/guide-seo.ts`）
  - データクラスタの相互リンク完備（`src/data/guide-related-guides.ts`）
- **`/guides/parquet-csv-workflows` はURL検査で「登録済み」確認**（GSCのレポート画面は最終更新06/12でラグがあり、まだ未登録リストに残って見える）→ 内部リンク修正＋検証が効き始めている良い兆候。

**重要な気づき:**
- 06/17の検証は、内部リンク修正（コミット `f7584f0`）が反映された**後の初回**。過去の失敗（06/05→06/13）は内容が変わっていない状態での再クリックだったが、今回は新シグナルあり → **押し直さず1〜2週間待つ**。
- 「クロール済み-未登録」はバグではなく、若いサイト（約3か月）への権威性・需要の判断。オンサイトでやれることはやり切った。

**今後の打ち手（優先順）:**
1. 06/17の検証は触らない（再クリック禁止）。
2. 手動インデックス申請を優先順で: `/en/tools`（英語ハブ。未登録だと配下も弱る）→ `/guides/what-is-parquet`（クラスタの柱）→ EN版ガイド。
3. off-site（被リンク）が本丸: Qiita/Zenn の Parquet記事は投稿済み。次は dev.to（英語）未投稿分の公開＋Qiita記事末尾に「Filewisp」ブランド名追記。

---

## 📅 週次チェック（毎週1回）

- [ ] GSC「ページのインデックス登録」で**登録済み数**を確認 → 上の表に記録
- [ ] `site:ai-image-tools.com` でGoogle検索 → ヒット件数の変化を確認
- [ ] 「クロール済み-未登録」の検証ステータスを確認（**押し直さない**）
- [ ] 検索パフォーマンスで表示回数・クリックが発生し始めたか確認

## 🔗 並行してやると効くこと（任意）

- X（旧Twitter）でツール紹介を投稿（被リンク・発見性UP）
- note / Qiita / Zenn で「ブラウザだけで画像変換」紹介記事
- はてなブックマークに登録

### 🚀 次に公開する被リンク（優先順・下書き済→公開するだけ）
> 2026-06レポートの示唆：オンサイトは打ち切った。針を動かすのは**被リンク＝表示面の拡大**。
> 下記はすべて下書き完成済み。Tier S直結のものから順に公開する。
1. **[HEIC記事（Qiita）](promo/heic-iphone-article-qiita.md)** ← 最優先。Tier S `heic-cannot-open-windows` 直結。Filewispブランド名・全リンク・画像アセット（`promo/assets/heic-*.png`）すべて揃い**投稿するだけ**。画像4枚をドラッグ&ドロップで挿入。
2. **[HEIC記事（note/ブログ用 JA）](promo/heic-iphone-article-ja.md)** ← 同テーマ別媒体。Qiitaと別ドメインから張ると被リンク多様性が出る。
3. **Qiita Parquet記事に「Filewisp」追記** ← 既投稿（https://qiita.com/coscoskosuda/items/eabb35e06445e8338207）の本文末尾に `Filewisp（https://ai-image-tools.com）` を追記。1分で効く。
4. **[json/csv記事（Qiita）](promo/json-csv-article-qiita.md)** ← データクラスタ（csv-encoding-fix / json-and-csv）の権威補強。
5. **[Parquet記事（dev.to・英語）](promo/parquet-csv-aws-article-en.md)** ← 英語クラスタ（crawled-not-indexed の本丸）に外部シグナル。

> avifは申請・記事不要（**既に2位＝インデックス済み**）。format系クラスタ（what-is-webp / image-format-basics）への内部リンクは強化済み（2026-06-30）。

### 投稿した記事ログ
- [x] Zenn（2026/06/13）: https://zenn.dev/kosuda/articles/0e8cf5da824a64 — 「AWSのParquetをブラウザだけでCSVにしたかったので、ツールを作って公開した」
- [x] Qiita（2026/06/14）: https://qiita.com/coscoskosuda/items/eabb35e06445e8338207 — 同内容。※リンクはあるが本文に「Filewisp」ブランド名が未記載。記事末尾に「Filewisp（https://ai-image-tools.com）」を追記推奨
- [ ] dev.to（英語）: [docs/promo/parquet-csv-aws-article-en.md](../docs/promo/parquet-csv-aws-article-en.md) 未投稿
