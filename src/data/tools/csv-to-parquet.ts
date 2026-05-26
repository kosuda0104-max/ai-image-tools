import type { ToolLocale, ToolPageContent } from "./types";

type CsvToParquetUiText = {
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

export type CsvToParquetContent = {
  page: ToolPageContent;
  ui: CsvToParquetUiText;
};

export const csvToParquetContent: Record<ToolLocale, CsvToParquetContent> = {
  ja: {
    page: {
      title: "CSV を Parquet に変換",
      description:
        "CSV ファイルをブラウザ上で Parquet に変換できる無料オンラインツールです。アップロード不要・安全。AWS S3・BigQuery・Spark などのデータ基盤へのアップロード前に使えます。",
      aboutTitle: "CSV を Parquet に変換するとどんなときに便利？",
      aboutText:
        "Parquet は AWS S3 や BigQuery、Apache Spark などで標準的に使われる列指向フォーマットです。CSV と比べてファイルサイズが小さく、読み取り速度も速いため、データ基盤への取り込みや分析クエリに向いています。手元の CSV を Parquet に変換してからアップロードすることで、ストレージコストやクエリコストを抑えられます。",
      contentSections: [
        {
          title: "CSV を Parquet にするメリット",
          paragraphs: [
            "Parquet はカラム単位で圧縮するため、同じデータでも CSV より大幅に小さくなります。AWS Athena や BigQuery では読み取るデータ量で課金されるため、Parquet に変換するだけでクエリコストが下がるケースがよくあります。",
            "また、Parquet はカラムのデータ型を保持するため、クエリエンジンが型推論を省けます。CSV を毎回スキャンして型を確認する必要がなくなり、クエリが高速になります。",
          ],
        },
        {
          title: "どんな場面で使うか",
          paragraphs: [
            "ローカルで作成した CSV を AWS S3 にアップロードして Athena でクエリしたいとき、BigQuery や Redshift に効率よくデータを取り込みたいとき、Spark ジョブへの入力ファイルを用意したいときに活用できます。",
            "このツールはブラウザ内で処理するため、機密データを含む CSV も安全に変換できます。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "すべてのカラムは文字列型（STRING）として変換されます。型変換が必要な場合は変換後にスキーマを調整してください。",
            "1行目はヘッダー行として扱われます。",
            "圧縮コーデックは Snappy を使用します（AWS・GCP で広くサポートされています）。",
            "空フィールドは NULL として扱われます。",
          ],
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "CSV ファイルをアップロードします",
        "データのプレビューと行数・列数を確認します",
        "「Parquet に変換」ボタンを押します",
        "変換後の Parquet ファイルをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "生成される Parquet ファイルはどのツールで読めますか？",
          answer:
            "AWS Athena、BigQuery、Apache Spark、DuckDB、pandas（pyarrow）など主要なデータ処理ツールで読み込めます。Snappy 圧縮を使用しています。",
        },
        {
          question: "データは安全ですか？",
          answer:
            "はい。変換はすべてブラウザ内で行われ、ファイルは外部サーバーへアップロードされません。",
        },
        {
          question: "数値や日付の型はどうなりますか？",
          answer:
            "現在は全カラムを STRING 型として変換します。BigQuery や Athena でテーブルを作成する際にスキーマを指定することで、後から型変換できます。",
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
        { name: "Parquet を CSV に変換", href: "/tools/parquet-to-csv" },
        { name: "PDF を JPG に変換", href: "/tools/pdf-to-jpg" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "CSV ファイルをドラッグ＆ドロップ、または選択",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      convertButton: "Parquet に変換",
      convertingButton: "変換中...",
      convertingStatus: "変換中です...",
      invalidFileError: "エラー: .csv ファイルを選択してください。",
      parseError: "エラー: CSV ファイルの読み込みに失敗しました。",
      emptyFileError: "エラー: CSV にデータ行が見つかりません。",
      unexpectedErrorPrefix: "エラー",
      successMessage: (fileName, rows) =>
        `完了: ${fileName}.parquet (${rows.toLocaleString("ja")} 行) をダウンロードしました。`,
      downloadButton: "Parquet をダウンロード",
      previewTitle: "データプレビュー",
      previewNote: (n) => `最初の ${n} 行を表示しています`,
    },
  },
  en: {
    page: {
      title: "CSV to Parquet Converter",
      description:
        "Convert CSV files to Parquet online for free. No upload required — runs entirely in your browser. Ideal for AWS S3, BigQuery, Spark, and other data platform workflows.",
      aboutTitle: "Why convert CSV to Parquet?",
      aboutText:
        "Parquet is a columnar storage format used widely across AWS S3, BigQuery, and Apache Spark. Compared to CSV, Parquet files are significantly smaller and faster to query, which reduces storage costs and query fees on pay-per-scan platforms like AWS Athena and BigQuery. Converting your CSVs to Parquet before uploading is a simple way to cut costs and improve pipeline performance.",
      contentSections: [
        {
          title: "Benefits of converting CSV to Parquet",
          paragraphs: [
            "Parquet uses columnar compression, which can reduce file size by 5–10x compared to CSV for typical datasets. On AWS Athena and BigQuery, you are billed based on the amount of data scanned, so smaller Parquet files translate directly into lower query costs.",
            "Parquet also stores column data types, which means query engines can skip type inference. This speeds up queries and reduces the chance of type mismatch errors when loading data.",
          ],
        },
        {
          title: "When to use this tool",
          paragraphs: [
            "Use it when uploading local CSVs to AWS S3 for Athena queries, when loading data into BigQuery or Redshift more efficiently, or when preparing input files for Spark or Flink jobs.",
            "Since all processing runs in your browser, this tool is safe to use with sensitive or proprietary data.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know before converting",
          items: [
            "All columns are written as STRING type. You can define a schema after loading into your data platform.",
            "The first row is treated as the header row.",
            "Snappy compression is used, which is broadly supported across AWS, GCP, and Spark.",
            "Empty fields are treated as NULL.",
          ],
        },
      ],
      stepsTitle: "How to use",
      steps: [
        "Upload your CSV file",
        "Check the data preview and row/column counts",
        "Click \"Convert to Parquet\"",
        "Download the resulting Parquet file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What tools can read the output Parquet file?",
          answer:
            "AWS Athena, BigQuery, Apache Spark, DuckDB, and pandas (with pyarrow) can all read the output. Snappy compression is used.",
        },
        {
          question: "Is my data safe?",
          answer:
            "Yes. All processing runs locally in your browser. Your files are never uploaded to a server.",
        },
        {
          question: "What happens to numeric or date columns?",
          answer:
            "All columns are written as STRING type. You can cast them when defining the table schema in Athena, BigQuery, or your data platform of choice.",
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
        { name: "Parquet to CSV", href: "/en/tools/parquet-to-csv" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drop a CSV file here, or click to select",
      selectedFileTitle: "Selected file",
      fileNameLabel: "File name",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      convertButton: "Convert to Parquet",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a .csv file.",
      parseError: "Error: Failed to read the CSV file.",
      emptyFileError: "Error: No data rows found in the CSV.",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName, rows) =>
        `Done: Downloaded ${fileName}.parquet (${rows.toLocaleString("en")} rows).`,
      downloadButton: "Download Parquet",
      previewTitle: "Data preview",
      previewNote: (n) => `Showing first ${n} rows`,
    },
  },
};
