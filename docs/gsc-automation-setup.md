# GSC週次SEOレポート 自動化セットアップ

`scripts/gsc-weekly-report.mjs` を動かすための手順。**コードはできているので、あとは“認証”を1回用意するだけ**です。

## 何ができるか
直近28日のSearch Consoleデータを取得し、
- サマリ（クリック/表示/CTR/平均順位）
- 🎯 **あと一押し**（順位8〜20位 × 表示あり＝1ページ目に近い語）
- 👀 表示は多いがクリック0（タイトル/説明の改善余地）
- 上位クエリ / 上位ページ

を Markdown（`docs/seo-reports/gsc-YYYY-MM-DD.md`）に保存＋標準出力。

---

## 認証方式の選択
- 組織ポリシー `iam.disableServiceAccountKeyCreation` で **SAキーが作れない** → **方式A（OAuth）** を使う ← 今回はこちら
- SAキーが作れる環境なら 方式B（サービスアカウント）でもOK

---

## 方式A：OAuth（推奨・サービスアカウントキー不要）

### 1回だけのセットアップ（あなたの作業）

1. **OAuthクライアント作成**
   - Google Cloud →「APIとサービス」→「**ライブラリ**」で **Google Search Console API** を有効化
   - 「**認証情報**」→「認証情報を作成」→「**OAuth クライアント ID**」→ 種類「**デスクトップ アプリ**」
   - 出てくる **クライアントID** と **クライアントシークレット** を控える
   - （注）これは“SAキー”ではないので、`disableServiceAccountKeyCreation` ポリシーには引っかかりません

2. **リダイレクトURIを許可**
   - 作ったOAuthクライアントを開き、「承認済みのリダイレクトURI」に **`http://localhost:5544`** を追加

3. **OAuth同意画面の設定**
   - ユーザータイプ「外部」→ スコープに `…/auth/webmasters.readonly` を追加
   - 「テストユーザー」に**自分のGoogleアカウント**（=GSCにアクセスできるアカウント）を追加
   - ⚠️ **重要：公開ステータスを「本番環境（In production）」に**しておく
     - 「テスト中」のままだと**リフレッシュトークンが7日で失効**し、週次が止まる。本番公開なら失効しない（未確認アプリの警告は出るが「続行」でOK）

4. **リフレッシュトークンを取得（1回）**
   ```bash
   GSC_OAUTH_CLIENT_ID=xxx GSC_OAUTH_CLIENT_SECRET=yyy node scripts/gsc-oauth-login.mjs
   ```
   - 表示されたURLをブラウザで開く → **GSCにアクセスできるGoogleアカウント**で許可
   - ターミナルに **REFRESH TOKEN** が出るので保存

### 実行（ローカル）
```bash
GSC_OAUTH_CLIENT_ID=xxx \
GSC_OAUTH_CLIENT_SECRET=yyy \
GSC_OAUTH_REFRESH_TOKEN=zzz \
GSC_SITE_URL="https://ai-image-tools.com/" \
node scripts/gsc-weekly-report.mjs
```
> ドメインプロパティの場合 `GSC_SITE_URL` は `sc-domain:ai-image-tools.com`。URLプレフィックスなら末尾スラッシュ込みのURL。
> 方式Aは「あなたのGoogleアカウント」の権限で読むので、**そのアカウントがGSCのオーナー/閲覧者ならOK**（SA方式と違いユーザー追加は不要）。

---

## 方式B：サービスアカウント（SAキーが作れる環境のみ）
1. サービスアカウント作成 → **JSONキー**をDL（※組織ポリシーで禁止だと作れない）
2. GSC →「設定」→「ユーザーと権限」→ そのSAの `client_email` を**閲覧で追加**
3. 鍵をリポジトリ直下に `.gsc-sa.json` で置く（`.gitignore`済・**絶対コミットしない**）
4. `node scripts/gsc-weekly-report.mjs`

---

## 週次で自動実行する（どれか1つ）

### C) GitHub Actions（推奨・PC不要）— `.github/workflows/gsc-weekly.yml`
- リポジトリ Settings → Secrets and variables → Actions
  - **Secrets**：`GSC_OAUTH_CLIENT_ID` / `GSC_OAUTH_CLIENT_SECRET` / `GSC_OAUTH_REFRESH_TOKEN`
  - **Variables**：`GSC_SITE_URL`（任意）
- 毎週月曜に自動実行し、レポートを `docs/seo-reports/` にコミットします。

### A) Windows タスクスケジューラ（このPC）
- 毎週月曜トリガー → プログラム `node`、引数 `scripts/gsc-weekly-report.mjs`、作業フォルダ=このリポジトリ
- 環境変数（`GSC_OAUTH_*`）はタスクのユーザー環境かバッチで設定

### B) cron（Mac/Linux/サーバ）
```cron
0 9 * * 1 cd /path/to/ai-image-tools && node scripts/gsc-weekly-report.mjs
```

### D) Claude Code のスケジュール
- `/schedule` で「毎週月曜にGSCレポートを実行して要約」も可能。

---

## トラブルシュート
- **数日でトークンが失効する**：OAuth同意画面が「テスト中」のまま。**「本番環境」に公開**する（方式A手順3）。
- **redirect_uri_mismatch**：OAuthクライアントに `http://localhost:5544` を登録し忘れ。
- **refresh_token が返らない**：既に同意済み。ヘルパーは `prompt=consent` 付きなので、別アカウントの同意が残っていないか確認。
- **403 / permission（方式B）**：SAの `client_email` をGSCのユーザーに追加し忘れ。
- **rows が空**：データ遅延（直近3日は出ない）／まだ表示が少ないだけ。
