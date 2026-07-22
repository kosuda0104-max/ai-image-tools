import type { GuideEntry } from "@/src/data/guides";

export const awsExportFormatsZhTwGuide: GuideEntry = {
  slug: "aws-export-file-formats",
  title: "AWS 匯出檔案格式指南：DynamoDB、CloudTrail 與 S3 Inventory",
  description:
    "比較 DynamoDB JSON、Textract JSON、CloudTrail、S3 Inventory、CloudWatch Logs 與 Transcribe 的匯出結構，以及轉成 CSV、Excel、JSONL 或字幕時的注意事項。",
  cardDescription:
    "了解 AWS 各服務的 JSON、JSON.GZ、CSV.GZ 與 Parquet 結構，選擇正確的轉換方式。",
  updatedAt: "2026-07-22",
  sources: [
    {
      label: "AWS：DynamoDB 資料表匯出格式",
      href: "https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/S3DataExport.Output.html",
    },
    {
      label: "AWS：將 Textract 表格匯出成 CSV",
      href: "https://docs.aws.amazon.com/textract/latest/dg/examples-export-table-csv.html",
    },
    {
      label: "AWS：CloudTrail 日誌檔案範例",
      href: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-examples.html",
    },
    {
      label: "AWS：S3 Inventory manifest 與資料檔案",
      href: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-inventory-location.html",
    },
    {
      label: "AWS：將 CloudWatch Logs 匯出到 S3",
      href: "https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/S3Export.html",
    },
    {
      label: "AWS：Amazon Transcribe 字幕",
      href: "https://docs.aws.amazon.com/transcribe/latest/dg/subtitles.html",
    },
  ],
  sections: [
    {
      title: "副檔名同樣是 JSON，結構卻完全不同",
      paragraphs: [
        "AWS 各服務匯出的資料語意不同。DynamoDB 使用含 S、N、M 等型別的 AttributeValue；Textract 是以 Id 關聯的 Block；CloudTrail 則把事件放在 Records 陣列。只使用一般 JSON 轉 CSV，通常無法得到實用的表格。",
        "第一步應先確認服務名稱與匯出來源，再選擇能理解該結構的工具。輸出格式則依用途選擇：人工檢查可用 CSV 或 Excel，資料管線可用 JSONL，字幕可用 SRT 或 VTT。",
      ],
    },
    {
      title: "DynamoDB JSON 要先解除 AttributeValue 型別",
      paragraphs: [
        "DynamoDB 完整匯出通常是 JSON Lines，每行 Item 內含 S、N、BOOL、SS、M、L 等型別資訊。只解開 .json.gz 並不能直接得到一般表格，必須先解除型別包裝，再將巢狀 Map 展開成欄位。",
        "N 可能包含超過 JavaScript 安全整數範圍的 ID 或金額，因此轉換時以文字保留可避免精度損失。增量匯出的 Keys、NewImage 與 OldImage 也應分開保存，方便比較變更前後。",
      ],
    },
    {
      title: "Textract 必須沿著 Relationship 重建表格",
      paragraphs: [
        "Textract 的 TABLE 不直接保存所有儲存格文字。程式必須從 TABLE 連到 CELL，再連到 WORD 或 SELECTION_ELEMENT，並依 RowIndex、ColumnIndex 重建行列。",
        "多個表格適合放在 Excel 的不同工作表，KEY_VALUE_SET 可整理成表單清單，LINE 則保存本文。結構轉換不會修正 OCR 誤讀，低 Confidence 的內容仍需和原始影像比對。",
      ],
    },
    {
      title: "CloudTrail 與 CloudWatch Logs 不可混用",
      paragraphs: [
        "CloudTrail 記錄誰在何時呼叫哪個 AWS API。Trail 傳送到 S3 的物件通常是含 Records 的 gzip JSON，合併成 CSV 後可依 eventSource、eventName、userIdentity 與 errorCode 篩選。",
        "CloudWatch Logs 保存應用程式與服務的日誌文字。S3 匯出會切成多個 .gz，而且順序不保證，因此需要解析 timestamp 後重新排序。若 message 本身是 JSON，還可以展開 level、requestId 等欄位。",
      ],
    },
    {
      title: "S3 Inventory 要一起讀取 manifest 與資料檔",
      paragraphs: [
        "manifest.json 只包含資料檔案清單與 fileSchema；Bucket、Key、Size、StorageClass 等實際資料位於 CSV.GZ、ORC 或 Parquet。只有 manifest 無法顯示物件列表。",
        "CSV.GZ 沒有標題列，必須依 manifest 的 fileSchema 順序套用欄位名稱。合併分割檔案時保留 sourceFile 欄位，有助於追查缺漏或重複資料。",
      ],
    },
    {
      title: "Transcribe JSON 可以重新建立 SRT 與 VTT",
      paragraphs: [
        "新的 Transcribe 工作可直接要求字幕輸出，但舊工作或只有 JSON 的結果，仍可利用 results.items 中的 start_time 與 end_time 重建字幕。",
        "依標點、字數、時間長度與說話者切換分組，可產生較容易閱讀的字幕。影片剪輯常用 SRT，網頁播放器使用 VTT，純文字檢查則可輸出 TXT。",
      ],
    },
    {
      title: "先用小型樣本驗證，再處理正式資料",
      paragraphs: [
        "稽核日誌、OCR 文件與客戶資料可能包含敏感資訊。瀏覽器內轉換不會把檔案送到外部伺服器，但仍會使用裝置記憶體，因此非常大的匯出檔應分批處理。",
        "正式轉換前先用一個檔案確認欄位、數字、文字編碼、時區與筆數。下載後也應與原始資料核對，再交給其他人或系統。",
      ],
    },
  ],
};
