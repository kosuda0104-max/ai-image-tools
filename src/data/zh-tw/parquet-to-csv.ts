import type { ParquetToCsvContent } from "@/src/data/tools/parquet-to-csv";

export const parquetToCsvZhTwContent: ParquetToCsvContent = {
  page: {
    title: "Parquet 轉 CSV",
    description:
      "免費在瀏覽器內將 Parquet 檔案轉成 CSV，不需上傳。適合檢查 AWS S3、Athena、BigQuery 與 Spark 資料。",
    aboutTitle: "為什麼要將 Parquet 轉成 CSV？",
    aboutText:
      "Parquet 適合分析平台儲存大量資料，但不方便直接用 Excel 查看。這項工具在瀏覽器內讀取 Parquet，轉成一般 CSV，檔案不會傳送到外部伺服器。",
    contentSections: [
      {
        title: "適合使用的情況",
        paragraphs: [
          "需要快速查看 Athena、S3、BigQuery 或 Spark 產生的 Parquet 時，可先轉成 CSV，再用 Excel、試算表或文字編輯器檢查欄位與資料列。",
          "處理完全在您的裝置中進行，適合不方便上傳到第三方服務的資料。大型檔案仍會受到裝置記憶體限制。",
        ],
      },
      {
        title: "Parquet 與 CSV 的差異",
        paragraphs: [
          "Parquet 是壓縮的欄式格式，適合大量查詢與分析；CSV 是純文字格式，相容性高，也更容易人工檢查。",
          "CSV 不保留 Parquet 的壓縮與完整型別資訊，因此輸出檔案通常會變大。巢狀物件也可能以字串方式呈現。",
        ],
      },
    ],
    listSections: [
      {
        title: "轉換前請注意",
        items: [
          "NULL 值會輸出為空白欄位。",
          "日期與時間戳記會轉成文字。",
          "巢狀欄位與 Map 型別不一定能完整攤平成表格。",
          "檔案越大，所需的瀏覽器記憶體與處理時間越多。",
        ],
      },
    ],
    comparisonTitle: "格式比較",
    comparisonItems: [
      { label: "Parquet", value: "壓縮效率高、適合資料分析與雲端查詢，但不容易直接閱讀。" },
      { label: "CSV", value: "可由 Excel 與多數工具開啟，適合檢查、分享與簡單編輯。" },
      { label: "適用情境", value: "將 S3、Athena、BigQuery 或 Spark 的資料交給試算表使用者查看。" },
      { label: "限制", value: "CSV 不保留壓縮與完整型別資訊，檔案可能比原始 Parquet 大。" },
    ],
    stepsTitle: "使用方式",
    steps: [
      "選擇 Parquet 檔案",
      "開始轉換並等待瀏覽器讀取資料",
      "檢查欄位與前幾列預覽",
      "下載 CSV 檔案",
    ],
    faqTitle: "常見問題",
    faqs: [
      {
        question: "支援哪些 Parquet 壓縮格式？",
        answer: "支援 Snappy、Gzip、Zstd 等常見壓縮格式，多數標準 Parquet 檔案都能讀取。",
      },
      {
        question: "資料會上傳嗎？",
        answer: "不會。檔案只在您的瀏覽器內讀取與轉換。",
      },
      {
        question: "為什麼轉換後的 CSV 比較大？",
        answer: "CSV 是未壓縮的文字格式，不會保留 Parquet 的欄式壓縮，因此容量通常較大。",
      },
      {
        question: "Excel 開啟後出現亂碼怎麼辦？",
        answer: "CSV 使用 UTF-8。您可以再使用 CSV 亂碼修復工具輸出含 BOM 的 UTF-8 CSV。",
      },
    ],
    relatedToolsTitle: "相關工具",
    relatedTools: [
      { name: "修復 CSV 亂碼", href: "/zh-tw/tools/csv-encoding-fix" },
      { name: "DynamoDB JSON 轉換器", href: "/zh-tw/tools/dynamodb-json-converter" },
      { name: "CloudTrail 日誌轉 CSV", href: "/zh-tw/tools/cloudtrail-log-to-csv" },
    ],
  },
  ui: {
    emptyTitle: "拖放 Parquet 檔案，或點擊選擇",
    selectedFileTitle: "已選擇的檔案",
    fileNameLabel: "檔案名稱",
    fileTypeLabel: "格式",
    fileSizeLabel: "大小",
    rowCountLabel: "資料列",
    columnCountLabel: "欄位",
    convertButton: "轉成 CSV",
    convertingButton: "轉換中...",
    convertingStatus: "正在讀取 Parquet...",
    invalidFileError: "錯誤：請選擇 .parquet 檔案。",
    parseError: "錯誤：無法讀取 Parquet 檔案。",
    unexpectedErrorPrefix: "錯誤",
    successMessage: (fileName, rows) =>
      `完成：已建立 ${fileName}.csv（${rows.toLocaleString("zh-TW")} 列）。`,
    downloadButton: "下載 CSV",
    previewTitle: "資料預覽",
    previewNote: (count) => `顯示前 ${count} 列`,
  },
};
