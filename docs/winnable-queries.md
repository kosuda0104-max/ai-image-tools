# 勝てる検索語 優先リスト（新規サイト向け）

平均掲載順位 39.5・表示29回/3か月＝「権威（被リンク）不足で頭の語に勝てない」状態。
**戦略：頭の語（"jpg png 変換"等）は捨て、競合が弱い"悩み系ロングテール"に集中**して
被リンク・インデックスリクエスト・内部リンクを“数本”に絞って当てる。

## 評価軸
- **勝てる度**：競合の弱さ（巨大サイトが薄い／個人ブログが上位＝チャンス）
- **意図**：問題が顕在化していて解決＝サイト訪問につながるか
- タイトルは既にロングテール最適化済み → **書き換え不要。要るのは権威と集中。**

## Tier S（最優先・まずこの5本に被リンク＋インデックスリクエストを集中）

| 検索語（例） | 対象ページ | なぜ勝てる |
|---|---|---|
| `heic 開けない windows` / `heic windows 表示されない` | [guides/heic-cannot-open-windows] + tools/heic-to-jpg | 悩みが明確・iPhoneユーザー大量・個人ブログ上位＝割って入れる |
| `csv 文字化け 直し方` / `csv 文字化け excel` | [guides/csv-encoding-fix] + csv系tools | 検索数多・恒常需要・dev/事務両方。クラスタ強化にも効く |
| `jpg jpeg 違い` | [guides/jpg-vs-jpeg-difference] | 定番の素朴な疑問・競合が薄い・即答できる |
| `webp 開けない` / `webp とは` | [guides/what-is-webp] + webp系tools | 「開けない」系は競合弱め・変換導線に直結 |
| `画像 正方形 切り抜き` / `アイコン 正方形 トリミング` | [guides/crop-image-to-square] + tools/crop-image | SNS/アイコン需要・ツールが直接解決 |
| `.avif とは` / `avif 開けない` | [guides/what-is-avif] + avif系tools | **GSC実証済み：2位（2026-06レポート・表示8/全体19）。** 計画はTier Aだったが現実が昇格させた最有力。被リンク/インデックス申請を集中 |

## Tier A（次に狙う）

| 検索語 | 対象ページ |
|---|---|
| `tiff 開けない` / `tiff とは` | guides/what-is-tiff |
| `スクリーンショット pdf まとめる` | guides/screenshot-to-pdf + tools/image-to-pdf |
| `履歴書 写真 サイズ 変更` | guides/resume-photo-size |
| `iphone 写真 pdf` | guides/iphone-photos-to-pdf |
| `画像 白黒 変換` / `モノクロ 加工` | guides/grayscale-photo + tools/grayscale-image |
| `画像 透かし 入れ方` | guides/add-watermark-to-image + tools/watermark-image |
| `parquet csv 変換` / `parquet とは` | guides/what-is-parquet + parquet系tools |
| `json csv 変換` | guides/json-and-csv + csv-to-json/json-to-csv |

## やること（このリストの使い方）
1. **被リンク**：Tier S に関係する記事を Qiita/Zenn に出す（HEIC/Parquet は下書き済→**公開するだけ**）。
2. **インデックスリクエスト**：GSCのURL検査で Tier S のページを優先リクエスト。
3. **内部リンク**：トップ/関連ガイドから Tier S へのリンクを厚く（一部実施済）。
4. **GSCで答え合わせ**：実際に表示されている語（クエリタブ）と突き合わせ、伸びている語に寄せる。

> 頭の語で消耗しない。**“開けない／とは／違い／直し方”系の悩みロングテール**に絞るのが、新規サイトが最初の100クリックに到達する最短ルート。
