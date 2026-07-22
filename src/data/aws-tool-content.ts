import {
  AWS_OUTPUT_FORMATS,
  type AwsOutputFormat,
  type AwsToolKind,
} from "@/src/lib/aws-converter";

type Locale = "ja" | "en";

export type AwsToolContent = {
  slug: string;
  accept: string;
  multiple: boolean;
  title: string;
  description: string;
  aboutTitle: string;
  aboutText: string;
  contentSections: { title: string; paragraphs: string[] }[];
  listSections: { title: string; items: string[] }[];
  comparisonTitle: string;
  comparisonItems: { label: string; value: string }[];
  stepsTitle: string;
  steps: string[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  relatedTools: { name: string; href: string }[];
  ui: {
    dropTitle: string;
    dropDescription: string;
    convert: string;
    converting: string;
    success: (rows: number) => string;
    error: string;
    preview: string;
    previewNote: string;
    outputTitle: string;
    download: string;
    formats: { format: AwsOutputFormat; label: string }[];
    stats: Record<string, string>;
  };
};

const href = (locale: Locale, slug: string) =>
  `${locale === "en" ? "/en" : ""}/tools/${slug}`;
const guideHref = (locale: Locale) =>
  `${locale === "en" ? "/en" : ""}/guides/aws-export-file-formats`;

const outputFormatLabels: Record<AwsOutputFormat, string> = {
  json: "JSON",
  csv: "CSV",
  xlsx: "Excel",
  jsonl: "JSONL",
  srt: "SRT",
  vtt: "VTT",
  txt: "TXT",
};

function outputFormats(kind: AwsToolKind) {
  return AWS_OUTPUT_FORMATS[kind].map((format) => ({
    format,
    label: outputFormatLabels[format],
  }));
}

function commonRelated(locale: Locale, current: AwsToolKind) {
  const names: Record<AwsToolKind, [string, string]> = {
    dynamodb: ["DynamoDB JSON変換", "DynamoDB JSON Converter"],
    textract: ["Textract JSONをExcelに変換", "Textract JSON to Excel"],
    cloudtrail: ["CloudTrailログをCSVに変換", "CloudTrail Log to CSV"],
    "s3-inventory": ["S3 Inventoryビューアー", "S3 Inventory Viewer"],
    cloudwatch: ["CloudWatch Logs変換", "CloudWatch Logs Converter"],
    transcribe: ["Transcribe JSONを字幕に変換", "Transcribe JSON to Subtitles"],
  };
  const slugs: Record<AwsToolKind, string> = {
    dynamodb: "dynamodb-json-converter",
    textract: "textract-json-to-excel",
    cloudtrail: "cloudtrail-log-to-csv",
    "s3-inventory": "s3-inventory-viewer",
    cloudwatch: "cloudwatch-logs-converter",
    transcribe: "transcribe-json-to-srt",
  };
  return (Object.keys(slugs) as AwsToolKind[])
    .filter((kind) => kind !== current)
    .slice(0, 3)
    .map((kind) => ({
      name: names[kind][locale === "ja" ? 0 : 1],
      href: href(locale, slugs[kind]),
    }));
}

function dynamodb(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "dynamodb-json-converter",
    accept: ".json,.jsonl,.gz,application/json,application/gzip",
    multiple: false,
    title: ja ? "DynamoDB JSONをCSV・Excelに変換" : "DynamoDB JSON Converter",
    description: ja
      ? "DynamoDBの型付きJSON、JSON Lines、S3エクスポートの.json.gzを通常のJSON・CSV・Excelへ変換します。"
      : "Convert DynamoDB typed JSON, JSON Lines, and S3 export .json.gz files to plain JSON, CSV, or Excel in your browser.",
    aboutTitle: ja ? "DynamoDB JSON変換とは？" : "What is DynamoDB JSON Converter?",
    aboutText: ja
      ? "S・N・BOOL・M・LなどのAttributeValue表現を解除し、表計算ソフトで読める列と行に展開します。フルエクスポートと増分エクスポートの両方に対応します。"
      : "Unmarshall AttributeValue types such as S, N, BOOL, M, and L into ordinary values and spreadsheet columns. Full and incremental exports are supported.",
    contentSections: [{
      title: ja ? "S3エクスポートをそのまま読み取り" : "Read DynamoDB S3 exports directly",
      paragraphs: ja
        ? ["DynamoDBのフルエクスポートで作られる1行1ItemのJSON Linesとgzip圧縮ファイルを読み取ります。Scan結果のItems配列や、Keys・NewImage・OldImageを含む増分形式も変換できます。", "DynamoDBのN型は桁落ちを避けるため文字列として保持します。ネストしたM型はdot notationの列へ展開し、セットとリストはJSON配列として残します。"]
        : ["Read gzip-compressed JSON Lines from full DynamoDB exports, Scan responses with an Items array, and incremental records containing Keys, NewImage, or OldImage.", "N values stay as strings to avoid losing precision. Nested maps become dot-notation columns, while sets and lists remain JSON arrays."],
    }],
    listSections: [{
      title: ja ? "対応するDynamoDB形式" : "Supported DynamoDB formats",
      items: ja
        ? ["S・N・B・BOOL・NULL", "SS・NS・BS", "M・Lのネスト", "フルエクスポートのItem", "増分エクスポートのKeys・NewImage・OldImage", ".json・.jsonl・.json.gz"]
        : ["S, N, B, BOOL, and NULL", "SS, NS, and BS sets", "Nested M and L values", "Full-export Item records", "Incremental Keys, NewImage, and OldImage", ".json, .jsonl, and .json.gz"],
    }],
    comparisonTitle: ja ? "出力形式の選び方" : "Choose an output format",
    comparisonItems: ja
      ? [{ label: "通常JSON", value: "型記号を外し、アプリやスクリプトで再利用しやすくします。" }, { label: "CSV", value: "軽く確認したいときや別システムへ渡すときに向きます。" }, { label: "Excel", value: "列を表として確認し、担当者へ共有するときに向きます。" }]
      : [{ label: "Plain JSON", value: "Removes type wrappers for reuse in applications and scripts." }, { label: "CSV", value: "Useful for quick inspection and portable downstream imports." }, { label: "Excel", value: "Useful for spreadsheet review and business sharing." }],
    stepsTitle: ja ? "使い方" : "How to use",
    steps: ja ? ["DynamoDBのJSON・JSONL・JSON.GZを選択します", "変換ボタンを押します", "列と先頭データを確認します", "JSON・CSV・Excelを選んで保存します"] : ["Choose a DynamoDB JSON, JSONL, or JSON.GZ file", "Click convert", "Review columns and sample rows", "Download plain JSON, CSV, or Excel"],
    faqTitle: ja ? "よくある質問" : "FAQ",
    faqs: ja
      ? [{ question: "DynamoDBの数値は数値型になりますか？", answer: "N型は非常に大きな値でも桁を失わないよう文字列として出力します。" }, { question: "増分エクスポートにも対応しますか？", answer: "はい。Keys、NewImage、OldImage、Metadataをそれぞれ保持して列へ展開します。" }, { question: "ファイルはAWSや外部サーバーへ送られますか？", answer: "いいえ。gzip展開と変換はブラウザ内で行います。" }]
      : [{ question: "Are DynamoDB numbers converted to JavaScript numbers?", answer: "No. N values are emitted as strings so very large values do not lose precision." }, { question: "Does it support incremental exports?", answer: "Yes. Keys, NewImage, OldImage, and Metadata are preserved and flattened into columns." }, { question: "Is the file uploaded to AWS or another server?", answer: "No. Decompression and conversion run in your browser." }],
    relatedTools: [...commonRelated(locale, "dynamodb"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: {
      dropTitle: ja ? "DynamoDB JSONを選択" : "Choose DynamoDB JSON",
      dropDescription: ja ? ".json・.jsonl・.json.gzに対応" : "Supports .json, .jsonl, and .json.gz",
      convert: ja ? "DynamoDB JSONを変換" : "Convert DynamoDB JSON",
      converting: ja ? "変換中..." : "Converting...",
      success: (rows) => ja ? `完了: ${rows.toLocaleString()}件のItemを変換しました。` : `Done: Converted ${rows.toLocaleString()} DynamoDB items.`,
      error: ja ? "エラー" : "Error",
      preview: ja ? "変換プレビュー" : "Conversion preview",
      previewNote: ja ? "先頭10行まで表示します。" : "Showing up to the first 10 rows.",
      outputTitle: ja ? "保存形式" : "Output format",
      download: ja ? "ダウンロード" : "Download",
      formats: outputFormats("dynamodb"),
      stats: { items: ja ? "Item数" : "Items", columns: ja ? "列数" : "Columns" },
    },
  };
}

function textract(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "textract-json-to-excel",
    accept: ".json,application/json",
    multiple: false,
    title: ja ? "Amazon Textract JSONをExcel・CSVに変換" : "Amazon Textract JSON to Excel",
    description: ja ? "Amazon TextractのBlockとRelationshipを解析し、表・フォーム・本文をExcelまたはCSVへ変換します。" : "Reconstruct tables, forms, and text from Amazon Textract Blocks and Relationships, then export Excel or CSV.",
    aboutTitle: ja ? "Textract JSON変換とは？" : "What is Textract JSON to Excel?",
    aboutText: ja ? "TABLEからCELL、WORD、SELECTION_ELEMENTをたどって表を復元し、複数テーブルをExcelの別シートへ整理します。" : "Follow TABLE, CELL, WORD, and SELECTION_ELEMENT relationships to rebuild table grids and place multiple tables on separate Excel sheets.",
    contentSections: [{ title: ja ? "Block配列から表を復元" : "Rebuild tables from the Block graph", paragraphs: ja ? ["Textractのレスポンスは完成した表ではなく、Idで結ばれたBlockの配列です。このツールはRelationshipをたどり、RowIndexとColumnIndexに従ってセルを並べ直します。", "KEY_VALUE_SETはFormsシート、LINEはText Linesシートへ分けます。選択されたチェックボックスは[X]として保持します。"] : ["A Textract response is a graph of Blocks linked by IDs rather than a ready-made spreadsheet. This tool follows Relationships and uses RowIndex and ColumnIndex to rebuild cells.", "KEY_VALUE_SET blocks go to a Forms sheet, LINE blocks go to a Text Lines sheet, and selected checkboxes are preserved as [X]."] }],
    listSections: [{ title: ja ? "抽出する内容" : "Extracted content", items: ja ? ["TABLE・CELLの表構造", "WORDと選択要素", "KEY_VALUE_SETの項目名と値", "LINEの本文とConfidence", "複数ページ・複数テーブル"] : ["TABLE and CELL grids", "WORD and selection elements", "KEY_VALUE_SET names and values", "LINE text and confidence", "Multiple pages and tables"] }],
    comparisonTitle: ja ? "ExcelとCSVの違い" : "Excel vs. CSV",
    comparisonItems: ja ? [{ label: "Excel", value: "表ごとのシートに加え、フォームと本文もまとめて保存します。" }, { label: "CSV", value: "全テーブルにtable番号とpage番号を付けて1ファイルにまとめます。" }] : [{ label: "Excel", value: "Keeps one sheet per table plus Forms and Text Lines sheets." }, { label: "CSV", value: "Combines table rows with table and page identifiers in one file." }],
    stepsTitle: ja ? "使い方" : "How to use",
    steps: ja ? ["TextractのJSONレスポンスを選択します", "変換ボタンを押します", "復元した表を確認します", "ExcelまたはCSVを保存します"] : ["Choose a Textract JSON response", "Click convert", "Review the reconstructed table", "Download Excel or CSV"],
    faqTitle: ja ? "よくある質問" : "FAQ",
    faqs: ja ? [{ question: "複数の表を扱えますか？", answer: "はい。Excelでは表ごとに別シートを作成します。" }, { question: "フォームのキーと値も出せますか？", answer: "はい。KEY_VALUE_SETのKEYとVALUEをFormsシートへ出力します。" }, { question: "手書きやOCRの誤認識も直りますか？", answer: "OCR結果の文字自体は修正しません。Textractが返したTextを表構造へ並べ直します。" }] : [{ question: "Can it handle multiple tables?", answer: "Yes. Each table is written to a separate Excel sheet." }, { question: "Are form key-value pairs included?", answer: "Yes. KEY_VALUE_SET relationships are exported to a Forms sheet." }, { question: "Does it correct OCR errors?", answer: "No. It reconstructs the structure while preserving the Text returned by Textract." }],
    relatedTools: [...commonRelated(locale, "textract"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: { dropTitle: ja ? "Textract JSONを選択" : "Choose Textract JSON", dropDescription: ja ? "AnalyzeDocument・GetDocumentAnalysisのJSONに対応" : "For AnalyzeDocument and GetDocumentAnalysis JSON", convert: ja ? "Textract JSONを変換" : "Convert Textract JSON", converting: ja ? "表を復元中..." : "Reconstructing...", success: (rows) => ja ? `完了: 表データ${rows.toLocaleString()}行を復元しました。` : `Done: Reconstructed ${rows.toLocaleString()} table rows.`, error: ja ? "エラー" : "Error", preview: ja ? "最初の表" : "First table", previewNote: ja ? "先頭10行まで表示します。" : "Showing up to the first 10 rows.", outputTitle: ja ? "保存形式" : "Output format", download: ja ? "ダウンロード" : "Download", formats: outputFormats("textract"), stats: { blocks: ja ? "Block数" : "Blocks", tables: ja ? "表" : "Tables", forms: ja ? "フォーム項目" : "Form fields", lines: ja ? "本文行" : "Text lines" } },
  };
}

function cloudtrail(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "cloudtrail-log-to-csv", accept: ".json,.jsonl,.gz,application/json,application/gzip", multiple: true,
    title: ja ? "CloudTrailログ（.json.gz）をCSV・JSONLに変換" : "CloudTrail Log to CSV Converter",
    description: ja ? "S3に保存された複数のAWS CloudTrail .json.gzログを結合し、イベントをCSVまたはJSONLへ変換します。" : "Merge AWS CloudTrail .json.gz log objects from S3 and convert their Records to CSV or JSONL in your browser.",
    aboutTitle: ja ? "CloudTrailログ変換とは？" : "What is CloudTrail Log to CSV?",
    aboutText: ja ? "CloudTrailのRecords配列を展開し、eventTime、eventSource、eventName、userIdentity、エラー情報などを検索しやすい列へ整理します。" : "Expand CloudTrail Records into searchable columns for eventTime, eventSource, eventName, userIdentity, errors, and other audit fields.",
    contentSections: [{ title: ja ? "S3配信ログをまとめて調査" : "Investigate multiple S3 log objects", paragraphs: ja ? ["イベント履歴画面のCSVダウンロードではなく、CloudTrail TrailがS3へ配信したgzip圧縮JSONを対象にしています。複数ファイルを一度に選択し、sourceFile列を付けて結合します。", "requestParametersやresponseElementsは列爆発を避けるためJSON文字列で保持し、userIdentityの主要情報は個別列へ展開します。"] : ["This targets gzip-compressed JSON delivered by a CloudTrail trail to S3, rather than the recent-event CSV available in the console. Select multiple objects and merge them with a sourceFile column.", "requestParameters and responseElements stay as JSON strings to avoid excessive columns, while userIdentity fields are expanded for filtering."] }],
    listSections: [{ title: ja ? "確認しやすくなる項目" : "Fields prepared for review", items: ja ? ["eventTime・eventSource・eventName", "awsRegion・sourceIPAddress", "userIdentityのtype・ARN・principalId", "errorCode・errorMessage", "requestParameters・resources", "元のログファイル名"] : ["eventTime, eventSource, and eventName", "awsRegion and sourceIPAddress", "userIdentity type, ARN, and principalId", "errorCode and errorMessage", "requestParameters and resources", "Original log filename"] }],
    comparisonTitle: ja ? "CSVとJSONLの使い分け" : "CSV vs. JSONL",
    comparisonItems: ja ? [{ label: "CSV", value: "Excelで絞り込み、監査イベントを目視確認するときに向きます。" }, { label: "JSONL", value: "1イベント1行で、jq・DuckDB・ログ基盤へ渡すときに向きます。" }] : [{ label: "CSV", value: "Best for filtering and reviewing audit events in a spreadsheet." }, { label: "JSONL", value: "Keeps one event per line for jq, DuckDB, and log pipelines." }],
    stepsTitle: ja ? "使い方" : "How to use", steps: ja ? ["S3から取得した.json.gzを複数選択します", "変換ボタンを押します", "イベントとエラー列を確認します", "CSVまたはJSONLを保存します"] : ["Choose one or more .json.gz objects from S3", "Click convert", "Review event and error columns", "Download CSV or JSONL"],
    faqTitle: ja ? "よくある質問" : "FAQ", faqs: ja ? [{ question: "複数の.json.gzをまとめられますか？", answer: "はい。選択したすべてのRecordsを結合し、元ファイル名を残します。" }, { question: "CloudTrail Lakeの出力にも使えますか？", answer: "このツールは主にTrailからS3へ配信されるRecords形式を対象にしています。" }, { question: "機密ログはアップロードされますか？", answer: "いいえ。gzip展開と変換はブラウザ内で完結します。" }] : [{ question: "Can it merge multiple .json.gz files?", answer: "Yes. Records from every selected file are merged and retain their source filename." }, { question: "Is this for CloudTrail Lake exports?", answer: "It primarily targets the Records format delivered by trails to S3." }, { question: "Are sensitive audit logs uploaded?", answer: "No. Decompression and conversion stay in your browser." }],
    relatedTools: [...commonRelated(locale, "cloudtrail"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: { dropTitle: ja ? "CloudTrailログをまとめて選択" : "Choose CloudTrail log files", dropDescription: ja ? ".json.gz・.json・.jsonlを複数選択できます" : "Select multiple .json.gz, .json, or .jsonl files", convert: ja ? "CloudTrailログを変換" : "Convert CloudTrail Logs", converting: ja ? "ログを結合中..." : "Merging logs...", success: (rows) => ja ? `完了: ${rows.toLocaleString()}件のイベントを結合しました。` : `Done: Merged ${rows.toLocaleString()} CloudTrail events.`, error: ja ? "エラー" : "Error", preview: ja ? "イベントプレビュー" : "Event preview", previewNote: ja ? "先頭10件まで表示します。" : "Showing up to the first 10 events.", outputTitle: ja ? "保存形式" : "Output format", download: ja ? "ダウンロード" : "Download", formats: outputFormats("cloudtrail"), stats: { events: ja ? "イベント" : "Events", files: ja ? "ファイル" : "Files" } },
  };
}

function s3Inventory(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "s3-inventory-viewer", accept: ".json,.csv,.csv.gz,.gz,.parquet,application/json,application/gzip", multiple: true,
    title: ja ? "S3 Inventoryビューアー・CSV/Excel変換" : "S3 Inventory Viewer & Converter",
    description: ja ? "Amazon S3 Inventoryのmanifest.jsonとCSV.GZまたはParquetを読み込み、オブジェクト一覧を表示・結合してCSV/Excelへ変換します。" : "Open an Amazon S3 Inventory manifest with CSV.GZ or Parquet data files, inspect object rows, and export merged CSV or Excel.",
    aboutTitle: ja ? "S3 Inventoryビューアーとは？" : "What is S3 Inventory Viewer?",
    aboutText: ja ? "manifest.jsonのfileSchemaを列名として使い、ヘッダーを持たないCSV.GZを正しく読み取ります。分割された複数データファイルも1つに結合できます。" : "Use fileSchema from manifest.json as headers for headerless CSV.GZ data, and merge multiple inventory data objects into one table.",
    contentSections: [{ title: ja ? "manifestとデータファイルを一緒に選択" : "Select the manifest and data files together", paragraphs: ja ? ["S3 Inventoryはmanifest.jsonと、1個以上のCSV.GZ・ORC・Parquetデータで構成されます。このツールではmanifestとCSV.GZまたはParquetをローカルへ取得して一緒に選択します。", "CSVはmanifestのfileSchema順に列を割り当てます。Parquetはファイル内の列情報を読み取り、複数ファイルを共通列へ統合します。"] : ["An S3 Inventory consists of manifest.json plus one or more CSV.GZ, ORC, or Parquet data objects. Download the manifest with its CSV.GZ or Parquet files and select them together here.", "CSV columns follow fileSchema from the manifest. Parquet columns come from the file schema, and multiple files are merged across their common columns."] }],
    listSections: [{ title: ja ? "確認できるInventory項目" : "Inventory fields you can inspect", items: ja ? ["Bucket・Key・VersionId", "Size・LastModifiedDate・ETag", "StorageClass・IsLatest・DeleteMarker", "暗号化・レプリケーション・Object Lockの任意列", "データ元ファイル名"] : ["Bucket, Key, and VersionId", "Size, LastModifiedDate, and ETag", "StorageClass, IsLatest, and DeleteMarker", "Optional encryption, replication, and Object Lock fields", "Source data filename"] }],
    comparisonTitle: ja ? "対応形式" : "Supported formats", comparisonItems: ja ? [{ label: "CSV.GZ", value: "manifestのfileSchemaを使ってヘッダーなしCSVを読み取ります。" }, { label: "Parquet", value: "Parquet内のスキーマを読み取り、列と値を直接展開します。" }, { label: "ORC", value: "現在は未対応です。S3 Inventory設定でCSVまたはParquetを選んでください。" }] : [{ label: "CSV.GZ", value: "Uses fileSchema from the manifest to label headerless CSV rows." }, { label: "Parquet", value: "Reads columns and values directly from the Parquet schema." }, { label: "ORC", value: "Not currently supported; configure Inventory to use CSV or Parquet." }],
    stepsTitle: ja ? "使い方" : "How to use", steps: ja ? ["manifest.jsonとデータファイルを同じ場所へ取得します", "manifestとCSV.GZまたはParquetをまとめて選択します", "読み込みボタンを押して一覧を確認します", "CSVまたはExcelを保存します"] : ["Download manifest.json and its data objects", "Select the manifest plus CSV.GZ or Parquet files", "Click load and inspect the rows", "Download merged CSV or Excel"],
    faqTitle: ja ? "よくある質問" : "FAQ", faqs: ja ? [{ question: "manifest.jsonだけで一覧を表示できますか？", answer: "いいえ。manifestにはデータファイルの場所とスキーマがあり、実際のオブジェクト一覧はCSV.GZまたはParquetに入っています。" }, { question: "分割されたファイルを結合できますか？", answer: "はい。選択したデータファイルを同じ列構成へ揃えて結合します。" }, { question: "S3へ直接接続しますか？", answer: "いいえ。認証情報は使わず、端末へ取得済みのファイルだけをブラウザ内で処理します。" }] : [{ question: "Can the manifest alone show object rows?", answer: "No. The manifest contains locations and schema; actual object rows are stored in CSV.GZ or Parquet data files." }, { question: "Can it merge split data files?", answer: "Yes. Selected files are aligned to a shared set of columns and merged." }, { question: "Does it connect directly to S3?", answer: "No. It uses no credentials and processes only files already downloaded to your device." }],
    relatedTools: [...commonRelated(locale, "s3-inventory"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: { dropTitle: ja ? "manifestとInventoryデータを選択" : "Choose manifest and inventory data", dropDescription: ja ? "manifest.json + .csv.gz・.csv・.parquet" : "manifest.json plus .csv.gz, .csv, or .parquet", convert: ja ? "S3 Inventoryを読み込む" : "Load S3 Inventory", converting: ja ? "Inventoryを結合中..." : "Merging inventory...", success: (rows) => ja ? `完了: ${rows.toLocaleString()}件のオブジェクトを読み込みました。` : `Done: Loaded ${rows.toLocaleString()} inventory rows.`, error: ja ? "エラー" : "Error", preview: ja ? "オブジェクト一覧" : "Object inventory", previewNote: ja ? "先頭10件まで表示します。" : "Showing up to the first 10 rows.", outputTitle: ja ? "保存形式" : "Output format", download: ja ? "ダウンロード" : "Download", formats: outputFormats("s3-inventory"), stats: { rows: ja ? "行数" : "Rows", columns: ja ? "列数" : "Columns", loadedFiles: ja ? "読込ファイル" : "Loaded files", manifestFiles: ja ? "manifest記載" : "Manifest files" } },
  };
}

function cloudwatch(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "cloudwatch-logs-converter", accept: ".gz,.log,.txt,.json,.jsonl,application/gzip,text/plain,application/json", multiple: true,
    title: ja ? "CloudWatch Logs（.gz）をCSV・JSONLに変換" : "CloudWatch Logs Export Converter",
    description: ja ? "CloudWatch LogsからS3へエクスポートした複数の.gzログを展開し、時刻順に並べてCSVまたはJSONLへ変換します。" : "Decompress CloudWatch Logs exports from S3, merge split .gz files in timestamp order, and export CSV or JSONL.",
    aboutTitle: ja ? "CloudWatch Logs変換とは？" : "What is CloudWatch Logs Export Converter?",
    aboutText: ja ? "S3エクスポートで分割されたログをまとめ、先頭のepochミリ秒またはISO時刻をdatetime列へ変換します。JSONメッセージは検索しやすい列にも展開します。" : "Merge split S3 export objects, convert leading epoch milliseconds or ISO timestamps into datetime, and expand JSON messages into searchable columns.",
    contentSections: [{ title: ja ? "順序が保証されない分割ログを並べ直す" : "Sort exported chunks whose order is not guaranteed", paragraphs: ja ? ["CloudWatch LogsのS3エクスポートは複数のgzipオブジェクトに分かれ、チャンク内の順序も保証されません。このツールは読み取れたtimestampでイベントを昇順に並べます。", "プレーンテキスト、timestamp + message、JSON Lines、Subscription Filter形式のlogEventsを読み取ります。messageがJSONならmessage.列を追加します。"] : ["CloudWatch Logs exports can be split across gzip objects, and event order inside chunks is not guaranteed. This tool sorts parsed events by timestamp.", "It reads plain text, timestamp-plus-message lines, JSON Lines, and subscription payloads with logEvents. JSON messages also gain message.* columns."] }],
    listSections: [{ title: ja ? "対応するログ行" : "Supported log rows", items: ja ? ["epochミリ秒 + メッセージ", "ISO 8601時刻 + メッセージ", "JSON Lines", "logEvents配列を持つSubscription形式", "時刻を持たないプレーンテキスト"] : ["Epoch milliseconds plus message", "ISO 8601 timestamp plus message", "JSON Lines", "Subscription payloads with logEvents", "Plain text without timestamps"] }],
    comparisonTitle: ja ? "出力形式" : "Output formats", comparisonItems: ja ? [{ label: "CSV", value: "Excelで時刻・レベル・JSONフィールドを絞り込めます。" }, { label: "JSONL", value: "1イベント1行を保ち、ログ分析ツールへ渡しやすくします。" }] : [{ label: "CSV", value: "Filter timestamps, levels, and expanded JSON fields in Excel." }, { label: "JSONL", value: "Keep one normalized event per line for log analysis tools." }],
    stepsTitle: ja ? "使い方" : "How to use", steps: ja ? ["S3から取得した.gzログを複数選択します", "変換ボタンを押します", "時刻順のイベントを確認します", "CSVまたはJSONLを保存します"] : ["Choose one or more exported .gz files", "Click convert", "Review events in timestamp order", "Download CSV or JSONL"],
    faqTitle: ja ? "よくある質問" : "FAQ", faqs: ja ? [{ question: "ログの順番は直りますか？", answer: "timestampを読み取れた行は昇順に並べます。時刻がない行は後ろに保持します。" }, { question: "JSONログも列にできますか？", answer: "はい。messageがJSONオブジェクトなら、message.levelのような列へ展開します。" }, { question: "大容量ログにも使えますか？", answer: "ブラウザのメモリ内で処理するため、非常に大きなエクスポートは分割して使ってください。" }] : [{ question: "Does it restore event order?", answer: "Rows with parsed timestamps are sorted ascending; rows without timestamps remain at the end." }, { question: "Can JSON logs become columns?", answer: "Yes. JSON objects in message are expanded into columns such as message.level." }, { question: "Can it handle very large exports?", answer: "Processing uses browser memory, so split very large exports into smaller batches." }],
    relatedTools: [...commonRelated(locale, "cloudwatch"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: { dropTitle: ja ? "CloudWatch Logsの.gzを選択" : "Choose CloudWatch Logs exports", dropDescription: ja ? ".gz・.log・.txt・.jsonlを複数選択できます" : "Select multiple .gz, .log, .txt, or .jsonl files", convert: ja ? "CloudWatch Logsを変換" : "Convert CloudWatch Logs", converting: ja ? "ログを展開・整列中..." : "Decompressing and sorting...", success: (rows) => ja ? `完了: ${rows.toLocaleString()}件のログを時刻順に整理しました。` : `Done: Sorted ${rows.toLocaleString()} log events.`, error: ja ? "エラー" : "Error", preview: ja ? "ログプレビュー" : "Log preview", previewNote: ja ? "先頭10件まで表示します。" : "Showing up to the first 10 events.", outputTitle: ja ? "保存形式" : "Output format", download: ja ? "ダウンロード" : "Download", formats: outputFormats("cloudwatch"), stats: { events: ja ? "ログ件数" : "Events", files: ja ? "ファイル" : "Files" } },
  };
}

function transcribe(locale: Locale): AwsToolContent {
  const ja = locale === "ja";
  return {
    slug: "transcribe-json-to-srt", accept: ".json,application/json", multiple: false,
    title: ja ? "Amazon Transcribe JSONをSRT・VTT字幕に変換" : "Amazon Transcribe JSON to SRT & VTT",
    description: ja ? "Amazon TranscribeのJSON結果からタイムコードと話者ラベルを読み取り、SRT・WebVTT・TXT字幕へ変換します。" : "Convert Amazon Transcribe JSON results into SRT, WebVTT, or TXT using item timestamps and speaker labels.",
    aboutTitle: ja ? "Transcribe JSON字幕変換とは？" : "What is Transcribe JSON to Subtitles?",
    aboutText: ja ? "results.itemsの発音・句読点、またはaudio_segmentsを字幕キューへまとめ、タイムコード付きで保存します。既存JSONや字幕未出力のジョブに使えます。" : "Group pronunciation and punctuation items, or audio_segments, into timed subtitle cues. This is useful for existing JSON and jobs that did not request subtitle output.",
    contentSections: [{ title: ja ? "単語時刻から読みやすい字幕へ" : "Turn word timestamps into readable cues", paragraphs: ja ? ["単語を句読点、文字数、時間、話者の切り替わりでまとめ、長すぎる字幕を分割します。speaker_labelsがある場合は[spk_0]のような話者名を先頭へ付けます。", "SRTは動画編集ソフトで広く使われ、VTTはHTML videoなどWeb字幕に向きます。TXTはタイムコードなしの文字起こし確認用です。"] : ["Words are grouped by punctuation, character count, duration, and speaker changes so cues do not become excessively long. Speaker labels are prefixed as [spk_0] when available.", "SRT is widely used by video editors, VTT fits web video captions, and TXT provides the transcript without timecodes."] }],
    listSections: [{ title: ja ? "読み取るTranscribe項目" : "Transcribe fields used", items: ja ? ["results.itemsのstart_time・end_time", "pronunciationとpunctuation", "speaker_labels", "results.audio_segments", "results.transcriptsの全文"] : ["start_time and end_time from results.items", "pronunciation and punctuation", "speaker_labels", "results.audio_segments", "Full text from results.transcripts"] }],
    comparisonTitle: ja ? "字幕形式の選び方" : "Choose a subtitle format", comparisonItems: ja ? [{ label: "SRT", value: "動画編集ソフトや動画サービスへ読み込む一般的な字幕形式です。" }, { label: "VTT", value: "WebVTT対応プレーヤーやHTML videoで使いやすい形式です。" }, { label: "TXT", value: "タイムコードを外した文字起こし本文です。" }] : [{ label: "SRT", value: "A common subtitle format for video editors and hosting platforms." }, { label: "VTT", value: "Designed for WebVTT players and HTML video captions." }, { label: "TXT", value: "Transcript text without subtitle timecodes." }],
    stepsTitle: ja ? "使い方" : "How to use", steps: ja ? ["Amazon TranscribeのJSON結果を選択します", "変換ボタンを押します", "字幕キューと話者を確認します", "SRT・VTT・TXTを選んで保存します"] : ["Choose an Amazon Transcribe JSON result", "Click convert", "Review cues and speaker labels", "Download SRT, VTT, or TXT"],
    faqTitle: ja ? "よくある質問" : "FAQ", faqs: ja ? [{ question: "Amazon Transcribeは直接SRTを出せませんか？", answer: "現在のTranscribeはジョブ作成時に字幕出力を指定できます。このツールは既存JSONや字幕を指定しなかったジョブの変換に便利です。" }, { question: "話者ラベルを残せますか？", answer: "はい。speaker_labelsまたは各itemのspeaker_labelを字幕へ付けます。" }, { question: "日本語にも使えますか？", answer: "はい。日本語の句読点にも対応し、CJK文字の間へ不要な空白を入れないよう処理します。" }] : [{ question: "Can Amazon Transcribe output SRT directly?", answer: "Current jobs can request subtitles. This tool is useful for existing JSON or jobs created without subtitle output." }, { question: "Are speaker labels preserved?", answer: "Yes. Labels from speaker_labels or individual items are added to cues." }, { question: "Does it work with Japanese transcripts?", answer: "Yes. Japanese punctuation is recognized and unnecessary spaces between CJK characters are avoided." }],
    relatedTools: [...commonRelated(locale, "transcribe"), { name: ja ? "AWSエクスポート形式ガイド" : "AWS export formats guide", href: guideHref(locale) }],
    ui: { dropTitle: ja ? "Transcribe JSONを選択" : "Choose Transcribe JSON", dropDescription: ja ? "文字起こしジョブのJSON結果" : "JSON output from a transcription job", convert: ja ? "字幕へ変換" : "Convert to Subtitles", converting: ja ? "字幕を作成中..." : "Creating subtitles...", success: (rows) => ja ? `完了: ${rows.toLocaleString()}個の字幕キューを作成しました。` : `Done: Created ${rows.toLocaleString()} subtitle cues.`, error: ja ? "エラー" : "Error", preview: ja ? "字幕プレビュー" : "Subtitle preview", previewNote: ja ? "先頭10キューまで表示します。" : "Showing up to the first 10 cues.", outputTitle: ja ? "保存形式" : "Output format", download: ja ? "ダウンロード" : "Download", formats: outputFormats("transcribe"), stats: { cues: ja ? "字幕キュー" : "Cues", duration: ja ? "終了時刻（秒）" : "End time (sec)" } },
  };
}

export function getAwsToolContent(kind: AwsToolKind, locale: Locale) {
  switch (kind) {
    case "dynamodb": return dynamodb(locale);
    case "textract": return textract(locale);
    case "cloudtrail": return cloudtrail(locale);
    case "s3-inventory": return s3Inventory(locale);
    case "cloudwatch": return cloudwatch(locale);
    case "transcribe": return transcribe(locale);
  }
}
