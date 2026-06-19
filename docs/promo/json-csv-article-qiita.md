## TL;DR

- **JSON ⇄ CSV の相互変換**は、API のレスポンスを Excel で見たい / ログを集計したい / 設定を一覧にしたい…と地味によく発生する
- 変換自体は `jq`・Python・Node でもできるが、**ちょっと中身を見たいだけ**のときに環境を用意するのが面倒
- なので **ブラウザだけ・アップロードなし**で変換できるツールを作って無料公開しています（業務データを外に出さずに済む）
  - JSON → CSV: https://ai-image-tools.com/tools/json-to-csv
  - CSV → JSON: https://ai-image-tools.com/tools/csv-to-json
- この記事では「変換でハマる所（ネスト・文字コード・区切り）」と、ブラウザ／コマンド／コードそれぞれのやり方をまとめます。

## どんなときに変換したくなるか

- API の JSON レスポンスを **Excel/スプレッドシートで眺めたい**（非エンジニアに渡す時も）
- アプリのログ（JSON Lines）を **集計・グラフ化したい**
- マスタや設定の JSON を **一覧化してレビューしたい**
- 逆に、CSV で受け取ったデータを **コードで扱いやすい JSON にしたい**

「本格的な ETL を組むほどじゃないけど、いったん表で見たい」——この温度感が一番多い気がします。

## 構造の違い＝ハマりどころは「ネスト」

JSON は入れ子（オブジェクト・配列）を持てますが、CSV は**フラットな表**です。ここが変換の肝。

```json
[
  { "id": 1, "name": "佐藤", "tags": ["a", "b"], "addr": { "city": "東京" } },
  { "id": 2, "name": "鈴木", "tags": ["c"],      "addr": { "city": "大阪" } }
]
```

これを CSV にするには、ネストを**どう平らにするか**を決める必要があります。よくある流儀は2つ：

- **ドット記法でフラット化**：`addr.city` という列を作る
- **配列は文字列に結合**：`tags` を `"a,b"` のように1セルへ

```csv
id,name,tags,addr.city
1,佐藤,"a,b",東京
2,鈴木,c,大阪
```

逆（CSV→JSON）では、`addr.city` のような列名を**入れ子に戻すか**、フラットなまま `{"addr.city": "東京"}` にするかを選ぶことになります。「正解」は用途次第なので、ツール側がどちらの挙動かを把握しておくと事故りません。

## やり方①：ブラウザだけ（環境構築なし・アップロードなし）

「中身をちょっと見たいだけ」なら、これが一番速いです。手元の JSON/CSV を貼る or 選ぶだけで変換できます。**処理はブラウザ内で完結**するので、業務データや個人情報を含むファイルでも外部サーバーに送られません。

- JSON → CSV: https://ai-image-tools.com/tools/json-to-csv
- CSV → JSON: https://ai-image-tools.com/tools/csv-to-json

「そもそも JSON と CSV、どっちで持つべき？」という整理はこちらに書きました：
https://ai-image-tools.com/guides/json-and-csv

## やり方②：コマンド（jq / nkf）

JSON→CSV を `jq` で：

```bash
jq -r '(.[0] | keys_unsorted) as $k | $k, (.[] | [.[$k[]]]) | @csv' data.json > data.csv
```

ネストがある場合は事前に `jq` でフラット化しておくのが楽です。

文字化け対策（Excel は BOM 付き UTF-8 か Shift_JIS を好む）：

```bash
# UTF-8 → Excelで開いても化けない CSV（BOM付与）
printf '\xEF\xBB\xBF' > out.csv && cat data.csv >> out.csv
```

## やり方③：コード（Python / Node）

Python（標準ライブラリだけ）：

```python
import json, csv

rows = json.load(open("data.json", encoding="utf-8"))
keys = list(rows[0].keys())

# Excel対策で utf-8-sig（BOM付きUTF-8）にするのがコツ
with open("data.csv", "w", newline="", encoding="utf-8-sig") as f:
    w = csv.DictWriter(f, fieldnames=keys)
    w.writeheader()
    for r in rows:
        # 配列はそのままだと書けないので結合しておく
        w.writerow({k: ",".join(v) if isinstance(v, list) else v for k, v in r.items()})
```

CSV→JSON は `csv.DictReader` で読んで `json.dump(..., ensure_ascii=False)` するだけです。

## ハマりやすい3点（まとめ）

1. **ネスト**：JSON の入れ子をどう平らにするか（ドット列／配列の結合）を最初に決める
2. **文字コード**：Excel で開くなら **BOM 付き UTF-8（`utf-8-sig`）** が無難。化けたら Shift_JIS も疑う
3. **区切り・引用符**：値にカンマや改行が入るとズレる。**ちゃんとクォートする**実装で出す

---

ちょっと見たいだけなら**ブラウザ**、繰り返すなら**コード**、と使い分けると楽です。
ブラウザ版（無料・登録不要・アップロードなし）はこちら：

- JSON → CSV: https://ai-image-tools.com/tools/json-to-csv
- CSV → JSON: https://ai-image-tools.com/tools/csv-to-json

同じところで詰まった人に届けばと思って書きました。
