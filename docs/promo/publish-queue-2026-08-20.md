# External article publish queue (2026-08-20)

前回のキュー（`publish-queue-2026-07-14.md`）は3本とも 2026-07-16 に公開済み。
そのうえで **未公開のまま残っている下書きが2本**あり、さらに新規1本を追加した。
公開自体はオーナーの Qiita / Zenn / dev.to セッションが必要。

## 状況（2026-08-20 時点）

| 下書き | 状態 | 公開先 |
|---|---|---|
| `gsc-automation-article.md` | **未公開・キューにも入っていなかった** | Zenn（新規） |
| `aws-exports-browser-article-en.md` | **新規作成（2026-08-20）** | dev.to |
| `parquet-csv-aws-article-ja.md` | 未公開（EN版のみ dev.to で公開済み） | 保留（下記参照） |
| `heic-iphone-article-ja.md` | 未公開（Qiita版は公開済み） | 保留（下記参照） |

---

## 1. GSC自動レポート記事（最優先・そのまま出せる）

- Status: **未公開**。技術的には完成しており、前回キューに載っていなかっただけ
- Draft: `docs/promo/gsc-automation-article.md`
- Target: **Zenn**（まだ一度も使っていないチャネル。Qiitaとの重複も無い）
- Title: `Search ConsoleのSEOレポートを、GitHub Actionsで毎週自動メール配信する（依存ゼロ）`
- Topics: `googlesearchconsole`, `githubactions`, `seo`, `oauth`, `nodejs`
- なぜ効くか: Filewispの宣伝記事ではなく**それ単体で有用な技術記事**なので、
  ツール紹介記事より読まれやすく、末尾の自然な言及がそのまま被リンクになる
- 作業: フロントマターの `published` を `true` にして貼るだけ
- 末尾の言及リンク: `https://ai-image-tools.com`

## 2. AWSエクスポート記事（新規・dev.to）

- Status: **下書き完成（2026-08-20）**
- Draft: `docs/promo/aws-exports-browser-article-en.md`
- Target: **dev.to**（前回のParquet記事と同じ導線。48h後に Hashnode へクロスポスト）
- Title: `Every AWS export lands as .json.gz — here are browser-only ways to actually read them`
- Tags: `aws`, `dataengineering`, `cloudtrail`, `csv`
- 前回記事（Parquet）の続編として書いてあり、内容は重複しない
- 記事内リンク8本は 2026-08-20 時点ですべて 200 を確認済み
- 記事中の技術的記述は実装と突き合わせ済み
  （CloudTrailの列 = `src/lib/aws-cloudtrail.ts` の `PREFERRED_COLUMNS`、
  DynamoDBの `SS`/`NS`/`BS`/`L`/`M` = `src/lib/aws-dynamodb.ts`、
  gzip展開は `fflate` の `gunzipSync` = `src/lib/aws-common.ts`）
- 公開後: r/aws への投稿を検討。**ツールではなく記事をリンクし、問題から書き出す**こと

## 3. 保留中の2本（重複リスクのため保留）

- `parquet-csv-aws-article-ja.md` … EN版が dev.to で公開済み。Zennに日本語版を出すと
  実質同一内容の二重公開になる。出すなら**日本語読者向けに書き直してから**
- `heic-iphone-article-ja.md` … Qiitaで公開済みの記事のZenn版。同上

> Zennは外部canonicalを指定できないため、他所で公開済みの内容をそのまま出すのは避ける。

---

## 公開後の手順（毎回同じ）

1. 記事内の Filewisp リンクをすべて開いて 200 を確認する
2. 公開URLと日付を `docs/index-request-secretary.md` に記録する
3. **同じ日に2本以上公開しない**（コメント対応の時間を確保し、宣伝の連投に見せない）
4. 公開の**7日後と28日後**に Cloudflare Web Analytics の Referrers を見て、
   実際に流入があったか確認する。`docs/promo/directory-submissions.md` の掲載記録表と同じ扱い

> 計測について: 2026-08-20 に Cloudflare Web Analytics を実装済み。
> `NEXT_PUBLIC_CF_BEACON_TOKEN` を設定するまでビーコンは出力されないので、
> **記事を公開する前にトークンを設定しておくこと**。設定前に公開すると流入を測れない。
