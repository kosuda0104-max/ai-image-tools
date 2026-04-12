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
  description,
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
              title: `${title}が役立つ場面`,
              paragraphs: [
                `${title}は、${description.replace(/。$/, "")}用途に向いた基本ツールです。共有、保存、編集、アップロードなどの実務フローで、形式の違いによる不便を減らしたいときに役立ちます。`,
                `元の形式のままでは扱いにくい環境でも、目的に合った形式へ変換しておくことで、その後の作業や受け渡しがスムーズになります。`,
              ],
            },
            {
              title: "変換前に確認したいポイント",
              paragraphs: [
                "どの形式が向いているかは、軽さを優先するのか、互換性を優先するのか、再編集しやすさを優先するのかで変わります。",
                "元ファイルを残したまま変換後ファイルを用途別に使い分けると、後から作業しやすくなります。",
              ],
            },
          ],
          listSections: [
            {
              title: "失敗しにくくするコツ",
              items: [
                `${pair.source} から ${pair.target} へ変換しても、元画像で失われた情報が自動で戻るわけではありません。`,
                "提出先や共有先の推奨形式がある場合は、先に確認してから変換するとやり直しを減らせます。",
                "公開用にさらに軽量化したい場合は、変換後に圧縮やリサイズも組み合わせると効果的です。",
                "文字や図版を含む画像では、形式によって見え方が変わることがあるため、ダウンロード前に確認すると安心です。",
              ],
            },
          ],
          comparisonTitle: `${pair.source} と ${pair.target} の考え方`,
          comparisonItems: [
            {
              label: "互換性",
              value: `${pair.target} のほうが利用環境に合う場面では、変換することで共有や提出がしやすくなります。`,
            },
            {
              label: "画質と容量",
              value: "形式ごとに画質の保ちやすさやファイルサイズの傾向が異なります。用途に応じて使い分けるのが基本です。",
            },
            {
              label: "向いている用途",
              value: `${pair.target} を求められる作業、より扱いやすい保存形式が必要な場面、次の編集工程へ渡したいケースで有効です。`,
            },
            {
              label: "次の一手",
              value:
                relatedTools.length > 0
                  ? `変換後に ${relatedTools
                      .slice(0, 2)
                      .map((tool) => tool.name)
                      .join(" や ")} を使うと作業を続けやすくなります。`
                  : "変換後は圧縮、リサイズ、共有用の書き出しまで考えると運用しやすくなります。",
            },
          ],
          relatedToolsTitle,
        }
      : {
          contentSections: [
            {
              title: `When this ${title} tool is useful`,
              paragraphs: [
                `${title} is a practical format-conversion step when you need better compatibility, easier sharing, smoother uploads, or a format that fits the next editing workflow more naturally.`,
                "In many real-world cases, the goal is not conversion for its own sake but making the file easier to send, publish, store, or continue working with.",
              ],
            },
            {
              title: "What to think about before converting",
              paragraphs: [
                "The right output format depends on whether your priority is smaller file size, broader compatibility, transparency support, or edit-friendly behavior.",
                "A reliable workflow is to keep the original file, convert a working copy for the current task, and then optimize further only if needed.",
              ],
            },
          ],
          listSections: [
            {
              title: "Tips for better results",
              items: [
                `Converting from ${pair.source} to ${pair.target} does not magically recover detail already missing in the source file.`,
                "If a website, client, or upload form asks for a specific format, check that requirement before exporting.",
                "If file size still matters after conversion, compression or resizing is often the next useful step.",
                "Graphics with text, transparency, or sharp edges may behave differently depending on the format you choose.",
              ],
            },
          ],
          comparisonTitle: `${pair.source} vs ${pair.target}`,
          comparisonItems: [
            {
              label: "Compatibility",
              value:
                "A conversion usually makes sense when the target format fits more of the apps, services, or workflows you need to use next.",
            },
            {
              label: "Quality and size",
              value:
                "Different formats make different tradeoffs between image stability, compression, transparency, and file size.",
            },
            {
              label: "Best use case",
              value: `${pair.target} is usually the better choice when it matches the destination platform, sharing method, or editing workflow more closely.`,
            },
            {
              label: "Next step",
              value:
                relatedTools.length > 0
                  ? `After converting, users often continue with ${relatedTools
                      .slice(0, 2)
                      .map((tool) => tool.name)
                      .join(" or ")}.`
                  : "After converting, it often helps to compress, resize, or prepare a final sharing version.",
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
              title: `${title}の用途`,
              paragraphs: [
                `${title}は、PDF作業をもっと扱いやすくするための基本ツールです。資料整理、提出前の調整、ページ抽出、画像化、結合など、日常業務で発生しやすいPDF作業に向いています。`,
                "ブラウザだけで作業できるため、急ぎの修正や簡単な整形をしたいときにも使いやすいのが特徴です。",
              ],
            },
            {
              title: "PDF作業でよくある使い方",
              paragraphs: [
                "複数ファイルをまとめたい、不要ページを外したい、画像として書き出したい、ページ向きを整えたいなど、目的ごとにツールを使い分けると効率的です。",
                "完成したPDFをそのまま渡すのか、画像化して共有するのかでも最適な作業が変わります。",
              ],
            },
          ],
          listSections: [
            {
              title: "作業前のチェックポイント",
              items: [
                "ページ順、向き、不要ページの有無を最初に確認すると手戻りを減らせます。",
                "共有先が PDF をそのまま受け付けるのか、画像や軽量版が必要なのかで次のツールが変わります。",
                "複数工程が必要な場合は、結合・削除・変換の順で進めると整理しやすいです。",
                "大きなファイルでは処理後の見た目やページ順をダウンロード前に確認すると安心です。",
              ],
            },
          ],
          comparisonTitle: "このPDFツールの考え方",
          comparisonItems: [
            {
              label: "向いている場面",
              value: "資料整理、提出前の微調整、ページ単位の編集、共有形式の変更に向いています。",
            },
            {
              label: "作業の流れ",
              value: "PDFのまま扱うか、画像化するか、ページ構成を変えるかを決めると次の選択がしやすくなります。",
            },
            {
              label: "関連作業",
              value:
                relatedTools.length > 0
                  ? `${relatedTools
                      .slice(0, 3)
                      .map((tool) => tool.name)
                      .join("、")} などと組み合わせると一連の作業を進めやすくなります。`
                  : "結合、分割、変換、圧縮を順番に使い分けると実務に乗せやすくなります。",
            },
            {
              label: "おすすめの使い方",
              value: "最終提出前にページ構成や向きを見直し、その後に必要なら軽量化や画像変換へ進むのがおすすめです。",
            },
          ],
          relatedToolsTitle,
        }
      : {
          contentSections: [
            {
              title: `What this PDF tool is good for`,
              paragraphs: [
                `${title} is meant to make common PDF tasks easier, such as cleaning up pages, preparing files for sharing, converting documents, or reorganizing multi-page materials.`,
                "It is most useful when you need a quick browser-based workflow instead of opening a heavier desktop app for a simple adjustment.",
              ],
            },
            {
              title: "Typical PDF workflows",
              paragraphs: [
                "People often need to merge files, remove pages, rotate documents, extract image versions, or prepare a lighter file before sending it.",
                "The best next step depends on whether the final destination expects a PDF, an image, or a more compact version of the document.",
              ],
            },
          ],
          listSections: [
            {
              title: "Checklist before you start",
              items: [
                "Check page order, orientation, and whether any pages should be removed before exporting.",
                "Know whether the destination wants a PDF, an image, or a smaller optimized file.",
                "If you need multiple steps, merging or cleanup usually comes before format conversion.",
                "For large files, review the final output before sharing it.",
              ],
            },
          ],
          comparisonTitle: "How to think about this PDF task",
          comparisonItems: [
            {
              label: "Best use case",
              value:
                "This type of tool is most useful for everyday document preparation, sharing, and cleanup workflows.",
            },
            {
              label: "Workflow fit",
              value:
                "Decide first whether you need to keep the file as a PDF, convert it to images, or reorganize the pages.",
            },
            {
              label: "Related tasks",
              value:
                relatedTools.length > 0
                  ? `Users often continue with ${relatedTools
                      .slice(0, 3)
                      .map((tool) => tool.name)
                      .join(", ")} after this step.`
                  : "PDF cleanup, compression, and conversion often work best as a sequence rather than a single isolated step.",
            },
            {
              label: "Practical approach",
              value:
                "Review structure first, then convert or optimize only after the document content and page order are correct.",
            },
          ],
          relatedToolsTitle,
        };
  }

  return locale === "ja"
    ? {
        contentSections: [
          {
            title: `${title}の活用シーン`,
            paragraphs: [
              `${title}は、画像を目的に合わせて整えるための基本ツールです。資料作成、Web掲載、SNS投稿、社内共有、画像整理など、見た目やサイズを調整したい場面で役立ちます。`,
              "作業前に完成イメージを決めておくと、圧縮、リサイズ、切り抜き、回転などの次の工程も選びやすくなります。",
            ],
          },
          {
            title: "画像加工ツールの考え方",
            paragraphs: [
              "どの処理を先に行うかで結果が変わることがあります。一般的には、切り抜きや回転で見た目を整えたあと、必要に応じて圧縮や形式変換を行うと管理しやすいです。",
              "元画像を保存しつつ、公開用・共有用・編集用で別ファイルを作ると後から困りにくくなります。",
            ],
          },
        ],
        listSections: [
          {
            title: "使う前のヒント",
            items: [
              "最終的な掲載先や提出先のサイズ条件を先に確認すると効率的です。",
              "複数の加工を行う場合は、見た目の調整を先に、軽量化や形式変換を後にすると扱いやすいです。",
              "元画像を別で保管しておくと、やり直しや別用途への展開がしやすくなります。",
              "仕上がりはスマホとPCの両方で見え方を確認すると安心です。",
            ],
          },
        ],
        comparisonTitle: "このツールの使いどころ",
        comparisonItems: [
          {
            label: "向いている用途",
            value: "見た目調整、資料化、Web掲載前の整形、共有用画像の準備に向いています。",
          },
          {
            label: "前後の工程",
            value:
              relatedTools.length > 0
                ? `${relatedTools
                    .slice(0, 2)
                    .map((tool) => tool.name)
                    .join(" や ")} と組み合わせると一連の作業を進めやすくなります。`
                : "加工後に圧縮や形式変換を行うと、運用しやすい最終ファイルに近づけやすくなります。",
          },
          {
            label: "注意点",
            value:
              "加工内容によっては元に戻しにくいことがあるため、オリジナルを残したまま作業するのがおすすめです。",
          },
          {
            label: "おすすめ運用",
            value:
              "作業目的を決めてから必要な編集だけを行い、最後に配信用の形式やサイズへ整えると効率的です。",
          },
        ],
        relatedToolsTitle,
      }
    : {
        contentSections: [
          {
            title: `When this ${title} tool is helpful`,
            paragraphs: [
              `${title} helps when you need to adjust how an image looks, behaves, or fits into the next part of your workflow.`,
              "It is useful for publishing, presentation prep, sharing, asset cleanup, and day-to-day image handling tasks.",
            ],
          },
          {
            title: "How to think about image editing steps",
            paragraphs: [
              "The order of your edits matters. Many workflows work better when visual cleanup comes first and file-size optimization comes later.",
              "Keeping the original file and exporting a task-specific copy usually gives you a safer and more flexible workflow.",
            ],
          },
        ],
        listSections: [
          {
            title: "Helpful tips before you start",
            items: [
              "Check whether the destination platform has file-size or dimension limits.",
              "If you plan to do multiple edits, visual adjustments often come before compression or format conversion.",
              "Keep the original image untouched so you can reuse it later.",
              "Review the result on both desktop and mobile if the image will be published online.",
            ],
          },
        ],
        comparisonTitle: "Where this tool fits in the workflow",
        comparisonItems: [
          {
            label: "Best use case",
            value:
              "This tool is most useful when you need to prepare an image for publishing, sharing, presentation, or follow-up editing.",
          },
          {
            label: "Typical next step",
            value:
              relatedTools.length > 0
                ? `After this step, users often continue with ${relatedTools
                    .slice(0, 2)
                    .map((tool) => tool.name)
                    .join(" or ")}.`
                : "After editing, the next step is often compression, resizing, or a final format conversion.",
          },
          {
            label: "Main caution",
            value:
              "Some image edits are hard to undo, so it is best to keep the original file separately.",
          },
          {
            label: "Recommended workflow",
            value:
              "Decide the final destination first, make only the edits you need, then optimize the file for delivery.",
          },
        ],
        relatedToolsTitle,
      };
}

function isJapanese(text: string) {
  return /[ぁ-んァ-ン一-龯]/.test(text);
}

function detectCategory(title: string) {
  const normalized = title.toLowerCase();

  if (
    normalized.includes("pdf") ||
    title.includes("PDF") ||
    title.includes("ＰＤＦ")
  ) {
    return "pdf";
  }

  if (
    normalized.includes(" to ") ||
    title.includes("に変換") ||
    title.includes("を変換")
  ) {
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

  return { source: "元形式", target: "変換先形式" };
}
