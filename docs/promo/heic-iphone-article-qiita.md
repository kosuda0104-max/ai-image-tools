## TL;DR

- iPhone で撮った写真を Windows PC に送ると `.heic` で**開けない／表示されない**ことがある
- 原因は iPhone の「高効率」設定で保存される **HEIF／HEIC** に、受け取り側が対応していないから
- いちばん手軽な解決策は **HEIC を JPG/PNG に変換する**こと。アプリを入れずブラウザだけで終わらせたかったので、**Filewisp**（https://ai-image-tools.com ）というツール集を作って無料公開しています
  - HEIC → JPG: https://ai-image-tools.com/tools/heic-to-jpg
  - HEIC → PNG: https://ai-image-tools.com/tools/heic-to-png

同じところで詰まった人に届けばと思って書きます。

**【画像①】heic-explainer.png をここにドラッグ&ドロップ**

## 何が起きるか

**【画像②】heic-error-windows.png をここにドラッグ&ドロップ**

「iPhone の写真を Windows のPCに送ったら、サムネイルが出ない／開けない」——わりとよくある相談です。具体的には、

- メールやチャットで送った写真の拡張子が `.heic` になっていて、ダブルクリックしても開けない
- 提出フォームやアップロード先が「JPEG/PNG のみ対応」で弾かれる
- 印刷サービスや古いソフトに取り込めない

写真そのものが壊れているわけではなく、**ファイル形式が相手の環境に合っていない**だけ、というのがほとんどです。

## なぜ HEIC になるのか

iPhone は iOS 11 以降、カメラの「高効率」設定で写真を **HEIF** として保存し、一般に `.heic` という拡張子を使います。理由はシンプルで、

- JPEGより効率よく圧縮し、同等の見た目でストレージ使用量を抑えやすい
- Live Photosなど、Appleの写真ワークフローで必要な情報を扱える

端末のストレージを節約できる優秀な形式です。問題は、**受け取り側（Windows・一部のWebサービス・古いアプリ）がまだ HEIC に対応しきれていない**こと。撮る側にとっては効率的でも、渡す相手の環境次第で「開けない」が発生します。

> ちなみに iPhone 側で「設定 → カメラ → フォーマット → 互換性優先」にしておくと、以後の撮影は JPEG で保存されます。ただし**すでに撮った HEIC 写真には効かない**ので、過去の写真は結局変換が必要になります。

**【画像③】iphone-camera-format.png をここにドラッグ&ドロップ**

## どう解決するか

選択肢はいくつかあります。

| 方法 | 手軽さ | 注意点 |
|---|---|---|
| iPhoneでJPEGとして送る | ◎ | メール添付など一部の経路のみ。AirDrop等では HEIC のまま渡ることも |
| Windowsに拡張機能を入れる | △ | ストアからの追加が必要。環境により有償・うまく入らないことも |
| 変換アプリを入れる | △ | インストールが必要。写真をアプリに読み込ませる手間 |
| ブラウザで変換する | ◎ | 入れるものなし。枚数が多いときも一括でいける |

「**過去の HEIC をまとめて JPG にしたい**」「PCに余計なものを入れたくない」なら、ブラウザ変換がいちばん手数が少ないです。

## 作ったもの

そのための変換を**ブラウザ内で完結**させたのが Filewisp です。

- **HEIC → JPG**: https://ai-image-tools.com/tools/heic-to-jpg
- **HEIC → PNG**: https://ai-image-tools.com/tools/heic-to-png

特徴：

- **アップロード不要・ブラウザ内処理**：写真は外部サーバーに送られません。家族や個人の写真でも、手元で完結します。
- **複数枚まとめて変換**できる（旅行で撮りためた写真もそのまま）
- インストール不要、無料、スマホのブラウザでも動く

### 使う流れ

1. `.heic` ファイルをブラウザにドロップ
2. JPG か PNG を選ぶ（共有・印刷なら JPG、透過や劣化を避けたいなら PNG）
3. 変換 → ダウンロード

**【画像④】filewisp-convert-steps.png をここにドラッグ&ドロップ**

### 注意点（正直に）

- Live Photos の「動き」部分は引き継がれず、静止画として変換されます
- 一度に大量（数百枚〜）を入れると、ブラウザのメモリ次第で重くなることがあります。その場合は何回かに分けてください
- 撮影日時・位置情報などのメタデータは変換時に保持されないことがあります。必要な写真は元のHEICも残してください

## もう少し詳しい解説

背景や手順はガイドにもまとめています。

- HEICがWindowsで開けないときの対処: https://ai-image-tools.com/guides/heic-cannot-open-windows
- HEICをJPGに変換する方法（iPhone写真）: https://ai-image-tools.com/guides/heic-to-jpg-guide

## 参考にした公式資料

- Apple：Apple製のデバイスでHEIF／HEVCメディアを扱う
  - https://support.apple.com/ja-jp/116944
- Microsoft：WindowsのフォトでHEIF／HEVCを表示できない場合
  - https://support.microsoft.com/en-us/windows/photos-app-video-editor-error-can-t-view-this-file-type-173ae0be-2b7d-d413-589e-84ccca0de02e

## おわりに

「iPhoneの写真がPCで開けない」——地味だけど多くの人がぶつかる場面です。同じところで止まった人の役に立てば嬉しいです。Filewisp は他にも画像・PDF・データ系の変換ツールをまとめているので、よければ覗いてみてください。要望やバグがあれば気軽に教えてください。
