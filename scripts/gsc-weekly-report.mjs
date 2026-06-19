// GSC 週次SEOレポート（依存なし・Node標準のみ / Node 18+）
//
// やること: Search Console API から直近28日のデータを取得し、
//   - サマリ（クリック/表示/CTR/平均順位）
//   - 🎯 あと一押し（順位8〜20位 × 表示あり = 1ページ目に近い語）
//   - 👀 表示は多いがクリック0（タイトル/説明の改善余地）
//   - 上位クエリ / 上位ページ
// を Markdown レポートにして docs/seo-reports/ に保存＋標準出力する。
//
// 使い方:
//   1) サービスアカウントのJSONキーを用意し（手順は docs/gsc-automation-setup.md）
//   2) 環境変数 or 既定パスに置く:
//        GSC_SA_KEY_FILE=./.gsc-sa.json   （JSONキーのパス。既定: ./.gsc-sa.json）
//        GSC_SITE_URL=https://ai-image-tools.com/   （GSCのプロパティURL。末尾スラッシュ込み）
//   3) node scripts/gsc-weekly-report.mjs
//
// ※ .gsc-sa.json は必ず .gitignore に入れること（秘密鍵）。

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.GSC_SITE_URL || 'https://ai-image-tools.com/';
const KEY_FILE = process.env.GSC_SA_KEY_FILE || './.gsc-sa.json';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';

main().catch((e) => {
  console.error('\n✗ エラー:', e.message);
  console.error('  セットアップ手順は docs/gsc-automation-setup.md を参照してください。');
  process.exit(1);
});

async function main() {
  const token = await getAccessToken();

  const end = new Date(Date.now() - 3 * 86400000); // GSCは2〜3日遅延するため -3日
  const start = new Date(end.getTime() - 27 * 86400000); // 28日窓
  const range = { startDate: ymd(start), endDate: ymd(end) };

  const [byQuery, byPage] = await Promise.all([
    query(token, { ...range, dimensions: ['query'], rowLimit: 250 }),
    query(token, { ...range, dimensions: ['page'], rowLimit: 100 }),
  ]);

  const totals = byQuery.reduce(
    (a, r) => ({ clicks: a.clicks + r.clicks, impressions: a.impressions + r.impressions }),
    { clicks: 0, impressions: 0 },
  );
  const avgPos = byQuery.length
    ? byQuery.reduce((s, r) => s + r.position * r.impressions, 0) / (totals.impressions || 1)
    : 0;

  // 🎯 あと一押し: 順位8〜20位 × 表示あり（1ページ目に近い＝伸ばしやすい）
  const striking = byQuery
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 1)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);

  // 👀 表示はあるがクリック0（タイトル/説明の改善余地）
  const noClick = byQuery
    .filter((r) => r.clicks === 0 && r.impressions >= 2)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);

  const topQueries = [...byQuery].sort((a, b) => b.impressions - a.impressions).slice(0, 20);
  const topPages = [...byPage].sort((a, b) => b.impressions - a.impressions).slice(0, 20);

  // 🎯 ページ単位の「あと一押し」（順位8〜20位）— クエリが圏外でもページが惜しい場合に拾う
  const pageStriking = byPage
    .filter((r) => r.position >= 8 && r.position <= 20 && r.impressions >= 1)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 20);

  const md = buildMarkdown({ SITE_URL, range, totals, avgPos, striking, pageStriking, noClick, topQueries, topPages });

  const outDir = path.join(process.cwd(), 'docs', 'seo-reports');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `gsc-${range.endDate}.md`);
  fs.writeFileSync(outFile, md);
  console.log(md);
  console.log(`\n✓ 保存: ${path.relative(process.cwd(), outFile)}`);

  await sendEmailIfConfigured(md, range);
}

// RESEND_API_KEY と GSC_REPORT_EMAIL が設定されていればレポートをメール送信する。
// from は GSC_REPORT_FROM（未設定なら onboarding@resend.dev = ドメイン認証不要・自分宛なら届く）。
async function sendEmailIfConfigured(md, range) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.GSC_REPORT_EMAIL;
  if (!key || !to) return;
  const from = process.env.GSC_REPORT_FROM || 'GSC Report <onboarding@resend.dev>';
  const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const html = `<pre style="font-family:ui-monospace,monospace;white-space:pre-wrap;font-size:13px;line-height:1.6">${esc(md)}</pre>`;
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: to.split(',').map((s) => s.trim()).filter(Boolean),
        subject: `GSC週次レポート ${range.endDate}（${SITE_URL}）`,
        html,
        text: md,
      }),
    });
    if (!res.ok) console.error('✗ メール送信失敗:', res.status, await res.text().catch(() => ''));
    else console.log(`✉ メール送信: ${to}`);
  } catch (e) {
    console.error('✗ メール送信エラー:', e.message);
  }
}

function buildMarkdown({ SITE_URL, range, totals, avgPos, striking, pageStriking, noClick, topQueries, topPages }) {
  const ctr = totals.impressions ? (totals.clicks / totals.impressions) * 100 : 0;
  const L = [];
  L.push(`# GSC週次レポート（${range.startDate} 〜 ${range.endDate}）`);
  L.push(`プロパティ: ${SITE_URL}\n`);
  L.push('## サマリ');
  L.push(`- クリック: **${totals.clicks}** / 表示: **${totals.impressions}** / CTR: **${ctr.toFixed(1)}%** / 平均順位: **${avgPos.toFixed(1)}**\n`);

  L.push('## 🎯 あと一押し（クエリ単位・順位8〜20位・表示あり）');
  L.push('> ここに被リンク・内部リンク・タイトル微調整を集中させると、最短でクリックが増える。');
  L.push(table(['クエリ', '順位', '表示', 'クリック'], striking.map((r) => [r.keys[0], r.position.toFixed(1), r.impressions, r.clicks])));

  L.push('\n## 🎯 あと一押し（ページ単位・順位8〜20位）');
  L.push('> 個別ページがあと少しで1ページ目。クエリが圏外でも拾える＝内部リンク/被リンクを当てる対象。');
  L.push(table(['ページ', '順位', '表示', 'クリック'], pageStriking.map((r) => [shortUrl(r.keys[0]), r.position.toFixed(1), r.impressions, r.clicks])));

  L.push('\n## 👀 表示は多いがクリック0（タイトル/説明の改善余地）');
  L.push(table(['クエリ', '表示', '順位'], noClick.map((r) => [r.keys[0], r.impressions, r.position.toFixed(1)])));

  L.push('\n## 上位クエリ（表示順）');
  L.push(table(['クエリ', '表示', 'クリック', '順位'], topQueries.map((r) => [r.keys[0], r.impressions, r.clicks, r.position.toFixed(1)])));

  L.push('\n## 上位ページ（表示順）');
  L.push(table(['ページ', '表示', 'クリック', '順位'], topPages.map((r) => [shortUrl(r.keys[0]), r.impressions, r.clicks, r.position.toFixed(1)])));

  L.push('\n---');
  L.push('次アクション: 🎯の語を `docs/winnable-queries.md` の Tier S と突き合わせ、被リンク/インデックスリクエストを集中。');
  return L.join('\n');
}

function table(headers, rows) {
  if (!rows.length) return '（該当なし）';
  const head = `| ${headers.join(' | ')} |`;
  const sep = `| ${headers.map(() => '---').join(' | ')} |`;
  const body = rows.map((r) => `| ${r.join(' | ')} |`).join('\n');
  return [head, sep, body].join('\n');
}

function shortUrl(u) {
  try { return new URL(u).pathname || u; } catch { return u; }
}

async function query(token, body) {
  const url = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (json.error) throw new Error(`Search Console API: ${json.error.message || JSON.stringify(json.error)}`);
  return json.rows || [];
}

function loadServiceAccount() {
  let raw;
  if (process.env.GSC_SA_KEY) {
    raw = process.env.GSC_SA_KEY; // CI（GitHub Actions等）: JSON全文をシークレットで渡す
  } else {
    const p = path.resolve(KEY_FILE);
    if (!fs.existsSync(p)) {
      throw new Error(`サービスアカウントキーが見つかりません: ${p}（GSC_SA_KEY_FILE で指定 or 環境変数 GSC_SA_KEY にJSON全文）`);
    }
    raw = fs.readFileSync(p, 'utf8');
  }
  const sa = JSON.parse(raw);
  if (!sa.client_email || !sa.private_key) throw new Error('キーJSONに client_email / private_key がありません');
  return sa;
}

async function getAccessToken() {
  // ① OAuthモード（推奨・サービスアカウントキー不要）
  //    組織ポリシー iam.disableServiceAccountKeyCreation でSAキーが作れない環境でも使える。
  //    必要: GSC_OAUTH_CLIENT_ID / GSC_OAUTH_CLIENT_SECRET / GSC_OAUTH_REFRESH_TOKEN
  //    （リフレッシュトークンは scripts/gsc-oauth-login.mjs で一度だけ取得）
  if (process.env.GSC_OAUTH_REFRESH_TOKEN) {
    const res = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: requireEnv('GSC_OAUTH_CLIENT_ID'),
        client_secret: requireEnv('GSC_OAUTH_CLIENT_SECRET'),
        refresh_token: process.env.GSC_OAUTH_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });
    const json = await res.json();
    if (!json.access_token) throw new Error(`OAuthトークン更新失敗: ${JSON.stringify(json)}`);
    return json.access_token;
  }

  // ② SAモード（SAキー作成が許可されている環境のみ）
  const sa = loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const input = `${header}.${claim}`;
  const sig = b64url(crypto.sign('RSA-SHA256', Buffer.from(input), sa.private_key));
  const jwt = `${input}.${sig}`;

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: jwt }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`トークン取得失敗: ${JSON.stringify(json)}`);
  return json.access_token;
}

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`環境変数 ${name} が未設定です（OAuthモードに必要）`);
  return process.env[name];
}

function b64url(input) {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function ymd(d) { return d.toISOString().slice(0, 10); }
