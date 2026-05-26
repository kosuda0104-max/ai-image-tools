import type { ToolLocale, ToolPageContent } from "./types";

type ParquetToCsvUiText = {
  emptyTitle: string;
  selectedFileTitle: string;
  fileNameLabel: string;
  fileTypeLabel: string;
  fileSizeLabel: string;
  rowCountLabel: string;
  columnCountLabel: string;
  convertButton: string;
  convertingButton: string;
  convertingStatus: string;
  invalidFileError: string;
  parseError: string;
  unexpectedErrorPrefix: string;
  successMessage: (fileName: string, rows: number) => string;
  downloadButton: string;
  previewTitle: string;
  previewNote: (n: number) => string;
};

export type ParquetToCsvContent = {
  page: ToolPageContent;
  ui: ParquetToCsvUiText;
};

export const parquetToCsvContent: Record<ToolLocale, ParquetToCsvContent> = {
  ja: {
    page: {
      title: "Parquet を CSV に変換",
      description:
        "Parquet ファイルをブラウザ上で CSV に変換できる無料オンラインツールです。アップロード不要・高速・安全。AWS や BigQuery などのデータ作業に使えます。",
      aboutTitle: "Parquet を CSV に変換するとどんなときに便利？",
      aboutText:
        "Parquet は AWS S3 や BigQuery などのデータ基盤でよく使われる列指向フォーマットです。分析には便利ですが、Excel や他のツールで中身を確認したいときに手間がかかります。このツールを使えば、ブラウザ上で Parquet ファイルを直接 CSV に変換でき、外部サーバーへのアップロードは不要です。",
      contentSections: [
        {
          title: "Parquet ファイルを CSV で確認したくなる場面",
          paragraphs: [
            "AWS Athena や S3 上のデータを手元で確認したいとき、BigQuery や Spark が出力した Parquet の中身を Excel で開きたいとき、データパイプラインのデバッグで特定カラムを素早く確認したいときに役立ちます。",
            "このツールはブラウザ内で処理するため、機密データを含むファイルも安全に変換できます。",
          ],
        },
        {
          title: "Parquet と CSV の違い",
          paragraphs: [
            "Parquet は列指向の圧縮フォーマットで、大量データの読み書きや集計に最適化されています。一方 CSV はテキストベースで、可読性が高く Excel や多くのツールで直接扱えます。",
            "データ量が多い場合、Parquet から CSV に変換するとファイルサイズが大きくなることがあります。大規模ファイルの変換には時間がかかる場合があります。",
          ],
        },
      ],
      listSections: [
        {
          title: "変換前に知っておきたいこと",
          items: [
            "Parquet のネスト構造や Map 型のカラムは CSV では表現が難しい場合があります。",
            "NULL 値は空欄として出力されます。",
            "日付・タイムスタンプ型は文字列として変換されます。",
            "ファイルサイズが大きい場合、変換に時間がかかることがあります。",
          ],
        },
      ],
      stepsTitle: "使い方",
      steps: [
        "Parquet ファイルをアップロードします",
        "ファイル情報とデータのプレビューを確認します",
        "「CSV に変換」ボタンを押します",
        "変換後の CSV ファイルをダウンロードします",
      ],
      faqTitle: "よくある質問",
      faqs: [
        {
          question: "どんな Parquet ファイルに対応していますか？",
          answer:
            "Snappy・Gzip・Zstd など主要な圧縮コーデックに対応しています。ネスト構造を含む複雑なスキーマも多くの場合変換できます。",
        },
        {
          question: "データは安全ですか？",
          answer:
            "はい。変換はすべてブラウザ内で行われ、ファイルは外部サーバーへアップロードされません。",
        },
        {
          question: "ファイルサイズの上限はありますか？",
          answer:
            "ブラウザのメモリ制限に依存しますが、数百 MB 程度のファイルまでは多くの環境で動作します。",
        },
        {
          question: "スマホでも使えますか？",
          answer:
            "はい。対応ブラウザがあればスマホやタブレットでも使えます。",
        },
        {
          question: "CSV の文字コードは何ですか？",
          answer:
            "UTF-8 で出力されます。Excel で開く場合は「UTF-8（BOM 付き）」として開くと文字化けしにくいです。",
        },
      ],
      relatedToolsTitle: "関連ツール",
      relatedTools: [
        { name: "CSV を Parquet に変換", href: "/tools/csv-to-parquet" },
        { name: "PDF を JPG に変換", href: "/tools/pdf-to-jpg" },
        { name: "画像圧縮", href: "/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Parquet ファイルをドラッグ＆ドロップ、または選択",
      selectedFileTitle: "選択中のファイル",
      fileNameLabel: "ファイル名",
      fileTypeLabel: "形式",
      fileSizeLabel: "サイズ",
      rowCountLabel: "行数",
      columnCountLabel: "列数",
      convertButton: "CSV に変換",
      convertingButton: "変換中...",
      convertingStatus: "変換中です...",
      invalidFileError: "エラー: .parquet ファイルを選択してください。",
      parseError: "エラー: Parquet ファイルの読み込みに失敗しました。",
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
      title: "Parquet to CSV Converter",
      description:
        "Convert Parquet files to CSV online for free. No upload required — runs entirely in your browser. Great for AWS, BigQuery, and Spark data workflows.",
      aboutTitle: "Why convert Parquet to CSV?",
      aboutText:
        "Parquet is a columnar storage format widely used in data platforms like AWS S3, BigQuery, and Apache Spark. While great for analytics, it can be hard to inspect or share with colleagues who use Excel or other tools. This converter lets you turn Parquet files into CSV directly in your browser — no server upload required.",
      contentSections: [
        {
          title: "When Parquet to CSV is useful",
          paragraphs: [
            "It is useful when you want to inspect data from AWS Athena, S3, or BigQuery without spinning up a query engine, when you need to share results with stakeholders who use spreadsheet tools, or when you are debugging a data pipeline and want to quickly check column values.",
            "Since this tool runs entirely in your browser, it is safe for sensitive or confidential datasets.",
          ],
        },
        {
          title: "Parquet vs CSV",
          paragraphs: [
            "Parquet is a columnar, compressed format optimized for large-scale data reads and aggregations. CSV is a plain-text format that is human-readable and compatible with nearly every tool.",
            "Converting from Parquet to CSV typically increases file size because CSV has no compression. For very large files, the conversion may take some time.",
          ],
        },
      ],
      listSections: [
        {
          title: "Things to know before converting",
          items: [
            "Nested columns and Map types may not convert cleanly into a flat CSV structure.",
            "NULL values are output as empty fields.",
            "Dates and timestamps are converted to strings.",
            "Large files may take a moment to process depending on your device.",
          ],
        },
      ],
      stepsTitle: "How to use",
      steps: [
        "Upload your Parquet file",
        "Review the file info and data preview",
        "Click \"Convert to CSV\"",
        "Download the resulting CSV file",
      ],
      faqTitle: "FAQ",
      faqs: [
        {
          question: "What Parquet files are supported?",
          answer:
            "Most Parquet files work, including those with Snappy, Gzip, or Zstd compression. Files with complex nested schemas are also supported in most cases.",
        },
        {
          question: "Is my data safe?",
          answer:
            "Yes. All processing runs locally in your browser. Your files are never uploaded to an external server.",
        },
        {
          question: "Is there a file size limit?",
          answer:
            "The limit depends on your browser's available memory, but most files up to a few hundred megabytes should work fine.",
        },
        {
          question: "Can I use this on mobile?",
          answer:
            "Yes. Any modern mobile browser should work.",
        },
        {
          question: "What encoding is the CSV output?",
          answer:
            "UTF-8. If you open it in Excel and see garbled characters, try importing it using Excel's text import wizard with UTF-8 encoding selected.",
        },
      ],
      relatedToolsTitle: "Related tools",
      relatedTools: [
        { name: "CSV to Parquet", href: "/en/tools/csv-to-parquet" },
        { name: "PDF to JPG", href: "/en/tools/pdf-to-jpg" },
        { name: "Image Compress", href: "/en/tools/image-compress" },
      ],
    },
    ui: {
      emptyTitle: "Drop a Parquet file here, or click to select",
      selectedFileTitle: "Selected file",
      fileNameLabel: "File name",
      fileTypeLabel: "Type",
      fileSizeLabel: "Size",
      rowCountLabel: "Rows",
      columnCountLabel: "Columns",
      convertButton: "Convert to CSV",
      convertingButton: "Converting...",
      convertingStatus: "Converting...",
      invalidFileError: "Error: Please select a .parquet file.",
      parseError: "Error: Failed to read the Parquet file.",
      unexpectedErrorPrefix: "Error",
      successMessage: (fileName, rows) =>
        `Done: Downloaded ${fileName}.csv (${rows.toLocaleString("en")} rows).`,
      downloadButton: "Download CSV",
      previewTitle: "Data preview",
      previewNote: (n) => `Showing first ${n} rows`,
    },
  },
};
