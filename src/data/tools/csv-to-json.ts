import type { ToolLocale, ToolPageContent } from "./types";

type CsvToJsonUiText = {
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

export type CsvToJsonContent = {
  page: ToolPageContent;
  ui: CsvToJsonUiText;
};

export const csvToJsonContent: Record<ToolLocale, CsvToJsonContent> = {
  ja: {
    page: {
      title: "CSV を JSON に変換",
      description:
        "CSV ファイルをブラウザ上で JSON に変換できる無料オンラインツールです。アップロード不要・安全。スプレッドシートのデータを API や開発ツールで使いやすい JSON 配列に変換できます。",
      aboutTitle: "CSV を JSON に変換するとどんなときに便利？",
      aboutText:
        "Excel やスプレッドシートで管理しているデータを、Web アプリや API のテストデータとして使いたいときに便利です。CSV の各行がオブジェクトの配列として出力されるため、JavaScript・Python・Node.js などでそのまま読み込めます。",
      contentSections: [
        {
          title: "出力される JSON の形式",
          paragraphs: [
            "CSV の1行目をキー（カラム名）として使い、2行目以降を値としたオブジェクトの配列で出力されます。例えば name,age という列があれば [{\"name\": \"Alice\", \"age\": \"30\"}] のような形になります。",
            "すべての値は文字列として出力されます。数値や真偽値への変換が必要な場合は、出力後に処理してください。",
          ],
        },
        {
          title: "よくある使いどころ",
          paragraphs: [
            "スプレッドシートで管理したマスターデータを API のモックとして使いたいとき、CSV 形式のテストデータを JSON に変えてフロントエンド開発に使いたいとき、データ移行の前処理として CSV を JSON に変換したいときに活用できます。",
            "すべてブラウザ内処理のため、機密データが含まれる CSV も安全に変換できます。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "1行目はヘッダー行（キー名）として扱われます。",
            "すべての値は文字列として出力されます。",
            "空フィールドは空文字列（\"\"）として出力されます。",
            "文字コードは UTF-8 を推奨します。",
          ],
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "CSV ファイルをアップロードします",
        "データのプレビューと行数・列数を確認します",
        "「JSON に変換」ボタンを押します",
        "変換後の JSON ファイルをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "出力される JSON の形式は？",
          answer:
            "オブジェクトの配列（[{...}, {...}]）として出力されます。1行目のカラム名がキーになります。",
        },
        {
          question: "データは安全ですか？",
          answer:
            "はい。変換はすべてブラウザ内で行われ、ファイルは外部サーバーへアップロードされません。",
        },
        {
          question: "数値や真偽値はどうなりますか？",
          answer:
            "すべての値は文字列として出力されます。必要に応じて、出力後に型変換を行ってください。",
        },
        {
          question: "文字コードは何に対応していますか？",
          answer:
            "UTF-8 の CSV に対応しています。Shift-JIS の場合は事前に UTF-8 に変換してから使用してください。",
        },
        {
          question: "ファイルサイズの上限はありますか？",
          answer:
            "ブラウザのメモリ制限に依存しますが、数十 MB 程度の CSV まで多くの環境で動作します。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "JSON を CSV に変換", href: "/tools/json-to-csv" },
        { name: "CSV を Parquet に変換", href: "/tools/csv-to-parquet" },
        { name: "Parquet を CSV に変換", href: "/tools/parquet-to-csv" },
      ],
    },
    ui: {
      emptyTitle: "CSV ファイルをドラッグ＆ドロップ、または選択",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      convertButton: "JSON に変換",
      convertingButton: "変換中...",
      convertingStatus: "変換中です...",
      invalidFileError: "エラー: .csv ファイルを選択してください。",
      parseError: "エラー: CSV ファイルの読み込みに失敗しました。",
      emptyFileError: "エラー: CSV にデータ行が見つかりません。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName, rows) =>
        `完了: ${fileName}.json (${rows.toLocaleString("ja")} 行) をダウンロードしました。`,
      downloadButton: "JSON をダウンロード",
      previewTitle: "データプレビュー",
      previewNote: (n) => `最初の ${n} 行を表示しています`,
    },
  },
  en: {
    page: {
      title: "CSV to JSON Converter",
      description:
        "Convert CSV files to JSON online for free. No upload required — runs entirely in your browser. Turn spreadsheet data into a JSON array ready for APIs, web apps, and developer workflows.",
      aboutTitle: "Why convert CSV to JSON?",
      aboutText:
        "When you have data in a spreadsheet or CSV export and need to use it in a web application, API test, or developer tool, JSON is usually the expected format. This tool converts each CSV row into an object in a JSON array, using the first row as keys. The output works directly in JavaScript, Python, Node.js, and most modern development environments.",
      contentSections: [
        {
          title: "Output JSON format",
          paragraphs: [
            "The output is an array of objects ([{...}, {...}]). The first CSV row becomes the keys, and each subsequent row becomes one object. For example, a CSV with columns name and age would produce [{\"name\": \"Alice\", \"age\": \"30\"}].",
            "All values are output as strings. If you need numeric or boolean types, apply a post-processing step after downloading.",
          ],
        },
        {
          title: "Common use cases",
          paragraphs: [
            "Use it when turning spreadsheet master data into API mock data, when converting CSV test fixtures into JSON for frontend development, or when preprocessing a CSV export before loading it into a JSON-based system.",
            "All processing runs in your browser, so CSV files with sensitive or proprietary data are safe to convert.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know before converting",
          items: [
            "The first row is treated as the header row (used as JSON keys).",
            "All values are output as strings.",
            "Empty fields are output as empty strings (\"\").",
            "UTF-8 encoded CSV files are recommended.",
          ],
        },
      ],
      stepsTitle: "How to use",
      steps: [
        "Upload your CSV file",
        "Check the data preview and row/column counts",
        "Click \"Convert to JSON\"",
        "Download the resulting JSON file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What does the output JSON look like?",
          answer:
            "The output is an array of objects ([{...}, {...}]). The first CSV row becomes the keys for each object.",
        },
        {
          question: "Is my data safe?",
          answer:
            "Yes. All processing runs locally in your browser. Your files are never uploaded to a server.",
        },
        {
          question: "What happens to numeric or boolean values?",
          answer:
            "All values are output as strings. Apply type conversion in your code after downloading if you need numbers or booleans.",
        },
        {
          question: "What CSV encoding is supported?",
          answer:
            "UTF-8 encoded CSV files are supported. If your CSV uses a different encoding, convert it to UTF-8 first.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "The limit depends on your browser's available memory. Most CSV files up to a few dozen megabytes should convert without issues.",
        },
      ],
      relatedToolsTitle: "Related tools",
      relatedTools: [
        { name: "JSON to CSV", href: "/en/tools/json-to-csv" },
        { name: "CSV to Parquet", href: "/en/tools/csv-to-parquet" },
        { name: "Parquet to CSV", href: "/en/tools/parquet-to-csv" },
      ],
    },
    ui: {
      emptyTitle: "Drop a CSV file here, or click to select",
      selectedFileTitle: "Selected file",
      fileNameLabel: "File name",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      convertButton: "Convert to JSON",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a .csv file.",
      parseError: "Error: Failed to read the CSV file.",
      emptyFileError: "Error: No data rows found in the CSV.",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName, rows) =>
        `Done: Downloaded ${fileName}.json (${rows.toLocaleString("en")} rows).`,
      downloadButton: "Download JSON",
      previewTitle: "Data preview",
      previewNote: (n) => `Showing first ${n} rows`,
    },
  },
};
