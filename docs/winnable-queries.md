# 勝てる検索語 優先リスト（新規サイト向け）

直近28日（2026/06/27〜07/24）はクリック0・表示11・平均順位61.3。前期間は表示19・平均順位47.7で、表示は8減、平均順位は13.6悪化した。
ただし母数が小さく、前回8表示あった `.avif とは` が今回の集計期間から外れた影響が大きい。順位8〜10位に残っている変換ページは維持できているため、サイト全体の下落と決めつけず、実際に表示されたページへ施策を集中する。
**戦略：頭の語（"jpg png 変換"等）は捨て、競合が弱い"悩み系ロングテール"に集中**して
被リンク・インデックスリクエスト・内部リンクを“数本”に絞って当てる。

## 評価軸
- **勝てる度**：競合の弱さ（巨大サイトが薄い／個人ブログが上位＝チャンス）
- **意図**：問題が顕在化していて解決＝サイト訪問につながるか
- タイトルは実際に表示された検索語だけを小さく調整し、**要るのは権威と対象ページへの集中。**

## GSC実測の最優先（2026/07/24時点）

| 優先 | 検索語・対象ページ | 現在地 | 今回の対応 |
|---|---|---|---|
| S | `/en/tools/jpg-to-png` | 8位・表示4 | タイトルと本文は維持。既存の内部リンクと外部記事からこのURLへ集中 |
| S | `/en/tools/csv-to-parquet` | 9位・表示2 | Parquetガイドからの導線を維持。本文の大幅変更はしない |
| S | `/tools/jpg-to-png`、`/tools/png-to-jpg`、`/tools/webp-to-jpg` | 8〜10位 | 変換系クラスタの関連リンクを維持 |
| A | `画像 軽量化 ai` → `/tools/image-compress` | 16位・表示1 | AI生成画像も対象になることをFAQで回答。AI処理とは誤認させない |
| A | `jpeg 透過`、`jpg透過` → `/guides/png-transparency-basics` | 94〜98位 | 「PNGへ変換するだけでは透過にならない」を追記し、背景透明化とJPG→PNGへ誘導 |
| A | `/en/guides/parquet-csv-workflows` | 7.7位・表示3 | 前回25.2位から改善。書き換えず、CSV→Parquetへの導線として使う |

## Tier S（最優先・まずこの5本に被リンク＋インデックスリクエストを集中）

| 検索語（例） | 対象ページ | なぜ勝てる |
|---|---|---|
| `heic 開けない windows` / `heic windows 表示されない` | [guides/heic-cannot-open-windows] + tools/heic-to-jpg | 悩みが明確・iPhoneユーザー大量・個人ブログ上位＝割って入れる |
| `csv 文字化け 直し方` / `csv 文字化け excel` | [guides/csv-encoding-fix] + csv系tools | 検索数多・恒常需要・dev/事務両方。クラスタ強化にも効く |
| `jpg jpeg 違い` | [guides/jpg-vs-jpeg-difference] | 定番の素朴な疑問・競合が薄い・即答できる |
| `webp 開けない` / `webp とは` | [guides/what-is-webp] + webp系tools | 「開けない」系は競合弱め・変換導線に直結 |
| `画像 正方形 切り抜き` / `アイコン 正方形 トリミング` | [guides/crop-image-to-square] + tools/crop-image | SNS/アイコン需要・ツールが直接解決 |
| `.avif とは` / `avif 開けない` | [guides/what-is-avif] + avif系tools | **GSC実証済み：`.avif とは` 2位・表示8、ページ全体は表示9（2026/07/19まで）。** 計画はTier Aだったが現実が昇格させた最有力。検索結果の文言改善と被リンクを集中 |

## Tier A（次に狙う）

| 検索語 | 対象ページ |
|---|---|
| `tiff 開けない` / `tiff とは` | guides/what-is-tiff |
| `スクリーンショット pdf まとめる` | guides/screenshot-to-pdf + tools/image-to-pdf |
| `履歴書 写真 サイズ 変更` | guides/resume-photo-size |
| `iphone 写真 pdf` | guides/iphone-photos-to-pdf |
| `画像 白黒 変換` / `モノクロ 加工` | guides/grayscale-photo + tools/grayscale-image |
| `画像 透かし 入れ方` | guides/add-watermark-to-image + tools/watermark-image |
| `parquet csv 変換` / `parquet とは` / `bigquery parquet` | guides/what-is-parquet + en/guides/parquet-csv-workflows + parquet系tools（EN CSV→Parquetは9位） |
| `json csv 変換` | guides/json-and-csv + csv-to-json/json-to-csv |
| `画像 軽量化 ai` / `画像 容量 小さく` | tools/image-compress |
| `jpeg 透過` / `jpg透過` / `png 透過` | guides/png-transparency-basics + tools/image-background-transparent + tools/jpg-to-png |

## やること（このリストの使い方）
1. **被リンク**：Tier S に関係する記事を Qiita/Zenn に出す（HEIC/Parquet は下書き済→**公開するだけ**）。
2. **インデックスリクエスト**：GSCのURL検査で Tier S のページを優先リクエスト。
3. **内部リンク**：トップ/関連ガイドから Tier S へのリンクを厚く（一部実施済）。
4. **GSCで答え合わせ**：実際に表示されている語（クエリタブ）と突き合わせ、伸びている語に寄せる。

> 頭の語で消耗しない。**“開けない／とは／違い／直し方”系の悩みロングテール**に絞るのが、新規サイトが最初の100クリックに到達する最短ルート。
