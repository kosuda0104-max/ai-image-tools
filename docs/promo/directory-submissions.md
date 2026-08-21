# ツール紹介サイトへの掲載（Filewisp / ai-image-tools.com）

作成日: 2026-08-20

検索エンジン以外の入口と被リンクを作るためのリスト。**掲載作業はオーナーのアカウントが必要**なので、
ここには「どこに」「何を貼るか」だけを用意する。貼る文面は下の「貼り付け用コピー」からそのまま使う。

## 前提：どのツールを主役にするか

掲載先には**AWSエクスポート系ツールを主役に据える**。理由は競合状況の差がはっきりしているため。

- 画像変換（jpg→png など）は iLoveIMG / TinyPNG / CloudConvert が上位を固めていて、新規ドメインが割って入る余地はほぼない
- 一方 **CloudTrail / S3 Inventory / Textract / DynamoDB / CloudWatch Logs / Transcribe のブラウザ内変換**は、
  「アップロードしない」条件で提供しているサイトがほとんど無い
- ディレクトリの審査でも「他と何が違うか」が明確なほど通りやすい

**主役URL:** `https://ai-image-tools.com/en/tools`
**サブ:** Parquet Viewer / CloudTrail Log to CSV / S3 Inventory Viewer

---

## 掲載先リスト（優先順）

### Tier 1：効果が読めるもの（まずここから）

| # | サイト | 種別 | 費用 | メモ |
|---|---|---|---|---|
| 1 | **AlternativeTo** | 代替ツール検索 | 無料 | `CloudConvert` `Tabular` の alternative として登録。被リンクは nofollow だが流入が実在する |
| 2 | **Product Hunt** | ローンチ | 無料 | 1日1本の勝負。**AWSツール群として出す**（画像変換として出すと埋もれる） |
| 3 | **Awesome lists (GitHub)** | キュレーション | 無料 | `awesome-aws`、`awesome-devtools`、`awesome-selfhosted` 等へPR。dofollow・恒久 |
| 4 | **Slant / SaaSHub** | 比較 | 無料 | 「browser-only file converter」の選択肢として |

### Tier 2：数を稼ぐ（審査ゆるめ・作業量勝負）

| # | サイト | メモ |
|---|---|---|
| 5 | There's An AI For That | AI枠ではないが「ツール」枠で通ることがある |
| 6 | Toolify / Futurepedia | 同上。無料枠のみ使う |
| 7 | SideProjectors / BetaList | 個人開発枠 |
| 8 | Indie Hackers（Products） | プロフィール兼リンク |
| 9 | Uneed / Fazier | Product Hunt 代替系 |

### Tier 3：日本語圏

| # | サイト | メモ |
|---|---|---|
| 10 | **Zenn / Qiita のプロフィール欄** | 既に記事があるので、プロフィールのWebサイト欄にURLを入れるだけ |
| 11 | **GitHub プロフィール README** | 同上。コストゼロ |
| 12 | 個人開発まとめ系（例：Tsukuriba 等） | 掲載条件を確認してから |

### やらない

- 有料の被リンク販売、相互リンク集、ディレクトリ登録代行
  → 効果が無いどころかスパム判定のリスクがある。**現状の課題はインデックスされないことであって、被リンクの本数を水増ししても解決しない**

---

## 貼り付け用コピー

### 一行説明（60文字以内が求められる欄）

```
Browser-only converters for AWS exports, images, and PDFs. Nothing is uploaded.
```

```
AWSのエクスポートや画像・PDFを、アップロードせずブラウザだけで変換できる無料ツール集。
```

### タグライン（Product Hunt の tagline 欄など。40〜60字）

```
Read CloudTrail, S3 Inventory, and Parquet without uploading anything
```

### 短い説明（150〜200字）

```
Filewisp is a set of 67 free file tools that run entirely in your browser — nothing is uploaded to a server. It covers the AWS exports that are annoying to read (CloudTrail .json.gz, S3 Inventory manifests, DynamoDB typed JSON, Textract Blocks, Parquet) plus everyday image and PDF conversion. No account, no install, no upload.
```

```
Filewisp は、ブラウザだけで完結する67種類の無料ファイルツールです。ファイルはサーバーに送信されません。CloudTrail の .json.gz、S3 Inventory の manifest、DynamoDB の型付きJSON、Textract の Block、Parquet といった「読みづらいAWSエクスポート」に加えて、画像・PDF の日常的な変換にも対応しています。登録・インストール不要。
```

### 長い説明（Product Hunt の description、AlternativeTo の説明欄など）

```
I kept hitting the same wall on AWS: the data I needed was right there in S3, but in a
format I couldn't just look at. CloudTrail gives you 288 gzipped files a day. S3 Inventory
splits the column names into a separate manifest. Textract returns a graph of Block objects
instead of the table you can see in the PDF. Every time, I wrote the same throwaway script.

Filewisp is the set of converters I built instead. They run entirely in the browser — the
file is parsed in your tab and never leaves it, which matters when the file is an audit log
or a production table export. That's the part most "free online converter" sites get wrong.

It also does the ordinary things: image format conversion, compression, resizing, PDF merge
and split, EXIF/GPS stripping. 67 tools, no account, no install, no upload.

AWS: CloudTrail to CSV, CloudWatch Logs, S3 Inventory Viewer, DynamoDB JSON, Textract to
Excel, Transcribe to SRT, Parquet Viewer / Parquet to CSV / CSV to Parquet
Images: JPG, PNG, WebP, AVIF, HEIC, TIFF, SVG, BMP, ICO — convert, compress, resize, crop
PDF: merge, split, rotate, compress, remove pages, to and from images
Data: CSV, JSON, JSONL, Excel, Base64, CSV encoding repair
```

### AlternativeTo 用（alternative to の指定）

- CloudConvert, Zamzar, iLoveIMG（変換全般）
- Tad, ParquetViewer（Parquet 閲覧）
- 「Free」「Web-based」「No registration」「Privacy focused」タグを付ける

### カテゴリ／タグ（共通）

```
file-converter, aws, developer-tools, privacy, productivity, no-upload,
cloudtrail, parquet, pdf-tools, image-converter
```

---

## 掲載時のルール

1. **同じ文面を全部にコピペしない。** 説明文が完全一致していると重複コンテンツ扱いになる。上のバリエーションを使い分ける。
2. **1日に複数サイトへ一斉登録しない。** 数日に分ける。
3. **主役をブレさせない。** Tier 1 では必ず AWS 側を前に出す。画像変換を前に出すと「よくある変換サイト」に分類されて終わる。
4. **掲載できたURLを記録する。** 下の表に追記していく（被リンクが実際に付いたかの確認用）。
5. **アクセス解析で効果を見る。** `NEXT_PUBLIC_CF_BEACON_TOKEN` 設定後は Cloudflare Web Analytics の Referrers で流入元が見える。掲載日と突き合わせる。

---

## 掲載記録

| 日付 | サイト | 掲載URL | dofollow | 流入(28日) |
|---|---|---|---|---|
| | | | | |
