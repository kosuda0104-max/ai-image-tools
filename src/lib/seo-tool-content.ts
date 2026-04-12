type RelatedToolItem = {
  name: string;
  href: string;
};

type ToolTextSection = {
  title: string;
  paragraphs: string[];
};

type ToolListSection = {
  title: string;
  items: string[];
};

type ToolComparisonItem = {
  label: string;
  value: string;
};

type SeoFallbackContent = {
  contentSections: ToolTextSection[];
  listSections: ToolListSection[];
  comparisonTitle: string;
  comparisonItems: ToolComparisonItem[];
  relatedToolsTitle: string;
};

export function buildSeoFallbackContent({
  title,
  relatedTools,
}: {
  title: string;
  description: string;
  relatedTools: RelatedToolItem[];
}): SeoFallbackContent {
  const locale = isJapanese(title) ? "ja" : "en";
  const category = detectCategory(title);
  const relatedToolsTitle =
    locale === "ja"
      ? "あわせて使いやすい関連ツール"
      : "Related tools for the next step";

  if (category === "conversion") {
    const pair = parseConversionPair(title, locale);

    return locale === "ja"
      ? {
          contentSections: [
            {
              title: `${title}が向いている場面`,
              paragraphs: [
                `${title}は、今の形式だと少し扱いづらい画像を、次の作業に合う形へ整えたいときに役立ちます。アップロード先の指定に合わせたいとき、共有先で開きやすくしたいとき、編集工程に入りやすい形式へ寄せたいときに使いやすい変換です。`,
                "変換そのものが目的というより、このあと送る、載せる、編集する、そのどれかを楽にするための一手として考えると選びやすくなります。",
              ],
            },
            {
              title: "変換前に決めておくと迷いにくいこと",
              paragraphs: [
                "まず決めたいのは、軽さを優先するのか、互換性を優先するのか、透明背景や編集しやすさを残したいのかという点です。",
                "元ファイルはそのまま残し、必要な用途に合わせたコピーだけを変換して使う形にしておくと、あとからやり直しやすくなります。",
              ],
            },
          ],
          listSections: [
            {
              title: "失敗しにくくするポイント",
              items: [
                `${pair.source} から ${pair.target} へ変換しても、元画像で失われた情報が戻るわけではありません。`,
                "提出先やアップロード先に指定形式がある場合は、先にその条件を見てから変換すると無駄がありません。",
                "変換後もファイルが重いと感じる場合は、圧縮やリサイズを組み合わせると扱いやすくなります。",
                "文字が多い画像、透明背景付きの画像、写真では、形式ごとに見え方やサイズ差が出やすいので一度確認しておくと安心です。",
              ],
            },
          ],
          comparisonTitle: `${pair.source} と ${pair.target} の考え方`,
          comparisonItems: [
            {
              label: "向いている用途",
              value: `${pair.target} が扱いやすいのは、変換後の共有先や作業先がその形式と相性のいい場面です。`,
            },
            {
              label: "サイズと見た目",
              value:
                "形式ごとに、軽さ、見た目の安定感、透明背景への対応、再編集しやすさが少しずつ違います。",
            },
            {
              label: "判断の軸",
              value:
                "何となく変換するより、このあと何に使うのかを先に決めておくと失敗しにくくなります。",
            },
            {
              label: "次の作業",
              value:
                relatedTools.length > 0
                  ? `変換のあとに ${relatedTools
                      .slice(0, 2)
                      .map((tool) => tool.name)
                      .join(" や ")} を続けて使う流れもよくあります。`
                  : "変換のあとに、圧縮やリサイズで仕上げると扱いやすくなることがあります。",
            },
          ],
          relatedToolsTitle,
        }
      : {
          contentSections: [
            {
              title: `When ${title} makes sense`,
              paragraphs: [
                `${title} is useful when the current format gets in the way of sharing, uploading, editing, or compatibility.`,
                "Most people convert because the next step matters more than the current file format. The real goal is usually to make the file easier to send, publish, or keep working with.",
              ],
            },
            {
              title: "What to decide before converting",
              paragraphs: [
                "The main question is whether you care most about file size, compatibility, transparency, or an editing-friendly workflow.",
                "A safe pattern is to keep the original file untouched, export a working copy, and only optimize that copy if the next step actually calls for it.",
              ],
            },
          ],
          listSections: [
            {
              title: "Practical reminders",
              items: [
                `Converting from ${pair.source} to ${pair.target} does not restore detail that is already missing in the source file.`,
                "If a site, client, or upload form asks for a specific format, check that requirement before exporting.",
                "If file size still matters after conversion, compression or resizing is often the next useful step.",
                "Text-heavy graphics, transparent assets, and photos can behave very differently depending on the target format.",
              ],
            },
          ],
          comparisonTitle: `${pair.source} vs ${pair.target}`,
          comparisonItems: [
            {
              label: "Why convert",
              value:
                "A conversion usually makes sense when the target format matches the next app, site, or workflow more naturally.",
            },
            {
              label: "Tradeoff",
              value:
                "Most format choices come down to tradeoffs between compatibility, compression, transparency, and editing behavior.",
            },
            {
              label: "Best mindset",
              value:
                "Start with the destination. Once you know where the file needs to end up, the right format is usually easier to pick.",
            },
            {
              label: "Next step",
              value:
                relatedTools.length > 0
                  ? `After converting, people often continue with ${relatedTools
                      .slice(0, 2)
                      .map((tool) => tool.name)
                      .join(" or ")}.`
                  : "After converting, the next step is often compression, resizing, or preparing a final delivery copy.",
            },
          ],
          relatedToolsTitle,
        };
  }

  if (category === "pdf") {
    return locale === "ja"
      ? {
          contentSections: [
            {
              title: `${title}が役立つ場面`,
              paragraphs: [
                `${title}は、PDF を提出前に整えたいとき、共有しやすい形に直したいとき、必要なページだけを取り出したいときなどに便利です。`,
                "デスクトップソフトを開くほどではない、でも今すぐ少し整えたい、そんな場面で使いやすい PDF 作業を想定しています。",
              ],
            },
            {
              title: "PDF作業で迷いにくくする考え方",
              paragraphs: [
                "先に確認したいのは、最終的に PDF のまま使うのか、画像に変換したいのか、ページ構成を整えたいのかという目的です。",
                "ページ順や不要ページの整理を先に済ませてから、変換や圧縮を行うと、やり直しが少なくなります。",
              ],
            },
          ],
          listSections: [
            {
              title: "始める前のチェック",
              items: [
                "ページ順、向き、不要ページの有無を先に確認しておくと流れがスムーズです。",
                "提出先が PDF を求めているのか、画像化したファイルを求めているのかを先に見ておくと判断しやすくなります。",
                "複数工程になる場合は、結合や整理を先に済ませ、そのあとに変換や圧縮へ進むのが基本です。",
                "大きい PDF では、最終結果を一度見てから共有すると安心です。",
              ],
            },
          ],
          comparisonTitle: "このPDF作業の考え方",
          comparisonItems: [
            {
              label: "向いている用途",
              value:
                "提出前の調整、社内共有、資料整理、ページ単位の編集など、日常的な PDF 作業に向いています。",
            },
            {
              label: "作業の順番",
              value:
                "ページ構成を整える作業と、形式を変える作業は分けて考えると失敗しにくくなります。",
            },
            {
              label: "関連する処理",
              value:
                relatedTools.length > 0
                  ? `${relatedTools
                      .slice(0, 3)
                      .map((tool) => tool.name)
                      .join("、")} などと組み合わせる流れが自然です。`
                  : "結合、分割、圧縮、画像変換を順番に使う流れになることが多いです。",
            },
            {
              label: "進め方のコツ",
              value:
                "まず内容と順番を整え、そのあとに変換や軽量化を行うと、最終確認がしやすくなります。",
            },
          ],
          relatedToolsTitle,
        }
      : {
          contentSections: [
            {
              title: `What ${title} is good for`,
              paragraphs: [
                `${title} is useful when you need to clean up a PDF, prepare it for sharing, extract part of it, or turn it into a format that fits the next task better.`,
                "It is meant for everyday document work, not for heavy publishing workflows. Think of it as the quick step between receiving a PDF and sending the finished version on.",
              ],
            },
            {
              title: "A better way to think about PDF tasks",
              paragraphs: [
                "Start by deciding whether the final result should stay a PDF, become images, or simply be a cleaner and smaller version of the same document.",
                "That one decision usually tells you whether to merge, split, remove pages, convert, or compress first.",
              ],
            },
          ],
          listSections: [
            {
              title: "Quick checklist",
              items: [
                "Review page order and orientation before exporting anything.",
                "Know whether the destination expects a PDF, an image set, or a lighter optimized copy.",
                "If the workflow has multiple steps, cleanup usually comes before conversion.",
                "For large files, review the output once before sharing it.",
              ],
            },
          ],
          comparisonTitle: "How this PDF step fits the workflow",
          comparisonItems: [
            {
              label: "Best use case",
              value:
                "This kind of tool works best for everyday document cleanup, page preparation, and sharing workflows.",
            },
            {
              label: "Workflow fit",
              value:
                "Think first about whether the file should remain a PDF or become something else. That usually narrows the right tool quickly.",
            },
            {
              label: "Related tasks",
              value:
                relatedTools.length > 0
                  ? `People often continue with ${relatedTools
                      .slice(0, 3)
                      .map((tool) => tool.name)
                      .join(", ")} after this step.`
                  : "PDF tasks often work best as a sequence: organize first, convert or compress later.",
            },
            {
              label: "Practical approach",
              value:
                "Fix structure first, then optimize or convert only after the document is already in the right order.",
            },
          ],
          relatedToolsTitle,
        };
  }

  return locale === "ja"
    ? {
        contentSections: [
          {
            title: `${title}の使いどころ`,
            paragraphs: [
              `${title}は、画像を整える途中で役立つ編集系ツールです。見た目を整えたいとき、掲載先に合わせたいとき、あとから使いやすい形にしたいときに向いています。`,
              "画像編集では一つひとつの処理は小さく見えても、順番次第で仕上がりが変わります。どこで使うかを意識すると、この手のツールはかなり便利です。",
            ],
          },
          {
            title: "編集系ツールを使うときの考え方",
            paragraphs: [
              "まず見た目を整え、そのあとにサイズや形式を最終調整する流れにすると失敗が少なくなります。",
              "元画像は残したまま、公開用や提出用のコピーを作る形にすると、あとからやり直しやすくなります。",
            ],
          },
        ],
        listSections: [
          {
            title: "作業前のヒント",
            items: [
              "掲載先や提出先にサイズ制限があるなら、先にその条件を確認しておくと効率的です。",
              "複数の処理を行う場合は、見た目の調整を先に、圧縮や形式変換を後に回すと分かりやすいです。",
              "元画像は別に残しておくと、あとで別用途に流用しやすくなります。",
              "Web掲載する画像なら、PCとスマホの両方で見え方を確認すると安心です。",
            ],
          },
        ],
        comparisonTitle: "このツールがはまる場面",
        comparisonItems: [
          {
            label: "向いている用途",
            value:
              "掲載前の微調整、社内資料づくり、共有用の画像整備、見た目の下準備などに向いています。",
          },
          {
            label: "次の流れ",
            value:
              relatedTools.length > 0
                ? `このあとに ${relatedTools
                    .slice(0, 2)
                    .map((tool) => tool.name)
                    .join(" や ")} を続ける流れもよくあります。`
                : "編集のあとに、圧縮やリサイズ、形式変換で仕上げる流れが自然です。",
          },
          {
            label: "気をつけたい点",
            value:
              "編集内容によっては元に戻しにくいので、元画像はそのまま残しておくのがおすすめです。",
          },
          {
            label: "おすすめの進め方",
            value:
              "最終的にどこで使う画像なのかを先に決めて、必要な処理だけを加えると無駄が少なくなります。",
          },
        ],
        relatedToolsTitle,
      }
    : {
        contentSections: [
          {
            title: `Where ${title} fits best`,
            paragraphs: [
              `${title} is part of the image-preparation stage. It is most useful when you need to adjust how an image looks or behaves before publishing, sharing, or continuing with another step.`,
              "These small edits matter more than they look. A quick resize, crop, or cleanup step often makes the final file much easier to use.",
            ],
          },
          {
            title: "A simple editing workflow",
            paragraphs: [
              "It usually helps to make visual changes first and worry about final file size or format afterward.",
              "Keeping the original untouched and working from copies gives you a safer workflow when you are preparing multiple versions.",
            ],
          },
        ],
        listSections: [
          {
            title: "Helpful reminders",
            items: [
              "Check whether the destination has dimension or file-size limits before you start.",
              "If you plan to do more than one edit, visual cleanup usually comes before compression or format conversion.",
              "Keep the original image untouched so you can reuse it later.",
              "Review the final result on the type of screen where people will actually see it.",
            ],
          },
        ],
        comparisonTitle: "How this tool fits the workflow",
        comparisonItems: [
          {
            label: "Best use case",
            value:
              "This tool is most useful during image preparation, especially before publishing, sharing, or packaging a final version.",
          },
          {
            label: "Typical next step",
            value:
              relatedTools.length > 0
                ? `After this step, users often continue with ${relatedTools
                    .slice(0, 2)
                    .map((tool) => tool.name)
                    .join(" or ")}.`
                : "After editing, the next step is often compression, resizing, or exporting a final delivery format.",
          },
          {
            label: "Main caution",
            value:
              "Some edits are hard to undo, so keeping the original image separately is still the safest option.",
          },
          {
            label: "Recommended approach",
            value:
              "Start with the final destination in mind, make only the edits you need, and optimize the finished copy last.",
          },
        ],
        relatedToolsTitle,
      };
}

function isJapanese(text: string) {
  return /[ぁ-んァ-ン一-龠]/.test(text);
}

function detectCategory(title: string) {
  const normalized = title.toLowerCase();

  if (normalized.includes("pdf") || title.includes("PDF")) {
    return "pdf";
  }

  if (normalized.includes(" to ") || (title.includes("を") && title.includes("に変換"))) {
    return "conversion";
  }

  return "editing";
}

function parseConversionPair(title: string, locale: "ja" | "en") {
  if (locale === "en") {
    const [source = "source", target = "target"] = title
      .replace(/ converter$/i, "")
      .split(/\s+to\s+/i);
    return { source: source.trim(), target: target.trim() };
  }

  const match = title.match(/^(.+?)を(.+?)に変換/);
  if (match) {
    return {
      source: match[1].trim(),
      target: match[2].trim(),
    };
  }

  return { source: "元形式", target: "変換先" };
}
