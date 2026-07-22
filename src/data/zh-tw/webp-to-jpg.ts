import type { SimpleImageConversionContent } from "@/src/components/SimpleImageConversionTool";

export const webpToJpgZhTwContent: SimpleImageConversionContent = {
  page: {
    slug: "webp-to-jpg",
    title: "WebP 轉 JPG",
    description:
      "免費在瀏覽器內將 WebP 圖片轉成 JPG，可一次處理多張圖片，不需上傳檔案。",
    aboutTitle: "為什麼要將 WebP 轉成 JPG？",
    aboutText:
      "WebP 適合現代網站使用，但部分舊版軟體、企業系統與上傳表單只接受 JPG。轉換後可提高相容性，方便分享、提交與插入文件。",
    contentSections: [
      {
        title: "適合轉成 JPG 的情況",
        paragraphs: [
          "當網站表單拒絕 WebP、圖片編輯軟體無法開啟，或客戶明確要求 JPG 時，可以建立相容版本。",
          "如果目的地已支援 WebP，通常不必轉換，因為 WebP 往往容量較小，且可保留透明背景。",
        ],
      },
      {
        title: "透明背景會如何處理？",
        paragraphs: [
          "JPG 不支援透明度，因此透明區域會以白色背景輸出。若需要保留透明背景，請繼續使用 WebP 或改用 PNG。",
          "轉換在您的裝置上完成，圖片不會傳送到外部伺服器。",
        ],
      },
    ],
    listSections: [
      {
        title: "轉換前請注意",
        items: [
          "透明區域會變成白色。",
          "JPG 使用有損壓縮，細小文字與銳利邊緣可能略有變化。",
          "JPG 檔案不一定比 WebP 小。",
          "可以一次處理多張 WebP 並下載 ZIP。",
        ],
      },
    ],
    comparisonTitle: "WebP 與 JPG",
    comparisonItems: [
      { label: "相容性", value: "JPG 在舊版軟體、表單與一般文件流程中支援更廣。" },
      { label: "透明度", value: "WebP 可保留透明背景；JPG 不支援透明度。" },
      { label: "容量", value: "WebP 通常更省空間；JPG 的主要優勢是相容性。" },
      { label: "用途", value: "網站傳輸使用 WebP，通用分享與提交可使用 JPG。" },
    ],
    stepsTitle: "使用方式",
    steps: ["選擇一張或多張 WebP 圖片", "按下 WebP 轉 JPG", "檢查轉換結果", "下載 JPG 或 ZIP"],
    faqTitle: "常見問題",
    faqs: [
      { question: "透明背景會保留嗎？", answer: "不會。JPG 不支援透明度，透明區域會變成白色。" },
      { question: "圖片會上傳嗎？", answer: "不會。轉換只在您的瀏覽器內完成。" },
      { question: "畫質會改變嗎？", answer: "可能會有些微變化，因為 JPG 使用有損壓縮。" },
      { question: "可以批次轉換嗎？", answer: "可以。您可一次選擇多張圖片，並下載個別 JPG 或 ZIP。" },
    ],
    relatedToolsTitle: "相關工具",
    relatedTools: [
      { name: "HEIC 轉 JPG", href: "/zh-tw/tools/heic-to-jpg" },
    ],
  },
  ui: {
    emptyTitle: "拖放 WebP 圖片，或點擊選擇",
    emptyDescription: "可一次選擇多張圖片",
    selectButtonLabel: "選擇檔案",
    button: "WebP 轉 JPG",
    loading: "轉換中...",
    done: "完成",
    invalidFile: "錯誤：請選擇 WebP 圖片。",
    error: "錯誤：轉換失敗。",
    resetButton: "重設",
  },
};
