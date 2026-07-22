import type { StandardImageConversionContent } from "@/src/lib/conversion-content";

export const heicToJpgZhTwContent: StandardImageConversionContent = {
  page: {
    slug: "heic-to-jpg",
    title: "HEIC 轉 JPG",
    description:
      "免費在瀏覽器內將 iPhone HEIC 照片轉成 JPG。可一次處理多張圖片，不需上傳到外部伺服器。",
    aboutTitle: "為什麼要將 HEIC 轉成 JPG？",
    aboutText:
      "HEIC 能有效節省 iPhone 照片容量，但部分 Windows 軟體、網站表單與企業系統仍不支援。JPG 相容性更高，適合分享、上傳與插入文件。",
    contentSections: [
      {
        title: "適合轉換的情況",
        paragraphs: [
          "當 Windows 無法開啟 iPhone 照片、上傳表單拒絕 HEIC，或收件人要求 JPG 時，可以先完成轉換。",
          "轉換只會建立靜態 JPG。原始 HEIC 仍應保留，以保存較高效率的原檔與可能包含的額外資訊。",
        ],
      },
      {
        title: "隱私與批次處理",
        paragraphs: [
          "圖片由瀏覽器在您的裝置上處理，不會傳送到 Filewisp 或其他外部伺服器。",
          "可以一次選擇多張 HEIC，完成後逐張下載；多張結果也可打包成 ZIP。",
        ],
      },
    ],
    listSections: [
      {
        title: "轉換前請注意",
        items: [
          "JPG 不支援透明背景或動態內容。",
          "輸出容量可能比原始 HEIC 大。",
          "需要保留原始品質與照片資訊時，請保存原始 HEIC。",
          "大量高解析度照片會使用較多裝置記憶體。",
        ],
      },
    ],
    comparisonTitle: "HEIC 與 JPG",
    comparisonItems: [
      { label: "相容性", value: "JPG 幾乎可由所有圖片軟體、瀏覽器與上傳表單開啟。" },
      { label: "容量", value: "HEIC 通常以較小容量保存相近畫質；JPG 更重視通用相容性。" },
      { label: "分享", value: "寄送郵件、插入文件或提交表單時，JPG 通常較穩定。" },
      { label: "建議", value: "保留 HEIC 原檔，另外建立 JPG 作為分享與提交版本。" },
    ],
    stepsTitle: "使用方式",
    steps: ["選擇一張或多張 HEIC 圖片", "按下 HEIC 轉 JPG", "等待瀏覽器完成轉換", "下載 JPG 或 ZIP"],
    faqTitle: "常見問題",
    faqs: [
      { question: "可以轉換 iPhone 拍攝的照片嗎？", answer: "可以。支援一般的 .heic 與 .heif 圖片。" },
      { question: "圖片會上傳嗎？", answer: "不會。解碼與轉換都在您的瀏覽器內完成。" },
      { question: "可以一次轉換多張嗎？", answer: "可以。您可多選檔案，並將多張結果打包成 ZIP。" },
      { question: "Live Photo 會保留嗎？", answer: "不會。此工具只輸出其中的靜態圖片。" },
    ],
    relatedToolsTitle: "相關工具",
    relatedTools: [
      { name: "WebP 轉 JPG", href: "/zh-tw/tools/webp-to-jpg" },
    ],
  },
  ui: {
    emptyTitle: "拖放 HEIC 圖片，或點擊選擇",
    unknownType: "未知",
    convertingStatus: "轉換中...",
    canvasInitError: "錯誤：無法初始化圖片處理。",
    convertError: "錯誤：HEIC 轉 JPG 失敗。",
    loadError: "錯誤：無法讀取圖片。",
    unexpectedErrorPrefix: "錯誤",
    successMessage: (baseName) => `完成：已建立 ${baseName}.jpg。`,
    invalidFileError: "錯誤：請選擇 HEIC 或 HEIF 圖片。",
    selectedImageTitle: "已選擇的圖片",
    fileNameLabel: "檔案名稱",
    fileTypeLabel: "格式",
    fileSizeLabel: "大小",
    previewLabel: "預覽",
    convertButton: "HEIC 轉 JPG",
    convertingButton: "轉換中...",
    resetButton: "重設",
  },
};
