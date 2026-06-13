---
# dev.to front matter (Qiita/Hashnode: delete this block, paste the body)
title: "I wanted to peek at AWS Parquet files as CSV in the browser, so I built a tool"
published: false # set true when you publish
tags: aws, parquet, dataengineering, csv
# cover_image: https://ai-image-tools.com/og.png
---

> Cross-post target: dev.to / Hashnode. A publish checklist is at the very bottom.

## TL;DR

- Working in AWS S3 / Athena, I constantly wanted to **quickly inspect a Parquet file as CSV** — and couldn't find a frictionless tool.
- Installing a local toolchain or spinning up a query engine just to *look* at a file felt heavy.
- So I built a **browser-only Parquet ⇄ CSV converter** and put it out for free (no upload, processed in the browser):
  - Parquet → CSV: https://ai-image-tools.com/en/tools/parquet-to-csv
  - CSV → Parquet: https://ai-image-tools.com/en/tools/csv-to-parquet

Sharing in case you hit the same wall.

## The problem

When you work with data on AWS, you keep running into moments where you just want to **see what's inside** a `s3://.../part-0000.parquet`:

- Check the column names and a few rows before writing an Athena query
- Debug a pipeline and confirm the emitted Parquet looks right
- A non-engineer asks for it "in something I can open in Excel"

But Parquet is a **binary, columnar format** — you can't open it in a text editor or a normal spreadsheet. To peek inside, the options were:

- `pip install pandas pyarrow` and write a script
- Stand up Athena / Glue and run a query (and watch the scan cost)
- Install a desktop app

…all heavy for "I just want a look." I wanted something closer to **drop it in the browser and see a table**.

## Why go back and forth between Parquet and CSV

They play different roles:

| | Parquet | CSV |
|---|---|---|
| Layout | Columnar | Row-based (text) |
| Size | Small (compresses well) | Large |
| Types | Typed per column | All text (guessed) |
| Human-readable | Hard to open | Opens in Excel etc. |
| Good for | Analytics & storage | Inspecting, sharing, handoff |

### Parquet wins for analytics and storage

In environments billed by **data scanned** — S3 + Athena, BigQuery — leaving data as CSV means scanning more. With Parquet:

- Columns can be skipped → less scanned → **lower query cost**
- Compression → often **5–10× smaller** than CSV → cheaper storage and transfer
- Typed columns → fewer type-coercion and encoding headaches

Data that lives in a platform long-term is best stored as Parquet from the start.

### CSV wins for a quick look

But when you "just want to see it once," want Excel, or need to hand it to a non-engineer, **converting to CSV and opening locally is far faster** than standing up a query engine.

So the rule of thumb becomes: **Parquet for what the platform runs, CSV for checking and sharing** — and you need a converter at that boundary.

## What I built

To make "just let me see it" as short as possible, the converter runs **entirely in the browser**.

- **Parquet → CSV**: https://ai-image-tools.com/en/tools/parquet-to-csv
- **CSV → Parquet**: https://ai-image-tools.com/en/tools/csv-to-parquet

Highlights:

- **No upload, in-browser processing** — files never leave your machine, so it's safe for production or sensitive datasets.
- Handles common codecs (**Snappy / Gzip / Zstd**).
- Drop a file → see **row/column counts and a preview** → convert and download.
- No install, free, works on mobile browsers.

### The flow

1. Drop the `.parquet` you pulled from S3
2. Check the column and data preview
3. "Convert to CSV" → download

Going the other way, use **CSV → Parquet** to tidy a locally built CSV before loading it into a platform.

### Honest caveats

- Nested columns and Map types don't always flatten cleanly into CSV
- NULLs become empty fields; dates/timestamps become strings
- Size limit depends on browser memory — a few hundred MB is usually fine, but truly huge files belong in Athena/Spark

It's built for **inspecting and small-to-medium conversions**, not heavy ETL.

## A bit more depth

I wrote up the parts that didn't fit here:

- What is Parquet? How it differs from CSV: https://ai-image-tools.com/en/guides/what-is-parquet
- Parquet vs CSV workflows (AWS / BigQuery): https://ai-image-tools.com/en/guides/parquet-csv-workflows

## Wrap-up

If "I want to turn an AWS Parquet into CSV right in the browser" has ever stopped you for a minute, I hope this helps. Feedback and bug reports welcome — I'll keep improving it.

---

## 📣 Pre-publish checklist (do not include in the article)

- [ ] Flip `published: true` (dev.to)
- [ ] Set up to 4 tags; optionally set `cover_image`
- [ ] Verify the 4 links resolve
- [ ] Self-review for over-promotion (keep story → explanation → tool order; dev.to dislikes pure ads)
- [ ] After publishing, log the URL in index-request-secretary.md ("並行してやると効くこと")
