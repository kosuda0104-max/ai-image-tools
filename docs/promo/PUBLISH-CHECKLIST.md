# 📤 promo記事 公開チェックリスト（2026-07-05 作成）

被リンク不足がクリック0の根本原因（`docs/winnable-queries.md` 参照）。
未公開の下書きと画像はすべて揃っているので、**あとは貼り付けて公開するだけ**の状態。
1日1本ペースでOK。優先順に上から。

## ✅ 公開済み（2026-07-05時点）

- [x] Zenn（06/13）: Parquet記事 https://zenn.dev/kosuda/articles/0e8cf5da824a64
- [x] Qiita（06/14）: Parquet記事 https://qiita.com/coscoskosuda/items/eabb35e06445e8338207

## 公開順（優先度順）

### 0. 1分で終わるやつ（今日やる）
- [ ] 公開済みQiita Parquet記事の末尾に **「Filewisp（https://ai-image-tools.com）」を追記**
  （リンクはあるがブランド名が未記載。指名検索シグナルになる）

### 1. HEIC記事（Tier S直結・最優先）
- [ ] **Qiita** に `heic-iphone-article-qiita.md` を投稿
  - タグ例：`iPhone` `HEIC` `Windows` `画像` `個人開発`
  - 画像を本文の指定位置にドラッグ&ドロップ：
    - `assets/heic-explainer.png`（画像①）
    - `assets/heic-error-windows.png`（画像②）
    - `assets/iphone-camera-format.png`（画像③）
    - `assets/filewisp-convert-steps.png`（変換手順の図・「作ったもの」セクション）
- [ ] **note または自ブログ** に `heic-iphone-article-ja.md` を投稿（別ドメインからの被リンク多様性）
  - ⚠️ 本文がQiita版とほぼ同一なので、**同時期に出さない**（1〜2週間ずらす）か、
    冒頭・まとめを媒体向けに書き換える
- 狙い：`heic 開けない windows`（Tier S筆頭）+ /tools/heic-to-jpg への被リンク

### 2. JSON⇄CSV記事（Qiita・データクラスタ補強）
- [ ] **Qiita** に `json-csv-article-qiita.md` を投稿
  - タグ例：`JSON` `CSV` `Excel` `jq` `個人開発`
- 狙い：`json csv 変換` + csv-encoding-fix / json-and-csv クラスタの権威補強

### 3. Parquet英語記事（dev.to・EN側の本丸）
- [ ] **dev.to** に `parquet-csv-aws-article-en.md` を投稿（`published: false` → `true`）
- 狙い：crawled-not-indexed が続くEN側ページ群への外部シグナル

## 各記事の公開直後にやること

1. 公開URLを `docs/index-request-secretary.md` の「投稿した記事ログ」に記録
2. 記事からリンクしたツールページを **GSCでインデックスリクエスト**
   （`docs/index-request-secretary.md` のバッチに従う）
3. 1週間後のGSCレポートで、参照流入と対象クエリの順位変化を確認

## 注意

- Qiita/Zennは「宣伝だけの記事」はガイドライン違反になりやすい。
  下書きはすべて「困りごと解説＋解決策の1つとして自作ツール紹介」の構成に
  してあるので、**本文を宣伝寄りに書き換えない**こと。
- 同一本文を同じプラットフォームに二重投稿しない。別媒体に出す場合も
  時期をずらすか冒頭を書き換える（上の各項目参照）。
