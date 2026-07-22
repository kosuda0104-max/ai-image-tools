import type { AwsToolContent } from "@/src/data/aws-tool-content";
import type { AwsToolKind } from "@/src/lib/aws-converter";

const commonRelated = (current: "dynamodb" | "cloudtrail") => [
  ...(current === "dynamodb"
    ? [{ name: "CloudTrail 日誌轉 CSV", href: "/zh-tw/tools/cloudtrail-log-to-csv" }]
    : [{ name: "DynamoDB JSON 轉換器", href: "/zh-tw/tools/dynamodb-json-converter" }]),
  { name: "Parquet 轉 CSV", href: "/zh-tw/tools/parquet-to-csv" },
  { name: "AWS 匯出檔案格式指南", href: "/zh-tw/guides/aws-export-file-formats" },
];

const dynamodb: AwsToolContent = {
  slug: "dynamodb-json-converter",
  accept: ".json,.jsonl,.gz,application/json,application/gzip",
  multiple: false,
  title: "DynamoDB JSON 轉換器",
  description:
    "將 DynamoDB 型別 JSON、JSON Lines 與 S3 匯出的 .json.gz 轉成一般 JSON、CSV 或 Excel。處理只在瀏覽器內完成。",
  aboutTitle: "什麼是 DynamoDB JSON 轉換器？",
  aboutText:
    "DynamoDB 使用 S、N、BOOL、M、L 等 AttributeValue 型別包裝資料。本工具會解除型別包裝，攤平巢狀欄位，再輸出成容易閱讀與分享的格式。",
  contentSections: [
    {
      title: "直接讀取 S3 匯出檔",
      paragraphs: [
        "支援完整匯出的每行一個 Item JSONL、gzip 壓縮檔、Scan 回應的 Items 陣列，以及含 Keys、NewImage、OldImage 的增量匯出格式。",
        "N 型別會保留為文字，避免大型整數失去精度。巢狀 M 型別會展開為點號欄位，集合與清單則保留為 JSON 陣列。",
      ],
    },
  ],
  listSections: [
    {
      title: "支援的 DynamoDB 資料",
      items: [
        "S、N、B、BOOL 與 NULL",
        "SS、NS 與 BS 集合",
        "巢狀 M 與 L",
        "完整匯出的 Item",
        "增量匯出的 Keys、NewImage 與 OldImage",
        ".json、.jsonl 與 .json.gz",
      ],
    },
  ],
  comparisonTitle: "如何選擇輸出格式",
  comparisonItems: [
    { label: "一般 JSON", value: "移除型別包裝，方便程式與指令稿再次使用。" },
    { label: "CSV", value: "適合快速檢查、篩選或匯入其他系統。" },
    { label: "Excel", value: "適合以表格檢查欄位並分享給團隊成員。" },
  ],
  stepsTitle: "使用方式",
  steps: [
    "選擇 DynamoDB JSON、JSONL 或 JSON.GZ",
    "按下轉換按鈕",
    "檢查欄位與前幾筆資料",
    "選擇 JSON、CSV 或 Excel 下載",
  ],
  faqTitle: "常見問題",
  faqs: [
    {
      question: "DynamoDB 的 N 會轉成數字嗎？",
      answer: "不會。N 會保留為文字，避免超過 JavaScript 安全範圍的大型整數失去精度。",
    },
    {
      question: "支援增量匯出嗎？",
      answer: "支援。Keys、NewImage、OldImage 與 Metadata 會分別保留並展開成欄位。",
    },
    {
      question: "檔案會傳送到 AWS 或其他伺服器嗎？",
      answer: "不會。解壓縮與轉換都在您的瀏覽器內進行。",
    },
  ],
  relatedTools: commonRelated("dynamodb"),
  ui: {
    dropTitle: "選擇 DynamoDB JSON",
    dropDescription: "支援 .json、.jsonl 與 .json.gz",
    convert: "轉換 DynamoDB JSON",
    converting: "轉換中...",
    success: (rows) => `完成：已轉換 ${rows.toLocaleString("zh-TW")} 筆 Item。`,
    error: "錯誤",
    preview: "轉換預覽",
    previewNote: "最多顯示前 10 筆。",
    outputTitle: "輸出格式",
    download: "下載",
    formats: [
      { format: "json", label: "JSON" },
      { format: "csv", label: "CSV" },
      { format: "xlsx", label: "Excel" },
    ],
    stats: { items: "Item 數量", columns: "欄位數量" },
  },
};

const cloudtrail: AwsToolContent = {
  slug: "cloudtrail-log-to-csv",
  accept: ".json,.jsonl,.gz,application/json,application/gzip",
  multiple: true,
  title: "CloudTrail 日誌轉 CSV",
  description:
    "合併 S3 中多個 AWS CloudTrail .json.gz 日誌，並將 Records 轉成 CSV 或 JSONL。所有處理都在瀏覽器內完成。",
  aboutTitle: "什麼是 CloudTrail 日誌轉換器？",
  aboutText:
    "展開 CloudTrail 的 Records 陣列，將 eventTime、eventSource、eventName、userIdentity 與錯誤資訊整理成容易搜尋與篩選的欄位。",
  contentSections: [
    {
      title: "合併多個 S3 日誌進行稽核",
      paragraphs: [
        "此工具處理 Trail 傳送到 S3 的 gzip JSON，而不是主控台最近事件的 CSV。可一次選擇多個檔案，並保留 sourceFile 欄位。",
        "requestParameters 與 responseElements 會保留為 JSON 文字，避免產生過多欄位；常用的 userIdentity 資訊則會獨立展開。",
      ],
    },
  ],
  listSections: [
    {
      title: "便於檢查的欄位",
      items: [
        "eventTime、eventSource 與 eventName",
        "awsRegion 與 sourceIPAddress",
        "userIdentity 的 type、ARN 與 principalId",
        "errorCode 與 errorMessage",
        "requestParameters 與 resources",
        "原始日誌檔名",
      ],
    },
  ],
  comparisonTitle: "CSV 與 JSONL",
  comparisonItems: [
    { label: "CSV", value: "適合在 Excel 中篩選與人工檢查稽核事件。" },
    { label: "JSONL", value: "每行保留一個事件，適合 jq、DuckDB 與日誌管線。" },
  ],
  stepsTitle: "使用方式",
  steps: [
    "選擇一個或多個 S3 匯出的 .json.gz",
    "按下轉換按鈕",
    "檢查事件與錯誤欄位",
    "下載 CSV 或 JSONL",
  ],
  faqTitle: "常見問題",
  faqs: [
    {
      question: "可以合併多個 .json.gz 嗎？",
      answer: "可以。工具會合併所有選取檔案的 Records，並保留每筆事件的來源檔名。",
    },
    {
      question: "可以處理 CloudTrail Lake 匯出嗎？",
      answer: "此工具主要針對 Trail 傳送到 S3 的 Records 格式。",
    },
    {
      question: "敏感稽核日誌會上傳嗎？",
      answer: "不會。解壓縮與轉換只在您的瀏覽器內完成。",
    },
  ],
  relatedTools: commonRelated("cloudtrail"),
  ui: {
    dropTitle: "選擇 CloudTrail 日誌",
    dropDescription: "可選擇多個 .json.gz、.json 或 .jsonl",
    convert: "轉換 CloudTrail 日誌",
    converting: "正在合併日誌...",
    success: (rows) => `完成：已合併 ${rows.toLocaleString("zh-TW")} 筆 CloudTrail 事件。`,
    error: "錯誤",
    preview: "事件預覽",
    previewNote: "最多顯示前 10 筆事件。",
    outputTitle: "輸出格式",
    download: "下載",
    formats: [
      { format: "csv", label: "CSV" },
      { format: "jsonl", label: "JSONL" },
    ],
    stats: { events: "事件數量", files: "檔案數量" },
  },
};

export function getZhTwAwsToolContent(kind: AwsToolKind): AwsToolContent {
  if (kind === "dynamodb") return dynamodb;
  if (kind === "cloudtrail") return cloudtrail;
  throw new Error(`AWS tool is not available in zh-TW: ${kind}`);
}
