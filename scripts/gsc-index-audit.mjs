// GSC URL Inspection API で index-request-secretary.md の未完了URLを一括監査する。

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const SITE_URL = process.env.GSC_SITE_URL || 'https://ai-image-tools.com/';
const KEY_FILE = process.env.GSC_SA_KEY_FILE || './.gsc-sa.json';
const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const INSPECTION_URL = 'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect';
const SCOPE = 'https://www.googleapis.com/auth/webmasters.readonly';
const SOURCE_FILE = path.join(process.cwd(), 'docs', 'index-request-secretary.md');
const DRY_RUN = process.argv.includes('--dry-run');
const APPLY_RESULTS = process.env.GSC_INDEX_AUDIT_APPLY === '1';

main().catch((error) => {
  console.error(`\nAudit failed: ${error.message}`);
  process.exit(1);
});

async function main() {
  const urls = readPendingUrls();
  console.log(`Pending URLs: ${urls.length}`);

  if (DRY_RUN) {
    console.log(urls.join('\n'));
    return;
  }

  const token = await getAccessToken();
  const results = await mapWithConcurrency(urls, 5, async (url, index) => {
    process.stdout.write(`[${index + 1}/${urls.length}] ${url} ... `);
    try {
      const inspection = await inspectUrl(token, url);
      const status = normalizeResult(url, inspection);
      console.log(status.indexed ? 'indexed' : status.coverageState || status.verdict);
      return status;
    } catch (error) {
      console.log(`error: ${error.message}`);
      return { url, indexed: false, error: error.message };
    }
  });

  const date = jstDate();
  const report = buildReport(date, results);
  const outDir = path.join(process.cwd(), 'docs', 'seo-reports');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `index-audit-${date}.md`);
  fs.writeFileSync(outFile, report);
  console.log(`\nSaved: ${path.relative(process.cwd(), outFile)}`);

  if (APPLY_RESULTS) {
    applyResultsToSecretary(date, results);
    console.log(`Updated: ${path.relative(process.cwd(), SOURCE_FILE)}`);
  }
}

function readPendingUrls() {
  const markdown = fs.readFileSync(SOURCE_FILE, 'utf8');
  const matches = markdown.matchAll(/^- \[ \] (https:\/\/ai-image-tools\.com\/\S+)/gm);
  return [...new Set([...matches].map((match) => match[1]))];
}

async function inspectUrl(token, inspectionUrl) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(INSPECTION_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inspectionUrl, siteUrl: SITE_URL, languageCode: 'ja-JP' }),
    });
    const json = await response.json();
    if (response.ok) return json.inspectionResult;

    const message = json.error?.message || `${response.status} ${response.statusText}`;
    if (attempt === 3 || ![429, 500, 502, 503, 504].includes(response.status)) {
      throw new Error(message);
    }
    await delay(attempt * 1000);
  }
}

function normalizeResult(url, inspection) {
  const index = inspection?.indexStatusResult || {};
  return {
    url,
    indexed: index.verdict === 'PASS',
    verdict: index.verdict || 'VERDICT_UNSPECIFIED',
    coverageState: index.coverageState || '',
    robotsTxtState: index.robotsTxtState || '',
    indexingState: index.indexingState || '',
    pageFetchState: index.pageFetchState || '',
    lastCrawlTime: index.lastCrawlTime || '',
    googleCanonical: index.googleCanonical || '',
    userCanonical: index.userCanonical || '',
    inspectionResultLink: inspection?.inspectionResultLink || '',
  };
}

function buildReport(date, results) {
  const indexed = results.filter((result) => result.indexed);
  const pending = results.filter((result) => !result.indexed && !result.error);
  const errors = results.filter((result) => result.error);
  const lines = [
    `# GSCインデックス監査（${date}）`,
    `プロパティ: ${SITE_URL}`,
    '',
    '## サマリ',
    `- 監査: **${results.length} URL**`,
    `- 登録済み: **${indexed.length}**`,
    `- 未登録: **${pending.length}**`,
    `- 取得エラー: **${errors.length}**`,
    '',
    '## 次の手動申請候補（先頭10件）',
    '> URL Inspection APIは登録状況の読み取り専用。下記への登録リクエストはSearch Console画面で行う。',
    ...pending.slice(0, 10).map((result) => `- [ ] ${result.url} — ${result.coverageState || result.verdict}`),
    '',
    '## 登録済み',
    ...table(indexed),
    '',
    '## 未登録',
    ...table(pending),
  ];

  if (errors.length) {
    lines.push('', '## 取得エラー');
    lines.push(...errors.map((result) => `- ${result.url}: ${escapeCell(result.error)}`));
  }

  lines.push('', '---', '生成: `node scripts/gsc-index-audit.mjs`');
  return `${lines.join('\n')}\n`;
}

function applyResultsToSecretary(date, results) {
  let markdown = fs.readFileSync(SOURCE_FILE, 'utf8');
  const indexed = results.filter((result) => result.indexed);
  const pending = results.filter((result) => !result.indexed && !result.error);
  const errors = results.filter((result) => result.error);

  for (const result of indexed) {
    const unchecked = new RegExp(`^- \\[ \\] ${escapeRegex(result.url)}$`, 'gm');
    markdown = markdown.replace(unchecked, `- [x] ${result.url}`);
  }

  const queue = [
    `## 🚦 本日申請する10件（${date.replaceAll('-', '/')}）`,
    '',
    `> ${date}のURL Inspection API監査で未登録だったURLを、既存の優先順で並べた先頭10件。`,
    '> APIは登録状況の読み取り専用。「インデックス登録をリクエスト」はSearch Console画面で1件ずつ行う。',
    '',
    ...pending.slice(0, 10).map((result) => `- [ ] ${result.url}`),
  ].join('\n');
  markdown = markdown.replace(
    /## 🚦 本日申請する10件（[^）]+）[\s\S]*?\n---/,
    `${queue}\n\n---`,
  );

  const progressRow = `| ${date.replaceAll('-', '/')} | URL Inspection API監査 | 監査対象${results.length}中${indexed.length} | 登録済み${indexed.length}・未登録${pending.length}・取得エラー${errors.length}。手動申請は未実施 |`;
  const progressPattern = new RegExp(`^\\| ${escapeRegex(date.replaceAll('-', '/'))} \\| URL Inspection API監査 \\|.*$`, 'm');
  if (progressPattern.test(markdown)) {
    markdown = markdown.replace(progressPattern, progressRow);
  } else {
    markdown = markdown.replace('|  |  |  |  |', `${progressRow}\n|  |  |  |  |`);
  }

  const log = buildAuditLog(date, results, indexed, pending, errors);
  const previousQueueLog = /### 2026\/07\/16 — インデックス申請10件の継続キュー確認[\s\S]*?(?=\n### |\n---)/;
  if (previousQueueLog.test(markdown)) {
    markdown = markdown.replace(previousQueueLog, log.trimEnd());
  } else if (!markdown.includes(`### ${date.replaceAll('-', '/')} — GSC未完了URLの一括監査`)) {
    markdown = markdown.replace('## 🛠️ 対応ログ（やったこと記録）\n', `## 🛠️ 対応ログ（やったこと記録）\n\n${log}`);
  }

  fs.writeFileSync(SOURCE_FILE, markdown);
}

function buildAuditLog(date, results, indexed, pending, errors) {
  const displayDate = date.replaceAll('-', '/');
  return [
    `### ${displayDate} — GSC未完了URLの一括監査`,
    `**監査結果:** 未完了として記録されていた${results.length} URLをURL Inspection APIで確認し、登録済み${indexed.length}・未登録${pending.length}・取得エラー${errors.length}だった。`,
    '',
    '**反映内容:**',
    `- 登録済み${indexed.length} URLは、チェックリスト内の同じURLをすべて \`[x]\` に更新。`,
    '- 本日の申請候補は、未登録URLの優先順先頭10件へ差し替え。',
    '- URL Inspection APIは読み取り専用のため、手動の「インデックス登録をリクエスト」はまだ実施していない。',
    `- 詳細: \`docs/seo-reports/index-audit-${date}.md\``,
    '',
  ].join('\n');
}

function table(results) {
  if (!results.length) return ['（該当なし）'];
  return [
    '| URL | 判定 | カバレッジ | 最終クロール | Google canonical |',
    '| --- | --- | --- | --- | --- |',
    ...results.map((result) => {
      const canonical = result.googleCanonical
        ? result.googleCanonical === result.url ? '一致' : result.googleCanonical
        : '-';
      return `| ${shortUrl(result.url)} | ${result.verdict} | ${escapeCell(result.coverageState || '-')} | ${shortDate(result.lastCrawlTime)} | ${escapeCell(canonical)} |`;
    }),
  ];
}

async function mapWithConcurrency(items, concurrency, worker) {
  const results = new Array(items.length);
  let nextIndex = 0;
  const runners = Array.from({ length: Math.min(concurrency, items.length) }, async () => {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await worker(items[index], index);
    }
  });
  await Promise.all(runners);
  return results;
}

async function getAccessToken() {
  if (process.env.GSC_OAUTH_REFRESH_TOKEN) {
    const response = await fetch(TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: requireEnv('GSC_OAUTH_CLIENT_ID'),
        client_secret: requireEnv('GSC_OAUTH_CLIENT_SECRET'),
        refresh_token: process.env.GSC_OAUTH_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });
    const json = await response.json();
    if (!json.access_token) throw new Error(`OAuth token refresh failed: ${json.error_description || json.error}`);
    return json.access_token;
  }

  const serviceAccount = loadServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = base64url(JSON.stringify({
    iss: serviceAccount.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }));
  const input = `${header}.${claim}`;
  const signature = base64url(crypto.sign('RSA-SHA256', Buffer.from(input), serviceAccount.private_key));
  const response = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${input}.${signature}`,
    }),
  });
  const json = await response.json();
  if (!json.access_token) throw new Error(`Service account token failed: ${json.error_description || json.error}`);
  return json.access_token;
}

function loadServiceAccount() {
  const raw = process.env.GSC_SA_KEY
    || (fs.existsSync(KEY_FILE) ? fs.readFileSync(KEY_FILE, 'utf8') : '');
  if (!raw) throw new Error('GSC OAuth variables or service account key are required');
  const serviceAccount = JSON.parse(raw);
  if (!serviceAccount.client_email || !serviceAccount.private_key) {
    throw new Error('Service account key is missing client_email or private_key');
  }
  return serviceAccount;
}

function requireEnv(name) {
  if (!process.env[name]) throw new Error(`Missing environment variable: ${name}`);
  return process.env[name];
}

function base64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function shortUrl(url) {
  try { return new URL(url).pathname || '/'; } catch { return url; }
}

function shortDate(timestamp) {
  return timestamp ? timestamp.slice(0, 10) : '-';
}

function escapeCell(value) {
  return String(value).replace(/\|/g, '\\|').replace(/\r?\n/g, ' ');
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function jstDate() {
  return new Date(Date.now() + 9 * 60 * 60 * 1000).toISOString().slice(0, 10);
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
