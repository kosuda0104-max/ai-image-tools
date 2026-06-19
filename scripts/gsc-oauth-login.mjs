// GSC OAuth ログイン（一度だけ実行してリフレッシュトークンを取得する）
// サービスアカウントキーが組織ポリシーで作れない環境向け。
//
// 事前準備（手順は docs/gsc-automation-setup.md）:
//   1) Google Cloud →「APIとサービス」→「認証情報」→ OAuth クライアントID（種類: デスクトップ アプリ）を作成
//   2) そのクライアントの「承認済みのリダイレクトURI」に http://localhost:5544 を追加
//   3) OAuth同意画面で webmasters.readonly を使う設定＋自分をテストユーザーに追加
//
// 実行:
//   GSC_OAUTH_CLIENT_ID=xxx GSC_OAUTH_CLIENT_SECRET=yyy node scripts/gsc-oauth-login.mjs
//   → 表示されたURLをブラウザで開き、GSCにアクセスできるGoogleアカウントで許可
//   → ターミナルに REFRESH TOKEN が出るので保存（GSC_OAUTH_REFRESH_TOKEN に設定）

import http from 'node:http';

const CLIENT_ID = need('GSC_OAUTH_CLIENT_ID');
const CLIENT_SECRET = need('GSC_OAUTH_CLIENT_SECRET');
const PORT = Number(process.env.GSC_OAUTH_PORT || 5544);
const REDIRECT = `http://localhost:${PORT}`;
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

const authUrl =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT,
    response_type: 'code',
    scope: SCOPE,
    access_type: 'offline', // refresh_token を得るため
    prompt: 'consent', // 毎回 refresh_token を返させる
  }).toString();

const server = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  const url = new URL(req.url, REDIRECT);
  const code = url.searchParams.get('code');
  const err = url.searchParams.get('error');
  if (err) {
    res.end(`認可エラー: ${err}`);
    console.error('✗ 認可エラー:', err);
    server.close();
    return;
  }
  if (!code) {
    res.end('code がありません');
    return;
  }
  try {
    const tr = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT,
        grant_type: 'authorization_code',
      }),
    });
    const j = await tr.json();
    res.end('完了しました。ターミナルに戻ってリフレッシュトークンを保存してください。');
    if (j.refresh_token) {
      console.log('\n==================== 成功 ====================');
      console.log('REFRESH TOKEN（これを保存して使う）:\n');
      console.log(j.refresh_token);
      console.log('\n使い方: 環境変数 GSC_OAUTH_REFRESH_TOKEN に設定（CIなら Secrets に登録）');
      console.log('==============================================');
    } else {
      console.error('✗ refresh_token が返りませんでした:', JSON.stringify(j));
      console.error('  → 既に同意済みの場合は prompt=consent で再取得。OAuth同意画面の設定も確認。');
    }
  } catch (e) {
    console.error('✗ トークン交換失敗:', e.message);
  } finally {
    server.close();
  }
});

server.listen(PORT, () => {
  console.log(`ローカルサーバ起動: ${REDIRECT}`);
  console.log('\n↓ このURLをブラウザで開き、GSCにアクセスできるGoogleアカウントで許可してください:\n');
  console.log(authUrl);
  console.log('');
});

function need(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`✗ 環境変数 ${name} が必要です。`);
    console.error('  例: GSC_OAUTH_CLIENT_ID=xxx GSC_OAUTH_CLIENT_SECRET=yyy node scripts/gsc-oauth-login.mjs');
    process.exit(1);
  }
  return v;
}
