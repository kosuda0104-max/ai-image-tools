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

type Locale = "ja" | "en";

/* ----------------------------------------------------------------------------
 * Format knowledge base
 *
 * Each image/document format gets a short, distinct description so that the
 * generated SEO content differs meaningfully from one tool to another instead
 * of repeating the same category boilerplate. This is what keeps, say,
 * avif-to-jpg, bmp-to-jpg and svg-to-png from reading like duplicate pages.
 * -------------------------------------------------------------------------- */
type FormatProfile = {
  label: string;
  strength: string;
  caveat: string;
  bestFor: string;
};

const formatProfiles: Record<string, { ja: FormatProfile; en: FormatProfile }> = {
  jpg: {
    ja: {
      label: "JPG",
      strength: "写真の保存に向き、ほぼあらゆる環境で開ける互換性の高い形式",
      caveat: "保存のたびに少しずつ劣化し、透明背景は扱えません",
      bestFor: "写真の共有、メール添付、フォーム提出",
    },
    en: {
      label: "JPG",
      strength: "a widely supported format that is great for photos and opens almost anywhere",
      caveat: "it uses lossy compression and cannot store transparency",
      bestFor: "sharing photos, email attachments, and form uploads",
    },
  },
  png: {
    ja: {
      label: "PNG",
      strength: "透明背景と劣化のない保存に対応し、文字や図版がくっきり残る形式",
      caveat: "写真ではファイルサイズが大きくなりがちです",
      bestFor: "スクリーンショット、ロゴ、図版、再編集用の素材",
    },
    en: {
      label: "PNG",
      strength: "a lossless format that keeps text and graphics sharp and supports transparency",
      caveat: "photos often become large as PNG files",
      bestFor: "screenshots, logos, diagrams, and editable assets",
    },
  },
  webp: {
    ja: {
      label: "WebP",
      strength: "Web 表示向けに軽く、透明背景にも対応する新しめの形式",
      caveat: "一部の古いソフトや業務ツールでは扱いにくいことがあります",
      bestFor: "サイト掲載、表示速度の最適化、軽量な配信",
    },
    en: {
      label: "WebP",
      strength: "a modern format that stays light for the web and supports transparency",
      caveat: "some older software and business tools still handle it poorly",
      bestFor: "website images, page-speed optimization, and lightweight delivery",
    },
  },
  heic: {
    ja: {
      label: "HEIC",
      strength: "iPhone で使われる高効率な形式で、容量を抑えつつ高画質を保てる",
      caveat: "Windows や一部のツールではそのまま開けないことがあります",
      bestFor: "iPhone 写真の保管、Apple 環境での利用",
    },
    en: {
      label: "HEIC",
      strength: "the efficient format iPhones use to keep high quality at a small size",
      caveat: "Windows and some tools cannot open it without conversion",
      bestFor: "storing iPhone photos and Apple-centric workflows",
    },
  },
  avif: {
    ja: {
      label: "AVIF",
      strength: "圧縮効率が高く、同じ画質でもファイルを小さくしやすい新しい形式",
      caveat: "対応していない環境や編集ソフトがまだ残っています",
      bestFor: "最新ブラウザ向けの軽量配信",
    },
    en: {
      label: "AVIF",
      strength: "a newer format with strong compression that keeps files small at the same quality",
      caveat: "some environments and editors still do not support it",
      bestFor: "lightweight delivery to modern browsers",
    },
  },
  gif: {
    ja: {
      label: "GIF",
      strength: "簡単なアニメーションや軽いイラストでよく使われる形式",
      caveat: "色数が限られるため写真の保存には向きません",
      bestFor: "短いアニメーション、シンプルなイラスト",
    },
    en: {
      label: "GIF",
      strength: "a format commonly used for simple animations and light graphics",
      caveat: "it has a limited color range and is poor for photos",
      bestFor: "short animations and simple graphics",
    },
  },
  svg: {
    ja: {
      label: "SVG",
      strength: "拡大しても劣化しないベクター形式で、ロゴやアイコンに最適",
      caveat: "写真のような複雑な画像には向きません",
      bestFor: "ロゴ、アイコン、図形、レスポンシブな素材",
    },
    en: {
      label: "SVG",
      strength: "a vector format that stays crisp at any size, ideal for logos and icons",
      caveat: "it is not suited to photographic or highly detailed images",
      bestFor: "logos, icons, shapes, and responsive assets",
    },
  },
  bmp: {
    ja: {
      label: "BMP",
      strength: "無圧縮で画質をそのまま保持する形式",
      caveat: "ファイルサイズが非常に大きく、共有や掲載には不向きです",
      bestFor: "一時的な編集や無劣化の中間データ",
    },
    en: {
      label: "BMP",
      strength: "an uncompressed format that preserves image data exactly",
      caveat: "files are very large and impractical for sharing or web use",
      bestFor: "temporary editing or lossless intermediate data",
    },
  },
  tiff: {
    ja: {
      label: "TIFF",
      strength: "印刷やスキャンの現場で使われる高品質な形式",
      caveat: "Web 表示や共有には重すぎることがあります",
      bestFor: "印刷入稿、スキャン保存、高品質アーカイブ",
    },
    en: {
      label: "TIFF",
      strength: "a high-quality format used in print and scanning workflows",
      caveat: "it is often too heavy for web display or quick sharing",
      bestFor: "print delivery, scan archives, and high-quality storage",
    },
  },
  ico: {
    ja: {
      label: "ICO",
      strength: "アプリアイコンやファビコンで使われる形式",
      caveat: "通常の画像表示や共有用途には向きません",
      bestFor: "ファビコン、デスクトップアイコン",
    },
    en: {
      label: "ICO",
      strength: "the format used for app icons and website favicons",
      caveat: "it is not meant for normal image viewing or sharing",
      bestFor: "favicons and desktop icons",
    },
  },
  pdf: {
    ja: {
      label: "PDF",
      strength: "レイアウトを保ったまま配布できる文書形式",
      caveat: "ページを画像として使うには変換が必要です",
      bestFor: "資料配布、提出、印刷前のまとめ",
    },
    en: {
      label: "PDF",
      strength: "a document format that preserves layout for reliable sharing",
      caveat: "you need to convert it to use individual pages as images",
      bestFor: "distributing documents, submissions, and print prep",
    },
  },
};

const genericFormatProfile: Record<Locale, FormatProfile> = {
  ja: {
    label: "この形式",
    strength: "用途に合わせて扱いやすい形式",
    caveat: "使う場面によっては別形式のほうが向くこともあります",
    bestFor: "共有、編集、保管などの一般的な用途",
  },
  en: {
    label: "this format",
    strength: "a format that works for common needs",
    caveat: "another format may fit better depending on the use case",
    bestFor: "sharing, editing, and storage",
  },
};

function getFormatProfile(name: string, locale: Locale): FormatProfile {
  const key = name.trim().toLowerCase().replace("jpeg", "jpg");
  const entry = formatProfiles[key];
  return entry ? entry[locale] : genericFormatProfile[locale];
}

/* ----------------------------------------------------------------------------
 * Conversion content
 * -------------------------------------------------------------------------- */
function buildConversionContent(
  title: string,
  locale: Locale,
  relatedTools: RelatedToolItem[],
): SeoFallbackContent {
  const pair = parseConversionPair(title, locale);
  const src = getFormatProfile(pair.source, locale);
  const dst = getFormatProfile(pair.target, locale);
  const relatedToolsTitle =
    locale === "ja"
      ? "あわせて使いやすい関連ツール"
      : "Related tools for the next step";

  if (locale === "ja") {
    return {
      contentSections: [
        {
          title: `${title}が向いている場面`,
          paragraphs: [
            `${src.label}は${src.strength}ですが、${src.caveat}。一方で${dst.label}は${dst.strength}で、${dst.bestFor}に向いています。${title}は、この違いを活かして次の作業に進みやすくしたいときに役立ちます。`,
            `変換そのものが目的というより、${dst.bestFor}を見据えて形式をそろえる一手として考えると選びやすくなります。`,
          ],
        },
        {
          title: "変換前に決めておくと迷いにくいこと",
          paragraphs: [
            `${src.label}のまま使い続けると${src.caveat}という点が気になる場面では、早めに${dst.label}へ寄せておくと扱いやすくなります。`,
            "元ファイルはそのまま残し、用途に合わせたコピーだけを変換しておくと、あとからやり直しやすくなります。",
          ],
        },
      ],
      listSections: [
        {
          title: "失敗しにくくするポイント",
          items: [
            `${src.label}から${dst.label}へ変換しても、元画像で失われた情報が戻るわけではありません。`,
            `${dst.label}は${dst.bestFor}に向く一方で、${dst.caveat}点には注意してください。`,
            "提出先やアップロード先に指定形式がある場合は、先に条件を確認してから変換すると無駄がありません。",
            "変換後もファイルが重いと感じる場合は、圧縮やリサイズを組み合わせると扱いやすくなります。",
          ],
        },
      ],
      comparisonTitle: `${src.label} と ${dst.label} の違い`,
      comparisonItems: [
        { label: `${src.label}の特徴`, value: `${src.strength}。ただし${src.caveat}。` },
        { label: `${dst.label}の特徴`, value: `${dst.strength}。ただし${dst.caveat}。` },
        { label: "向いている用途", value: `${dst.label}は${dst.bestFor}で特に扱いやすくなります。` },
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
    };
  }

  return {
    contentSections: [
      {
        title: `When ${title} makes sense`,
        paragraphs: [
          `${src.label} is ${src.strength}, but ${src.caveat}. ${dst.label}, on the other hand, is ${dst.strength}, which makes it a better fit for ${dst.bestFor}. ${title} helps you move from one to the other when that difference matters.`,
          `The goal is usually less about the conversion itself and more about lining the format up with ${dst.bestFor}.`,
        ],
      },
      {
        title: "What to decide before converting",
        paragraphs: [
          `If staying on ${src.label} is a problem because ${src.caveat}, moving to ${dst.label} early tends to make the rest of the work smoother.`,
          "Keep the original file untouched, export a working copy, and only optimize that copy if the next step calls for it.",
        ],
      },
    ],
    listSections: [
      {
        title: "Practical reminders",
        items: [
          `Converting from ${src.label} to ${dst.label} does not restore detail that is already missing in the source file.`,
          `${dst.label} is great for ${dst.bestFor}, but remember that ${dst.caveat}.`,
          "If a site, client, or upload form asks for a specific format, check that requirement before exporting.",
          "If file size still matters after conversion, compression or resizing is often the next useful step.",
        ],
      },
    ],
    comparisonTitle: `${src.label} vs ${dst.label}`,
    comparisonItems: [
      { label: `${src.label}`, value: `${capitalize(src.strength)}. However, ${src.caveat}.` },
      { label: `${dst.label}`, value: `${capitalize(dst.strength)}. However, ${dst.caveat}.` },
      { label: "Best for", value: `${dst.label} is easiest to work with for ${dst.bestFor}.` },
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

/* ----------------------------------------------------------------------------
 * Editing content (operation-aware)
 * -------------------------------------------------------------------------- */
type OperationProfile = {
  ja: { what: string; why: string; tip: string };
  en: { what: string; why: string; tip: string };
};

const editingOperations: { match: (t: string) => boolean; profile: OperationProfile }[] = [
  {
    match: (t) => t.includes("crop") || t.includes("切り抜き") || t.includes("トリミング"),
    profile: {
      ja: {
        what: "画像の必要な部分だけを残し、余白や写したくない範囲を取り除く操作です",
        why: "サムネイルや SNS 投稿、資料用に、見せたい範囲へ視線を集めたいときに役立ちます",
        tip: "縦横比が指定された掲載先に合わせるなら、切り抜き時に比率を決めておくと崩れません",
      },
      en: {
        what: "keeps only the part of the image you need and trims away margins or unwanted areas",
        why: "it helps focus attention for thumbnails, social posts, and documents",
        tip: "if the destination has a fixed aspect ratio, set it while cropping so nothing gets distorted",
      },
    },
  },
  {
    match: (t) => t.includes("resize") || t.includes("リサイズ"),
    profile: {
      ja: {
        what: "画像の幅や高さを用途に合わせて変える操作です",
        why: "表示サイズより大きすぎる画像を必要なサイズへ寄せるだけで、見た目を保ちつつ軽くできます",
        tip: "縦横比を保って縮小すると、人物や商品が不自然に伸びるのを防げます",
      },
      en: {
        what: "changes the width and height of an image to fit its destination",
        why: "shrinking an oversized image toward its real display size keeps it sharp while reducing weight",
        tip: "keep the aspect ratio locked so people and products do not look stretched",
      },
    },
  },
  {
    match: (t) => t.includes("rotate") || t.includes("回転"),
    profile: {
      ja: {
        what: "向きがずれた画像を正しい向きに回す操作です",
        why: "スマホやスキャンで横倒しになった画像を、見やすい向きへ直したいときに使います",
        tip: "回転後はプレビューで上下や左右の向きを確認してから保存すると安心です",
      },
      en: {
        what: "turns a misoriented image to the correct angle",
        why: "it fixes photos or scans that came out sideways or upside down",
        tip: "check the preview orientation before saving so the result is exactly right",
      },
    },
  },
  {
    match: (t) => t.includes("flip") || t.includes("反転"),
    profile: {
      ja: {
        what: "画像を左右または上下に反転させる操作です",
        why: "鏡像にしたいとき、向きをそろえたいとき、デザインの調整をしたいときに使えます",
        tip: "文字やロゴが入った画像を反転すると読めなくなるので、対象を確認してから行いましょう",
      },
      en: {
        what: "mirrors an image horizontally or vertically",
        why: "useful for creating a mirror image, matching orientation, or design tweaks",
        tip: "flipping an image with text or a logo can make it unreadable, so check the subject first",
      },
    },
  },
  {
    match: (t) => t.includes("grayscale") || t.includes("白黒") || t.includes("モノクロ"),
    profile: {
      ja: {
        what: "カラー画像を落ち着いたモノクロ表現へ変える操作です",
        why: "資料の統一感を出したいとき、印刷を意識したいとき、雰囲気を整えたいときに向いています",
        tip: "色で意味を伝えているグラフなどは、白黒化すると区別しにくくなる点に注意しましょう",
      },
      en: {
        what: "turns a color image into a calm grayscale version",
        why: "useful for a consistent document look, print-minded output, or a particular mood",
        tip: "charts that rely on color to convey meaning can become hard to read in grayscale",
      },
    },
  },
  {
    match: (t) => t.includes("watermark") || t.includes("透かし"),
    profile: {
      ja: {
        what: "画像に名前や注意書きなどの透かしを重ねて保存する操作です",
        why: "無断利用を抑えたいとき、出典を示したいとき、配布前に印を付けたいときに役立ちます",
        tip: "透かしは主役の被写体を隠さない位置と濃さに調整すると見栄えを保てます",
      },
      en: {
        what: "overlays a text watermark or note onto an image",
        why: "useful to discourage misuse, show attribution, or mark a file before sharing",
        tip: "place the watermark where it does not cover the main subject and keep it subtle",
      },
    },
  },
];

function buildEditingContent(
  title: string,
  locale: Locale,
  relatedTools: RelatedToolItem[],
): SeoFallbackContent {
  const lower = title.toLowerCase();
  const op = editingOperations.find((o) => o.match(lower))?.profile;
  const relatedToolsTitle =
    locale === "ja"
      ? "あわせて使いやすい関連ツール"
      : "Related tools for the next step";

  if (op) {
    const p = op[locale];
    if (locale === "ja") {
      return {
        contentSections: [
          {
            title: `${title}の使いどころ`,
            paragraphs: [
              `${title}は、${p.what}。${p.why}。`,
              "画像編集では一つひとつの処理は小さく見えても、順番次第で仕上がりが変わります。最終的にどこで使うのかを意識すると選びやすくなります。",
            ],
          },
          {
            title: "きれいに仕上げるコツ",
            paragraphs: [
              `${p.tip}。`,
              "元画像はそのまま残し、公開用や提出用のコピーを編集する形にすると、あとからやり直しやすくなります。",
            ],
          },
        ],
        listSections: [
          {
            title: "作業前のヒント",
            items: [
              "掲載先や提出先にサイズ制限があるなら、先に条件を確認しておくと効率的です。",
              "複数の処理を行う場合は、見た目の調整を先に、圧縮や形式変換を後に回すと分かりやすいです。",
              "元画像は別に残しておくと、あとで別用途に流用しやすくなります。",
              "Web 掲載する画像なら、PC とスマホの両方で見え方を確認すると安心です。",
            ],
          },
        ],
        comparisonTitle: "このツールがはまる場面",
        comparisonItems: [
          { label: "何をする操作か", value: `${capitalize(p.what)}。` },
          { label: "向いている用途", value: `${capitalize(p.why)}。` },
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
          { label: "気をつけたい点", value: `${capitalize(p.tip)}。` },
        ],
        relatedToolsTitle,
      };
    }

    return {
      contentSections: [
        {
          title: `Where ${title} fits best`,
          paragraphs: [
            `${title} ${p.what}. In practice, ${p.why}.`,
            "These small edits matter more than they look. Knowing where the image will end up makes it easier to choose the right adjustment.",
          ],
        },
        {
          title: "Tips for a clean result",
          paragraphs: [
            `${capitalize(p.tip)}.`,
            "Keep the original untouched and edit a copy meant for publishing or submission so you can redo it later.",
          ],
        },
      ],
      listSections: [
        {
          title: "Helpful reminders",
          items: [
            "Check whether the destination has dimension or file-size limits before you start.",
            "If you plan more than one edit, visual cleanup usually comes before compression or format conversion.",
            "Keep the original image untouched so you can reuse it later.",
            "Review the final result on the type of screen where people will actually see it.",
          ],
        },
      ],
      comparisonTitle: "How this tool fits the workflow",
      comparisonItems: [
        { label: "What it does", value: `It ${p.what}.` },
        { label: "Why it helps", value: `${capitalize(p.why)}.` },
        {
          label: "Typical next step",
          value:
            relatedTools.length > 0
              ? `After this step, users often continue with ${relatedTools
                  .slice(0, 2)
                  .map((tool) => tool.name)
                  .join(" or ")}.`
              : "After editing, the next step is often compression, resizing, or exporting a final format.",
        },
        { label: "Good to know", value: `${capitalize(p.tip)}.` },
      ],
      relatedToolsTitle,
    };
  }

  // Generic editing fallback (rare)
  return genericEditing(title, locale, relatedTools, relatedToolsTitle);
}

/* ----------------------------------------------------------------------------
 * PDF content (operation-aware)
 * -------------------------------------------------------------------------- */
const pdfOperations: { match: (t: string) => boolean; profile: OperationProfile }[] = [
  {
    match: (t) => t.includes("merge") || t.includes("結合"),
    profile: {
      ja: {
        what: "複数の PDF を 1 つのファイルにまとめる作業です",
        why: "請求書と補足資料、表紙と本文などを一式にして、受け手が行き来せずに済む形に整えられます",
        tip: "まとめる前にページ順を確認しておくと、提出や共有にそのまま使える形になります",
      },
      en: {
        what: "combines several PDF files into a single document",
        why: "it lets you bundle things like an invoice and its attachments so the reader does not switch files",
        tip: "check the page order before merging so the result is ready to submit or share",
      },
    },
  },
  {
    match: (t) => t.includes("split") || t.includes("分割"),
    profile: {
      ja: {
        what: "1 つの PDF から必要なページだけを取り出す作業です",
        why: "一部ページだけ共有したいとき、章ごとに分けたいときに、全体を崩さず整理できます",
        tip: "渡す相手に必要なページだけを切り出すと、確認の負担を下げられます",
      },
      en: {
        what: "extracts just the pages you need from a single PDF",
        why: "useful when you only want to share part of a document or separate it by section",
        tip: "pull out only the pages the recipient needs to reduce their review effort",
      },
    },
  },
  {
    match: (t) => t.includes("compress") || t.includes("圧縮"),
    profile: {
      ja: {
        what: "PDF のファイルサイズを抑える作業です",
        why: "メール添付やアップロードの容量制限に引っかかるときに、送れる形へ調整できます",
        tip: "圧縮後は文字が読めるか、図版が判別できるかを拡大して確認しておくと安心です",
      },
      en: {
        what: "reduces the file size of a PDF",
        why: "it helps when a document is too large for an email attachment or upload limit",
        tip: "after compressing, zoom in to confirm text and figures are still readable",
      },
    },
  },
  {
    match: (t) => t.includes("remove") || t.includes("削除"),
    profile: {
      ja: {
        what: "PDF から不要なページだけを取り除く作業です",
        why: "余計なページを外して、必要な内容だけに絞った資料を用意したいときに役立ちます",
        tip: "削除前に元ファイルを残しておくと、誤って必要なページを消しても戻せます",
      },
      en: {
        what: "removes the pages you do not need from a PDF",
        why: "useful for trimming a document down to only the content that matters",
        tip: "keep a copy of the original so you can recover a page removed by mistake",
      },
    },
  },
  {
    match: (t) => t.includes("rotate") || t.includes("回転"),
    profile: {
      ja: {
        what: "PDF のページの向きを正しい方向へ直す作業です",
        why: "スキャンや結合で横倒しになったページを、読みやすい向きにそろえられます",
        tip: "全ページか特定ページかを決めてから回転すると、向きの混在を防げます",
      },
      en: {
        what: "fixes the orientation of pages in a PDF",
        why: "it straightens pages that ended up sideways after scanning or merging",
        tip: "decide whether to rotate all pages or specific ones to avoid mixed orientations",
      },
    },
  },
  {
    match: (t) => t.includes("to jpg") || t.includes("to png") || t.includes("to webp") || t.includes("画像"),
    profile: {
      ja: {
        what: "PDF のページを画像として書き出す作業です",
        why: "資料の一部をスライドやブログ、SNS に貼りたいとき、画像にしておくと扱いやすくなります",
        tip: "拡大して読ませるなら高めの画質、軽さ優先なら控えめの画質と、用途で選び分けましょう",
      },
      en: {
        what: "exports PDF pages as image files",
        why: "handy when you want to drop part of a document into slides, a blog, or social media",
        tip: "use higher quality if people will zoom in, and lighter output when size matters most",
      },
    },
  },
];

function buildPdfContent(
  title: string,
  locale: Locale,
  relatedTools: RelatedToolItem[],
): SeoFallbackContent {
  const lower = title.toLowerCase();
  const op = pdfOperations.find((o) => o.match(lower))?.profile;
  const relatedToolsTitle =
    locale === "ja"
      ? "あわせて使いやすい関連ツール"
      : "Related tools for the next step";

  const p = op ? op[locale] : null;

  if (locale === "ja") {
    return {
      contentSections: [
        {
          title: `${title}が役立つ場面`,
          paragraphs: [
            p
              ? `${title}は、${p.what}。${p.why}。`
              : `${title}は、PDF を提出前に整えたいとき、共有しやすい形に直したいときに便利です。`,
            "デスクトップソフトを開くほどではない、でも今すぐ少し整えたい、そんな場面で使いやすい PDF 作業を想定しています。",
          ],
        },
        {
          title: "PDF 作業で迷いにくくする考え方",
          paragraphs: [
            "先に確認したいのは、最終的に PDF のまま使うのか、画像にしたいのか、ページ構成を整えたいのかという目的です。",
            "ページ順や不要ページの整理を先に済ませてから、変換や圧縮を行うと、やり直しが少なくなります。",
          ],
        },
      ],
      listSections: [
        {
          title: "始める前のチェック",
          items: [
            p ? `${capitalize(p.tip)}。` : "ページ順、向き、不要ページの有無を先に確認しておくと流れがスムーズです。",
            "提出先が PDF を求めているのか、画像化したファイルを求めているのかを先に見ておくと判断しやすくなります。",
            "複数工程になる場合は、整理を先に済ませ、そのあとに変換や圧縮へ進むのが基本です。",
            "大きい PDF では、最終結果を一度確認してから共有すると安心です。",
          ],
        },
      ],
      comparisonTitle: "このPDF作業の考え方",
      comparisonItems: [
        { label: "何をする作業か", value: p ? `${capitalize(p.what)}。` : "PDF を扱いやすい形に整える作業です。" },
        { label: "向いている用途", value: p ? `${capitalize(p.why)}。` : "提出前の調整や社内共有、資料整理に向いています。" },
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
        { label: "進め方のコツ", value: "まず内容と順番を整え、そのあとに変換や軽量化を行うと、最終確認がしやすくなります。" },
      ],
      relatedToolsTitle,
    };
  }

  return {
    contentSections: [
      {
        title: `What ${title} is good for`,
        paragraphs: [
          p
            ? `${title} ${p.what}. In practice, ${p.why}.`
            : `${title} is useful when you need to clean up a PDF or prepare it for sharing.`,
          "It is meant for everyday document work, not heavy publishing. Think of it as the quick step between receiving a PDF and sending the finished version on.",
        ],
      },
      {
        title: "A better way to think about PDF tasks",
        paragraphs: [
          "Start by deciding whether the result should stay a PDF, become images, or simply be a cleaner, smaller version of the same document.",
          "That one decision usually tells you whether to merge, split, remove pages, convert, or compress first.",
        ],
      },
    ],
    listSections: [
      {
        title: "Quick checklist",
        items: [
          p ? `${capitalize(p.tip)}.` : "Review page order and orientation before exporting anything.",
          "Know whether the destination expects a PDF, an image set, or a lighter optimized copy.",
          "If the workflow has multiple steps, cleanup usually comes before conversion.",
          "For large files, review the output once before sharing it.",
        ],
      },
    ],
    comparisonTitle: "How this PDF step fits the workflow",
    comparisonItems: [
      { label: "What it does", value: p ? `It ${p.what}.` : "It gets a PDF into a more usable shape." },
      { label: "Why it helps", value: p ? `${capitalize(p.why)}.` : "It suits everyday cleanup, page prep, and sharing." },
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
      { label: "Practical approach", value: "Fix structure first, then optimize or convert once the document is in the right order." },
    ],
    relatedToolsTitle,
  };
}

function genericEditing(
  title: string,
  locale: Locale,
  relatedTools: RelatedToolItem[],
  relatedToolsTitle: string,
): SeoFallbackContent {
  if (locale === "ja") {
    return {
      contentSections: [
        {
          title: `${title}の使いどころ`,
          paragraphs: [
            `${title}は、画像を整える途中で役立つ編集系ツールです。見た目を整えたいとき、掲載先に合わせたいとき、あとから使いやすい形にしたいときに向いています。`,
            "画像編集では一つひとつの処理は小さく見えても、順番次第で仕上がりが変わります。どこで使うかを意識すると、この手のツールはかなり便利です。",
          ],
        },
      ],
      listSections: [
        {
          title: "作業前のヒント",
          items: [
            "掲載先や提出先にサイズ制限があるなら、先に条件を確認しておくと効率的です。",
            "複数の処理を行う場合は、見た目の調整を先に、圧縮や形式変換を後に回すと分かりやすいです。",
            "元画像は別に残しておくと、あとで別用途に流用しやすくなります。",
          ],
        },
      ],
      comparisonTitle: "このツールがはまる場面",
      comparisonItems: [
        { label: "向いている用途", value: "掲載前の微調整、社内資料づくり、共有用の画像整備に向いています。" },
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
      ],
      relatedToolsTitle,
    };
  }

  return {
    contentSections: [
      {
        title: `Where ${title} fits best`,
        paragraphs: [
          `${title} is part of the image-preparation stage. It is most useful when you need to adjust how an image looks or behaves before publishing, sharing, or continuing with another step.`,
          "These small edits matter more than they look. A quick cleanup step often makes the final file much easier to use.",
        ],
      },
    ],
    listSections: [
      {
        title: "Helpful reminders",
        items: [
          "Check whether the destination has dimension or file-size limits before you start.",
          "If you plan more than one edit, visual cleanup usually comes before compression or format conversion.",
          "Keep the original image untouched so you can reuse it later.",
        ],
      },
    ],
    comparisonTitle: "How this tool fits the workflow",
    comparisonItems: [
      { label: "Best use case", value: "This tool is most useful during image preparation, before publishing or sharing." },
      {
        label: "Typical next step",
        value:
          relatedTools.length > 0
            ? `After this step, users often continue with ${relatedTools
                .slice(0, 2)
                .map((tool) => tool.name)
                .join(" or ")}.`
            : "After editing, the next step is often compression, resizing, or exporting a final format.",
      },
    ],
    relatedToolsTitle,
  };
}

export function buildSeoFallbackContent({
  title,
  relatedTools,
}: {
  title: string;
  description: string;
  relatedTools: RelatedToolItem[];
}): SeoFallbackContent {
  const locale: Locale = isJapanese(title) ? "ja" : "en";
  const category = detectCategory(title);

  if (category === "conversion") {
    return buildConversionContent(title, locale, relatedTools);
  }

  if (category === "pdf") {
    return buildPdfContent(title, locale, relatedTools);
  }

  return buildEditingContent(title, locale, relatedTools);
}

function capitalize(text: string) {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
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

function parseConversionPair(title: string, locale: Locale) {
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
