import type { ToolLocale, ToolPageContent } from "./types";

type JsonToCsvUiText = {
  emptyTitle: string;
  selectedFileTitle: string;
  fileNameLabel: string;
  fileSizeLabel: string;
  rowCountLabel: string;
  columnCountLabel: string;
  convertButton: string;
  convertingButton: string;
  convertingStatus: string;
  invalidFileError: string;
  parseError: string;
  emptyFileError: string;
  unexpectedErrorPrefix: string;
  successMessage: (fileName: string, rows: number) => string;
  downloadButton: string;
  previewTitle: string;
  previewNote: (n: number) => string;
};

export type JsonToCsvContent = {
  page: ToolPageContent;
  ui: JsonToCsvUiText;
};

export const jsonToCsvContent: Record<ToolLocale, JsonToCsvContent> = {
  ja: {
    page: {
      title: "JSON を CSV に変換",
      description:
        "JSON ファイルをブラウザ上で CSV に変換できる無料オンラインツールです。アップロード不要・安全。配列形式の JSON を Excel や Google スプレッドシートで扱いやすい CSV に変換できます。",
      aboutTitle: "JSON を CSV に変換するとどんなときに便利？",
      aboutText:
        "API のレスポンスや DB エクスポートなど、JSON 形式で出力されたデータを Excel や Google スプレッドシートで確認・編集したいときに使えます。ネストされたオブジェクトはドット記法でフラット化（例: address.city）されるため、複雑な構造でも CSV として扱いやすくなります。",
      contentSections: [
        {
          title: "どんな JSON に対応しているか",
          paragraphs: [
            "オブジェクトの配列（[{...}, {...}]）が基本形です。配列の各要素がCSVの1行になります。ネストされたオブジェクトは address.city のようにドット記法でフラット化します。",
            "配列値はそのまま JSON 文字列として1セルに収めます。ルートがオブジェクト単体の場合は1行の CSV として変換します。",
          ],
        },
        {
          title: "よくある使いどころ",
          paragraphs: [
            "API から取得したデータをスプレッドシートで確認したいとき、DB からエクスポートした JSON を CSV に変えてデータ分析に使いたいとき、開発中のモックデータを表形式で確認したいときに活用できます。",
            "すべてブラウザ内処理のため、機密データが含まれる JSON も安全に変換できます。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "ルートがオブジェクトの配列（[{...}]）の形式を推奨します。",
            "ネストされたオブジェクトはドット記法でフラット化されます（例: user.name）。",
            "配列値はそのまま JSON 文字列としてセルに入ります。",
            "文字コードは UTF-8 で出力されます。",
          ],
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "JSON ファイルをアップロードします",
        "データのプレビューと行数・列数を確認します",
        "「CSV に変換」ボタンを押します",
        "変換後の CSV ファイルをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな JSON 形式に対応していますか？",
          answer:
            "オブジェクトの配列（[{...}, {...}]）が基本です。ルートがオブジェクト単体の場合は1行として変換します。深いネストはドット記法でフラット化されます。",
        },
        {
          question: "データは安全ですか？",
          answer:
            "はい。変換はすべてブラウザ内で行われ、ファイルは外部サーバーへアップロードされません。",
        },
        {
          question: "Excel で開くと文字化けする場合は？",
          answer:
            "CSV は UTF-8 BOM 付きで出力しているため、Windows の Excel でも正しく開けます。",
        },
        {
          question: "ファイルサイズの上限はありますか？",
          answer:
            "ブラウザのメモリ制限に依存しますが、数十 MB 程度の JSON まで多くの環境で動作します。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "CSV を JSON に変換", href: "/tools/csv-to-json" },
        { name: "CSV を Parquet に変換", href: "/tools/csv-to-parquet" },
        { name: "Parquet を CSV に変換", href: "/tools/parquet-to-csv" },
      ],
    },
    ui: {
      emptyTitle: "JSON ファイルをドラッグ＆ドロップ、または選択",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      convertButton: "CSV に変換",
      convertingButton: "変換中...",
      convertingStatus: "変換中です...",
      invalidFileError: "エラー: .json ファイルを選択してください。",
      parseError: "エラー: JSON ファイルの読み込みに失敗しました。",
      emptyFileError: "エラー: 変換できるデータが見つかりません。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName, rows) =>
        `完了: ${fileName}.csv (${rows.toLocaleString("ja")} 行) をダウンロードしました。`,
      downloadButton: "CSV をダウンロード",
      previewTitle: "データプレビュー",
      previewNote: (n) => `最初の ${n} 行を表示しています`,
    },
  },
  en: {
    page: {
      title: "JSON to CSV Converter",
      description:
        "Convert JSON files to CSV online for free. No upload required — runs entirely in your browser. Turn API responses or database exports into spreadsheet-ready CSV files instantly.",
      aboutTitle: "Why convert JSON to CSV?",
      aboutText:
        "API responses, database exports, and log files are often delivered as JSON. Converting them to CSV makes the data easy to open in Excel, Google Sheets, or any data analysis tool. Nested objects are flattened using dot notation (e.g. address.city), so even complex JSON structures become readable as a flat table.",
      contentSections: [
        {
          title: "What JSON structures are supported",
          paragraphs: [
            "The main supported format is an array of objects ([{...}, {...}]). Each object becomes one row in the CSV, and all keys across the array become the column headers. Nested objects are flattened using dot notation.",
            "Array values inside objects are serialized as JSON strings in a single cell. If the root is a single object instead of an array, it is treated as a one-row CSV.",
          ],
        },
        {
          title: "Common use cases",
          paragraphs: [
            "Use it when you want to inspect API data in a spreadsheet, when converting a database export from JSON to CSV for analysis, or when you need to share structured data with non-technical teammates.",
            "All processing runs in your browser, so JSON files with sensitive or proprietary data are safe to convert.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know before converting",
          items: [
            "An array of objects ([{...}]) at the root level is the recommended format.",
            "Nested objects are flattened with dot notation (e.g. user.name).",
            "Array values inside objects are serialized as JSON strings.",
            "Output is UTF-8 encoded with BOM for Excel compatibility.",
          ],
        },
      ],
      stepsTitle: "How to use",
      steps: [
        "Upload your JSON file",
        "Check the data preview and row/column counts",
        "Click \"Convert to CSV\"",
        "Download the resulting CSV file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What JSON formats are supported?",
          answer:
            "An array of objects ([{...}, {...}]) is the primary format. A single root object is treated as a one-row CSV. Deeply nested objects are flattened with dot notation.",
        },
        {
          question: "Is my data safe?",
          answer:
            "Yes. All processing runs locally in your browser. Your files are never uploaded to a server.",
        },
        {
          question: "Will the CSV open correctly in Excel?",
          answer:
            "Yes. The output CSV includes a UTF-8 BOM so Excel on Windows opens it correctly without encoding issues.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "The limit depends on your browser's available memory. Most JSON files up to a few dozen megabytes should convert without issues.",
        },
      ],
      relatedToolsTitle: "Related tools",
      relatedTools: [
        { name: "CSV to JSON", href: "/en/tools/csv-to-json" },
        { name: "CSV to Parquet", href: "/en/tools/csv-to-parquet" },
        { name: "Parquet to CSV", href: "/en/tools/parquet-to-csv" },
      ],
    },
    ui: {
      emptyTitle: "Drop a JSON file here, or click to select",
      selectedFileTitle: "Selected file",
      fileNameLabel: "File name",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      convertButton: "Convert to CSV",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a .json file.",
      parseError: "Error: Failed to read the JSON file.",
      emptyFileError: "Error: No convertible data found in the JSON.",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName, rows) =>
        `Done: Downloaded ${fileName}.csv (${rows.toLocaleString("en")} rows).`,
      downloadButton: "Download CSV",
      previewTitle: "Data preview",
      previewNote: (n) => `Showing first ${n} rows`,
    },
  },
};
