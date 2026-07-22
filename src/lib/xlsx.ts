import { strToU8, zipSync } from "fflate";

export type XlsxValue = string | number | boolean | null | undefined;

export type XlsxSheet = {
  name: string;
  headers: string[];
  rows: XlsxValue[][];
};

function escapeXml(value: string) {
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function safeSheetNames(sheets: XlsxSheet[]) {
  const used = new Set<string>();

  return sheets.map((sheet, index) => {
    const base = sheet.name.replace(/[\\/?*[\]:]/g, " ").trim().slice(0, 31) || `Sheet${index + 1}`;
    let name = base;
    let suffix = 2;

    while (used.has(name.toLowerCase())) {
      const marker = ` ${suffix}`;
      name = `${base.slice(0, 31 - marker.length)}${marker}`;
      suffix++;
    }

    used.add(name.toLowerCase());
    return name;
  });
}

function columnName(index: number) {
  let name = "";
  let n = index + 1;

  while (n > 0) {
    const remainder = (n - 1) % 26;
    name = String.fromCharCode(65 + remainder) + name;
    n = Math.floor((n - 1) / 26);
  }

  return name;
}

function cellXml(value: XlsxValue, rowIndex: number, columnIndex: number) {
  const ref = `${columnName(columnIndex)}${rowIndex + 1}`;

  if (value === null || value === undefined) {
    return `<c r="${ref}"/>`;
  }

  if (typeof value === "number" && Number.isFinite(value)) {
    return `<c r="${ref}" t="n"><v>${value}</v></c>`;
  }

  if (typeof value === "boolean") {
    return `<c r="${ref}" t="b"><v>${value ? 1 : 0}</v></c>`;
  }

  return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(String(value))}</t></is></c>`;
}

function worksheetXml(headers: string[], rows: XlsxValue[][]) {
  const allRows: XlsxValue[][] = [headers, ...rows];
  const lastColumn = columnName(Math.max(headers.length - 1, 0));
  const lastRow = Math.max(allRows.length, 1);
  const dimension = headers.length > 0 ? `A1:${lastColumn}${lastRow}` : "A1";

  const sheetRows = allRows
    .map((row, rowIndex) => {
      const cells = row
        .map((value, columnIndex) => cellXml(value, rowIndex, columnIndex))
        .join("");
      return `<row r="${rowIndex + 1}">${cells}</row>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <dimension ref="${dimension}"/>
  <sheetViews><sheetView workbookViewId="0"/></sheetViews>
  <sheetFormatPr defaultRowHeight="15"/>
  <sheetData>${sheetRows}</sheetData>
</worksheet>`;
}

export function createWorkbookBytes({ sheets }: { sheets: XlsxSheet[] }) {
  if (sheets.length === 0) {
    throw new Error("At least one worksheet is required.");
  }

  const names = safeSheetNames(sheets);
  const worksheetOverrides = sheets
    .map(
      (_sheet, index) =>
        `  <Override PartName="/xl/worksheets/sheet${index + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`,
    )
    .join("\n");
  const workbookSheets = names
    .map(
      (name, index) =>
        `<sheet name="${escapeXml(name)}" sheetId="${index + 1}" r:id="rId${index + 1}"/>`,
    )
    .join("");
  const worksheetRelationships = sheets
    .map(
      (_sheet, index) =>
        `  <Relationship Id="rId${index + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${index + 1}.xml"/>`,
    )
    .join("\n");
  const stylesRelationshipId = sheets.length + 1;
  const files: Record<string, Uint8Array> = {
    "[Content_Types].xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
${worksheetOverrides}
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
</Types>`),
    "_rels/.rels": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`),
    "xl/workbook.xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${workbookSheets}</sheets>
</workbook>`),
    "xl/_rels/workbook.xml.rels": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
${worksheetRelationships}
  <Relationship Id="rId${stylesRelationshipId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>`),
    "xl/styles.xml": strToU8(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts>
  <fills count="1"><fill><patternFill patternType="none"/></fill></fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/></cellXfs>
</styleSheet>`),
  };

  sheets.forEach((sheet, index) => {
    files[`xl/worksheets/sheet${index + 1}.xml`] = strToU8(
      worksheetXml(sheet.headers, sheet.rows),
    );
  });

  return zipSync(files, { level: 6 });
}

export function createXlsxBytes({
  headers,
  rows,
  sheetName = "Sheet1",
}: {
  headers: string[];
  rows: XlsxValue[][];
  sheetName?: string;
}) {
  return createWorkbookBytes({
    sheets: [{ name: sheetName, headers, rows }],
  });
}

export function createWorkbookBlob(options: { sheets: XlsxSheet[] }) {
  return new Blob([createWorkbookBytes(options)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}

export function createXlsxBlob(options: {
  headers: string[];
  rows: XlsxValue[][];
  sheetName?: string;
}) {
  return new Blob([createXlsxBytes(options)], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
}
