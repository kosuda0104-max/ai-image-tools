type GuideSection = {
  title: string;
  paragraphs: string[];
};

export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  cardDescription: string;
  sections: GuideSection[];
};

type GuideLocale = "ja" | "en";

const jaGuides: GuideEntry[] = [
  {
    slug: "image-format-basics",
    title: "画像形式の選び方",
    description:
      "JPG、PNG、WebP、HEIC をどう使い分けるかを、容量、画質、透過、編集、共有のしやすさまで含めて見ていくガイドです。",
    cardDescription:
      "JPG、PNG、WebP、HEIC の違いを、容量、互換性、透過、編集のしやすさから見ていきます。",
    sections: [
      {
        title: "まず押さえたい判断基準",
        paragraphs: [
          "画像形式を選ぶときは、見た目のきれいさだけでなく、どこで使うのか、あとで編集するのか、どれくらい軽くしたいのかをセットで考えるのが大切です。写真をそのまま共有するのか、デザイン素材として何度も触るのかで、向いている形式はかなり変わります。",
          "形式選びを間違えると、容量が無駄に大きくなったり、透過が消えたり、受け手の環境で開けなかったりします。逆に、用途に合う形式を先に決めておくと、変換後にもう一度やり直す回数をかなり減らせます。",
        ],
      },
      {
        title: "JPG が向いている場面",
        paragraphs: [
          "JPG は写真のように色の変化が多い画像を軽くまとめたいときに向いています。ブログ記事の挿絵、商品写真、社内共有用の画像、メール添付用の写真など、容量を抑えたい場面ではまず候補になります。",
          "ただし、JPG は保存時に圧縮が入るため、繰り返し保存すると劣化が目立ちやすくなります。文字が多い図版や、境界がはっきりした UI スクリーンショットはにじみやすいので、見た目を優先したいなら PNG や WebP も比較したほうが安全です。",
        ],
      },
      {
        title: "PNG が向いている場面",
        paragraphs: [
          "PNG は透過を残したい画像や、文字や線をくっきり見せたい画像に向いています。ロゴ、バナー、プレゼン資料の図版、スクリーンショット、アプリ画面の共有などでは PNG のほうが扱いやすいことが多いです。",
          "一方で、写真を PNG のまま持ち続けると容量が大きくなりやすく、Web 表示やアップロードでは不利になります。編集のためにいったん PNG で保持して、公開直前に JPG や WebP に変換する流れにすると、品質と軽さのバランスを取りやすくなります。",
        ],
      },
      {
        title: "WebP と HEIC をどう見るか",
        paragraphs: [
          "WebP は Web 向けに軽く配信したいときに便利な形式です。JPG や PNG より容量を抑えやすく、透過にも対応できるので、サイト運用や表示速度を意識する場面では有力です。公開用素材を軽くしたいなら、一度比較してみる価値があります。",
          "HEIC は iPhone で撮った写真でよく見かける形式です。容量効率は良いのですが、古い環境や一部の業務ツールでは扱いづらいことがあります。共有先やアップロード先に不安があるなら、JPG に変換してから使うほうが失敗しにくいです。",
        ],
      },
      {
        title: "迷ったときの選び方",
        paragraphs: [
          "写真を軽くしたいなら JPG、文字や透過を保ちたいなら PNG、Web 公開を軽くしたいなら WebP、iPhone 写真を幅広く使いたいなら HEIC から JPG 変換、という考え方で始めると判断しやすくなります。最初から完璧に選ぼうとせず、用途を先に決めるのがコツです。",
          "もし今の形式が合っているか不安なら、同じ画像を複数形式で試し、容量と見た目を比べてから決めるのがおすすめです。このサイトの変換ツールを使えば、JPG、PNG、WebP、HEIC の行き来をブラウザだけで試せるので、迷った段階で比較しやすくなっています。",
        ],
      },
    ],
  },
  {
    slug: "jpg-vs-png",
    title: "JPG と PNG の違い",
    description:
      "写真なら JPG、スクリーンショットなら PNG と言われがちですが、実際は用途によって例外もあります。容量、画質、透過、編集のしやすさを踏まえて違いを見ていきます。",
    cardDescription:
      "写真、スクリーンショット、透過、ファイルサイズの違いから、どちらが合うかを見極めやすくします。",
    sections: [
      {
        title: "JPG と PNG の基本的な違い",
        paragraphs: [
          "JPG は写真のような自然な色の変化を軽く保存するのが得意で、PNG は文字や線、透過情報を保ったまま保存するのが得意です。どちらもよく使われる形式ですが、強みがかなり違うので、同じ画像でも向き不向きが分かれます。",
          "よくある失敗は、スクリーンショットを JPG にして文字をにじませたり、写真を PNG のまま保存して容量を大きくしすぎたりすることです。形式自体に良し悪しがあるのではなく、画像の種類に対して合うかどうかが重要です。",
        ],
      },
      {
        title: "JPG が有利なケース",
        paragraphs: [
          "スマホ写真、人物写真、風景写真、商品写真のように色のグラデーションが多い画像は JPG が扱いやすいです。容量を軽くしやすく、共有、メール添付、CMS アップロード、社内資料への貼り付けでも使いやすい場面が多くあります。",
          "特に、まず軽さを優先したいときは JPG のほうが候補にしやすいです。Web 掲載用の写真や、たくさんの画像をまとめて管理したい案件では、PNG より JPG のほうが全体の運用コストを下げやすくなります。",
        ],
      },
      {
        title: "PNG が有利なケース",
        paragraphs: [
          "ロゴ、図解、UI モック、アプリ画面、プレゼン資料のキャプチャなどは PNG が向いています。輪郭がはっきりしている画像や文字を多く含む画像では、JPG よりもシャープに見えやすく、再編集や再利用もしやすいです。",
          "背景透過が必要な場合も PNG が基本です。たとえばバナー用のロゴ、EC サイトの商品切り抜き、サムネイル用のアイコンなどは、JPG に変換すると透明部分が失われるので、最初から PNG を選んでおくほうが安全です。",
        ],
      },
      {
        title: "容量と見た目のバランス",
        paragraphs: [
          "同じ画像でも、写真なら JPG のほうがかなり軽くなりやすく、図版なら PNG のほうが見た目を保ちやすいことが多いです。容量だけを見て判断すると、後から文字のにじみや背景の扱いで困ることがあります。",
          "公開用には JPG、編集用には PNG のように使い分けると、両方の良さを活かせます。まず PNG で作業し、最終出力だけ JPG に変える流れは、デザインや資料作成の現場でもよく使われる考え方です。",
        ],
      },
      {
        title: "どちらを選ぶべきか迷ったとき",
        paragraphs: [
          "写真を軽くしたいなら JPG、スクリーンショットやロゴをきれいに保ちたいなら PNG と考えるのが分かりやすい出発点です。背景透過が必要なら PNG、メールやフォーム提出で軽さが重要なら JPG を優先すると失敗しにくくなります。",
          "もし受け取り先の要件が決まっているなら、その形式に合わせるのが最優先です。このサイトでは JPG を PNG に変換するツールと、PNG を JPG に変換するツールの両方を用意しているので、用途に合わせてすぐ切り替えられます。",
        ],
      },
    ],
  },
  {
    slug: "png-vs-webp",
    title: "PNG と WebP の違い",
    description:
      "PNG は素材保管やスクリーンショットに強く、WebP は軽量配信に強い形式です。公開前に迷いやすいポイントを順番に見ていきます。",
    cardDescription:
      "再編集向けの PNG と、軽量配信向けの WebP をどう使い分けるかを見ていきます。",
    sections: [
      {
        title: "見た目より用途の違いが大きい",
        paragraphs: [
          "PNG と WebP はどちらも Web で見かける機会が多い形式ですが、向いている使い方は少し違います。PNG は作業途中の素材やスクリーンショットに強く、WebP は公開時の軽さを優先したいときに便利です。",
          "両方とも透明背景を扱える点では似ていますが、実際には編集前提か配信前提かで選ぶと整理しやすくなります。見た目だけでは差が分かりにくいことがあるので、保存後の運用まで含めて考えるのが大切です。",
        ],
      },
      {
        title: "PNG を残したほうがいい場面",
        paragraphs: [
          "スクリーンショット、UI デザイン、図解、ロゴ、資料用の素材は PNG のまま持っておくと扱いやすいです。線や文字がはっきりしていて、再編集や加工を前提にしたワークフローでも崩れにくいからです。",
          "公開前にまだ調整する可能性がある画像を最初から WebP に寄せると、編集や差し替えのたびに管理が複雑になることがあります。まずは PNG で保持し、必要になった段階で公開用に WebP を作るほうが運用しやすいことが多いです。",
        ],
      },
      {
        title: "WebP が強い場面",
        paragraphs: [
          "サイト掲載用の画像、ブログの挿絵、LP のビジュアル、EC 用の商品画像など、表示速度や転送量を意識したい場面では WebP が有力です。PNG より軽くまとまりやすく、見た目とのバランスを取りやすいのが強みです。",
          "特に画像枚数が多いページでは、1枚ごとの差が小さくても全体ではかなり効きます。Core Web Vitals やモバイル回線での表示を意識するなら、公開用の最終形式として WebP を試す価値があります。",
        ],
      },
      {
        title: "互換性と再利用の考え方",
        paragraphs: [
          "WebP はかなり普及していますが、業務系ツールや一部の画像編集環境では PNG や JPG のほうが扱いやすいことがあります。社内提出、印刷、相手先ツールへの再アップロードがあるなら、PNG のほうが安心なケースも残っています。",
          "逆に、Web 表示が主目的で再編集の予定が薄いなら、PNG をそのまま公開するより WebP のほうが合理的です。用途が公開用か作業用かを先に分けるだけで、どちらを残すか決めやすくなります。",
        ],
      },
      {
        title: "迷ったらこう決める",
        paragraphs: [
          "素材として持つなら PNG、公開して軽くしたいなら WebP という切り分けがいちばん分かりやすいです。特にスクリーンショットや図版は PNG、サイト表示や高速配信は WebP という考え方で大きく外しにくくなります。",
          "まず PNG をそのまま残し、必要なときだけ WebP を作る運用にすると失敗が少なくなります。このサイトの PNG から WebP、WebP から PNG の変換ツールを使えば、実際の見た目と容量を比べながら判断できます。",
        ],
      },
    ],
  },
  {
    slug: "pdf-workflows",
    title: "PDF ツールの選び方",
    description:
      "結合、分割、変換、圧縮、ページ整理など、PDF 作業でよくある悩みをタスク別に分けて、どのツールから触ると進めやすいかをまとめたガイドです。",
    cardDescription:
      "結合、分割、変換、圧縮、ページ整理など、PDF 作業ごとの考え方をまとめています。",
    sections: [
      {
        title: "PDF 作業は目的ごとに分けると迷いにくい",
        paragraphs: [
          "PDF まわりの作業は一見似ていますが、実際にはまとめたいのか、抜き出したいのか、画像にしたいのか、軽くしたいのかで使うツールが変わります。最初に目的を一つ決めてから選ぶと、無駄な作業が減ります。",
          "よくあるのは、結合したいだけなのに画像変換まで試してしまったり、数ページだけ抜き出したいのに全体を圧縮してしまったりすることです。やりたいことを一文で言い換えるだけで、選ぶべきツールがかなり明確になります。",
        ],
      },
      {
        title: "複数の PDF を 1 つにまとめたいとき",
        paragraphs: [
          "請求書、契約書、提出資料、会議用の配布物などを一つのファイルにまとめたいなら、まず PDF 結合ツールを使うのが基本です。ページ順を確認してからまとめれば、そのまま共有や提出に使える形にしやすくなります。",
          "同じ案件のファイルが複数に分かれていると、受け手にも分かりづらくなります。送信前に一つへまとめておくと、確認の手間が減るだけでなく、検索や保管もしやすくなります。",
        ],
      },
      {
        title: "必要なページだけ残したいとき",
        paragraphs: [
          "一部ページだけ送りたい、余計なページを外したい、章ごとに分けたいという場面では、PDF 分割ツールや PDF ページ削除ツールが役立ちます。全体を壊さずに必要な部分だけ整理できるので、提出用の整形にも向いています。",
          "ページ数が多い資料ほど、送る相手に合わせて絞る意味が大きくなります。たとえば見積書の一部、プレゼンの抜粋、申請書の必要ページだけを渡したいときは、分割や削除のほうが変換より先に検討すべき作業です。",
        ],
      },
      {
        title: "画像にしたいときと、画像から PDF にしたいとき",
        paragraphs: [
          "PDF のページを画像として保存したいなら PDF to JPG や PDF to PNG を使います。資料の一部を画像として貼りたい、サムネイルにしたい、編集用にページを切り出したいときに便利です。画質優先なら PNG、共有しやすさ重視なら JPG が候補になります。",
          "逆に、複数の画像を 1 つの PDF にまとめたいなら Image to PDF の出番です。写真を提出資料にまとめる、スキャン画像を一つのファイルにする、スクリーンショットを PDF で送るといった場面では、この方向の変換が役立ちます。",
        ],
      },
      {
        title: "軽くしたいときの考え方",
        paragraphs: [
          "アップロード上限やメール添付制限で困る場合は PDF 圧縮ツールを試します。ただし、どこまで軽くしてよいかは用途次第で、文字の読みやすさや図版の判別性を残せるかも確認したいポイントです。",
          "元の PDF に高解像度画像が多い場合は圧縮の効果が出やすいですが、すでに軽量化されている場合は差が小さいこともあります。提出前や共有前に一度試して、サイズと読みやすさの両方を見るのが現実的です。",
        ],
      },
    ],
  },
  {
    slug: "heic-to-jpg-guide",
    title: "HEIC を JPG に変換するときの考え方",
    description:
      "iPhone 写真でよく見かける HEIC を、そのまま使ってよい場面と、JPG に変えておいたほうが安心な場面に分けて見ていきます。",
    cardDescription:
      "iPhone 写真を HEIC のまま持つか、JPG に変えるかを、使いどころごとに考えます。",
    sections: [
      {
        title: "HEIC がそのままだと困る場面",
        paragraphs: [
          "HEIC は iPhone の中では特に困りませんが、一歩外に出すと話が変わります。古い Windows 環境、社内ツール、フォーム添付、EC 管理画面などでは、そのままだとうまく開けないことがあります。自分の端末では見えていても、相手先では弾かれる、というズレが起きやすい形式です。",
          "画像提出や業務システムへのアップロードでは、最初から JPG 前提になっていることも少なくありません。HEIC のまま送って差し戻されるくらいなら、先に JPG にしておいたほうが話が早い、という場面はかなりあります。",
        ],
      },
      {
        title: "JPG に変換するメリット",
        paragraphs: [
          "JPG にすると対応環境が広く、共有、メール送信、Web アップロード、資料貼り付けなどがやりやすくなります。受け手の環境をあまり選ばないので、トラブル回避の意味でも実用的です。",
          "また、複数人が関わる案件では、誰でもすぐ扱える形式にそろえる意味があります。チームチャット、クラウドストレージ、CMS などで見え方の差を減らせるので、作業の止まりにくさにもつながります。",
        ],
      },
      {
        title: "HEIC のままでもよい場面",
        paragraphs: [
          "個人の写真保管や Apple 環境中心の運用なら、HEIC のままでも特に困らないことがあります。容量効率が良く、日常的な撮影データを軽く持てるのは HEIC の利点です。",
          "ただし、後で誰かに渡す可能性があるなら、必要なタイミングで JPG を作れるようにしておくと安心です。保管は HEIC、共有時だけ JPG という使い分けも十分現実的です。",
        ],
      },
      {
        title: "変換前に気をつけたい点",
        paragraphs: [
          "JPG に変換すると、互換性は上がりますが、HEIC のまま持っていた情報や圧縮特性はそのまま引き継がれません。編集の流れや保存先の要件を確認して、何のための変換かをはっきりさせておくと無駄が減ります。",
          "また、提出先が JPG で問題ないか、画像サイズに指定がないかも見ておくとスムーズです。変換後にさらに圧縮やリサイズが必要になることもあるので、公開や提出の直前にまとめて整える流れが効率的です。",
        ],
      },
      {
        title: "おすすめの進め方",
        paragraphs: [
          "相手に送る、フォームに出す、Web に載せる予定があるなら、まず HEIC を JPG に変えてしまうのが分かりやすいです。互換性を先に片づけておけば、そのあとの圧縮やリサイズも迷いにくくなります。",
          "このサイトの HEIC to JPG ツールなら、iPhone 写真をブラウザだけで JPG に変換できます。軽さも欲しければそのまま JPG 圧縮へ、寸法も合わせたいなら画像リサイズへつなげると、公開前の整形まで一気に進められます。",
        ],
      },
    ],
  },
  {
    slug: "compress-images-without-losing-quality",
    title: "画質を大きく落とさずに画像を圧縮する方法",
    description:
      "画像を軽くしたいけれど、見た目はできるだけ保ちたい。そんなときに、どこから手を付けると失敗しにくいかをまとめています。",
    cardDescription:
      "容量を減らしたいときに、形式、サイズ、用途をどう見直すと崩れにくいかを見ていきます。",
    sections: [
      {
        title: "圧縮前に見るべき三つのポイント",
        paragraphs: [
          "画像を軽くしたいとき、つい圧縮率だけを見たくなりますが、それだけで決めると失敗しやすいです。実際には、どこで使う画像なのか、今の形式が合っているのか、表示サイズが大きすぎないかの三つを一緒に見たほうがうまくいきます。",
          "Web 用の写真と、資料用のスクリーンショットでは、許される崩れ方がまったく違います。先に用途を決めておけば、どこまで軽くしてよいかの感覚もつかみやすくなります。",
        ],
      },
      {
        title: "写真と図版で考え方を分ける",
        paragraphs: [
          "写真は JPG や WebP の圧縮と相性が良く、かなり軽くしても見た目の差が気になりにくい場合があります。逆に、文字の多い図版や UI スクリーンショットは圧縮の影響が見えやすいので、PNG や控えめな圧縮のほうが向いています。",
          "同じ 1MB の画像でも、中身が写真か図版かで最適な処理は変わります。写真なら形式変換も候補に入れ、図版ならサイズ調整を優先するなど、画像の種類ごとにアプローチを変えるのがコツです。",
        ],
      },
      {
        title: "形式を見直すだけで軽くなることがある",
        paragraphs: [
          "もともと PNG で保存されている写真は、JPG や WebP に変えるだけで大きく軽くなることがあります。圧縮率だけで何とかしようとする前に、形式そのものが合っているかを見直すほうが効果的です。",
          "逆に、ロゴや透過画像を無理に JPG にすると、軽くはなっても使いづらくなることがあります。圧縮は万能ではないので、まず形式、そのあとサイズ、最後に圧縮率という順番で考えると整理しやすいです。",
        ],
      },
      {
        title: "表示サイズより大きすぎる画像を避ける",
        paragraphs: [
          "Web に載せる画像が実際の表示サイズより極端に大きい場合、解像度を落とすだけでかなり軽くなることがあります。画質を無理に削るより、まず必要な幅と高さに合わせるほうが自然な改善になりやすいです。",
          "たとえば横幅 400px でしか表示しないのに 3000px の画像を載せているなら、そこに余分な容量があります。圧縮の前にリサイズを行うだけで、見た目をほぼ保ったまま大幅に軽くできるケースも珍しくありません。",
        ],
      },
      {
        title: "実務ではこう進めると失敗しにくい",
        paragraphs: [
          "おすすめは、用途を決める、形式を見直す、必要サイズに合わせる、最後に圧縮する、の順です。いきなり強い圧縮をかけるより、少しずつ整えたほうが見た目を残しやすくなります。",
          "このサイトでは画像圧縮だけでなく、JPG 圧縮、PNG 圧縮、WebP 圧縮、リサイズ、形式変換も使えます。圧縮だけで無理に解決しなくていいので、前後の調整までまとめて進めやすくなっています。",
        ],
      },
    ],
  },
  {
    slug: "pdf-to-jpg-guide",
    title: "PDF を JPG に変換するべき場面",
    description:
      "PDF のまま扱ったほうがいいのか、それとも JPG にして使ったほうが楽なのか。迷いやすい場面を用途ごとに分けて見ていきます。",
    cardDescription:
      "PDF を画像にしたほうが使いやすい場面と、そのまま持っておくべき場面を見分けます。",
    sections: [
      {
        title: "PDF のままでは扱いにくい場面がある",
        paragraphs: [
          "PDF は資料として渡すには便利ですが、ページを一枚の画像として使いたい場面では急に扱いづらくなります。たとえばスライドに貼る、ブログに載せる、SNS に出す、といった使い方では JPG のほうがずっと気楽です。",
          "サムネイル作成、資料の一部抜粋、レビュー用の共有なども同じです。相手に見せたいのが『文書そのもの』ではなく『そのページの見た目』なら、PDF のまま抱えるより JPG にしたほうが早いことが多いです。",
        ],
      },
      {
        title: "JPG にするメリット",
        paragraphs: [
          "JPG にすると、1 ページずつ画像として保存できるため、プレゼン資料、チャット共有、Web 掲載、CMS 登録に流し込みやすくなります。相手が PDF ビューアを持っていなくても見せやすいのも利点です。",
          "また、画像編集ツールと組み合わせやすくなるので、トリミング、注釈追加、モザイク、再レイアウトなどもやりやすくなります。PDF のままでは手が入りづらい細かな調整を行いたいときに便利です。",
        ],
      },
      {
        title: "PDF のまま残すべき場面",
        paragraphs: [
          "ページ順やテキストの検索性を保ちたいとき、提出フォーマットが PDF 指定のとき、複数ページを一つのまとまりで扱いたいときは、PDF のままのほうが適しています。JPG にするとページ単位で分かれるため、資料全体の管理には向かないことがあります。",
          "契約書、申請書、配布資料、印刷前提のファイルでは、画像化より PDF のまま運用するほうが自然です。変換する前に、相手が本当に画像を必要としているのかを確認しておくと無駄がありません。",
        ],
      },
      {
        title: "画質とサイズの考え方",
        paragraphs: [
          "PDF を JPG に変換するときは、見やすさと容量のバランスを見る必要があります。ページ内の文字が細かい資料では、軽さを優先しすぎると読みづらくなるので、用途に応じて品質を見ておきたいところです。",
          "画像として使うだけなら軽めでも十分なことがありますが、拡大して読ませるならある程度の解像度が必要です。変換後に共有先の表示サイズも確認しながら判断すると、やり直しを減らせます。",
        ],
      },
      {
        title: "おすすめの進め方",
        paragraphs: [
          "ブログや SNS、資料貼り付けに使うなら、まず PDF を JPG にして、必要なページだけ残す流れが分かりやすいです。文字の細かいページでは PNG のほうが向くこともあるので、見え方だけは一度比べておくと安心です。",
          "このサイトでは PDF to JPG と PDF to PNG の両方があるので、用途に応じて試せます。画像にしたあとでサイズを整えたいならリサイズ、もう少し軽くしたいなら画像圧縮へつなげると、公開前の調整までまとめて進められます。",
        ],
      },
    ],
  },
  {
    slug: "resize-images-for-web",
    title: "Web 用に画像をリサイズするときの考え方",
    description:
      "画像を小さくしすぎず、大きすぎも避けながら、Web 公開にちょうどよいサイズへ寄せるときの考え方をまとめています。",
    cardDescription:
      "表示サイズに合った画像寸法へ調整するときに、幅、高さ、容量をどう見るかを整理します。",
    sections: [
      {
        title: "リサイズは圧縮より先に効くことがある",
        paragraphs: [
          "画像を軽くしたいとき、まず圧縮率を触りたくなりますが、実際にはサイズが大きすぎることが原因になっている場合も多くあります。表示される大きさに対して元画像が過剰なら、リサイズだけで十分軽くできることがあります。",
          "特に Web 掲載では、表示幅が決まっているケースが多いので、必要サイズに近づけるだけでもかなり合理的です。見た目を大きく崩さず容量を下げたいなら、最初に寸法を見直す価値があります。",
        ],
      },
      {
        title: "用途別に考えるサイズの目安",
        paragraphs: [
          "ブログの本文画像、サムネイル、商品一覧、LP のヒーロー画像では、ほしい幅がそれぞれ違います。どこに置く画像なのかを先に決めてからサイズを触ると、無駄に大きい画像を抱えずに済みます。",
          "小さなカードにしか載らない画像を高解像度のまま置いても、見た目の得はほとんどありません。そのわりに転送量だけ増えるので、表示場所ごとの必要幅を意識しておくほうが実用的です。",
        ],
      },
      {
        title: "縦横比を崩さないほうが安全",
        paragraphs: [
          "幅と高さを自由に変えられる場合でも、基本は元画像の縦横比を保ったほうが自然です。比率を崩すと人物や商品が不自然に伸びて見え、見た目の違和感につながります。",
          "どうしても指定サイズに合わせる必要があるなら、リサイズだけでなく切り抜きも組み合わせたほうがきれいに仕上がることがあります。縮小だけで無理に合わせるより、必要範囲を残して調整するほうが実用的です。",
        ],
      },
      {
        title: "リサイズ後に形式や圧縮も見直す",
        paragraphs: [
          "サイズ調整だけでも軽くなりますが、さらに軽さが必要なら形式変換や圧縮も候補になります。写真なら JPG や WebP、図版なら PNG など、リサイズ後に用途に合った形式へ整えると効果が出やすくなります。",
          "逆に、先に強い圧縮をかけてからサイズをいじると、画質劣化が目立つことがあります。まずサイズ、次に形式、最後に圧縮という順番で見ると、必要以上に見た目を損ないにくくなります。",
        ],
      },
      {
        title: "実務でのおすすめ手順",
        paragraphs: [
          "掲載先の表示サイズを確認し、その幅に近い寸法へリサイズしたうえで、必要に応じて圧縮や形式変換を行う流れが分かりやすいです。これなら、見た目を保ちつつ容量も下げやすくなります。",
          "このサイトの画像リサイズツールでは、ブラウザ上で幅と高さを調整できます。リサイズ後に軽くしたいなら画像圧縮、形式も変えたいなら JPG、PNG、WebP 変換ツールへそのままつなげると効率的です。",
        ],
      },
    ],
  },
  {
    slug: "merge-or-split-pdf",
    title: "PDF は結合と分割のどちらを使うべきか",
    description:
      "複数の PDF を一つにまとめるべきか、必要なページだけ切り出すべきか。よく迷う場面を提出、共有、保存の流れに沿って見ていきます。",
    cardDescription:
      "PDF をまとめる作業と、必要な部分だけ抜き出す作業をどう使い分けるかを考えます。",
    sections: [
      {
        title: "結合と分割は真逆の作業に見えて実は近い",
        paragraphs: [
          "PDF 結合は複数ファイルを一つにまとめる作業で、PDF 分割は一つのファイルから必要部分を切り出す作業です。やっていることは逆ですが、どちらも『相手に見せやすい形へ整える』という点ではかなり近い作業です。",
          "迷いやすいのは、何を相手に渡したいのかが曖昧なまま操作してしまうことです。一式で見せたいなら結合、必要部分だけでよいなら分割、と先に共有単位を決めると選びやすくなります。",
        ],
      },
      {
        title: "結合が向いている場面",
        paragraphs: [
          "見積書と補足資料、表紙と本文、複数章に分かれた配布資料などを一つにまとめたいときは PDF 結合が向いています。受け手がファイルを行き来せずに済むので、確認や保存がしやすくなります。",
          "送信や提出でファイル数を減らしたい場面でも結合は便利です。案件ごとに一式を一つへまとめるだけで、あとから探すときの管理も楽になります。",
        ],
      },
      {
        title: "分割が向いている場面",
        paragraphs: [
          "一部ページだけ共有したい、章ごとに分けたい、不要ページを除いて提出したいという場面では分割のほうが自然です。全体を送る必要がないのに丸ごと共有すると、受け手にとっても分かりにくくなります。",
          "ページ数が多い資料ほど、必要部分だけ切り出す価値があります。特に申請、レビュー、承認フローでは、関係のあるページだけ抜き出すほうが確認の負担を下げやすくなります。",
        ],
      },
      {
        title: "迷ったときの判断基準",
        paragraphs: [
          "一つのまとまりとして見せたいか、必要な範囲だけ見せたいかで判断すると分かりやすいです。資料の前後関係が大事なら結合、対象ページが明確なら分割、という考え方で大きく外しにくくなります。",
          "また、送る相手が誰かも重要です。社内アーカイブ向けなら結合、外部共有や確認依頼なら分割のほうが親切な場合があります。受け手の行動を想像して選ぶと失敗しにくくなります。",
        ],
      },
      {
        title: "実務では組み合わせて使うことも多い",
        paragraphs: [
          "実際の業務では、まず複数資料を結合して一式化し、そのあと外部向けに一部ページだけ分割することもあります。片方だけではなく、前後の流れで両方を使うと整理しやすいケースも多いです。",
          "このサイトには PDF 結合ツールと PDF 分割ツールの両方があるので、提出用、共有用、保存用で形を変えやすくなっています。不要ページを外したいときは PDF ページ削除ツールも合わせて使うと効率的です。",
        ],
      },
    ],
  },
  {
    slug: "choose-best-image-format-for-web",
    title: "Web 用画像に最適な形式を選ぶ方法",
    description:
      "サイト表示を軽くしたい。でも見た目は崩したくない。そんなときに JPG、PNG、WebP をどう使い分けるかを見ていくガイドです。",
    cardDescription:
      "Web 掲載を前提に、JPG、PNG、WebP のどれが合うかを判断しやすくします。",
    sections: [
      {
        title: "Web では軽さと見やすさの両立が必要",
        paragraphs: [
          "Web 用画像は、見た目がきれいならそれで十分、というわけではありません。表示速度や転送量も含めて考えないと、ページ全体の体験が重くなりやすいからです。",
          "特にトップページ、記事一覧、商品一覧のように画像枚数が多い場所では、1枚ごとの差が積み重なります。形式選びは地味に見えて、実はサイト全体の軽さに効く部分です。",
        ],
      },
      {
        title: "写真中心なら JPG か WebP",
        paragraphs: [
          "人物写真、商品写真、風景、イベント写真のような素材は、JPG か WebP を候補にするのが基本です。JPG は広く使えて扱いやすく、WebP はより軽くまとまりやすいのが強みです。",
          "既存環境との相性や運用のしやすさを優先するなら JPG、少しでも表示を軽くしたいなら WebP を試す流れにすると分かりやすいです。まず JPG で整え、余力があれば WebP 比較をするのも現実的です。",
        ],
      },
      {
        title: "ロゴや図版は PNG を起点に考える",
        paragraphs: [
          "ロゴ、アイコン、図解、UI スクリーンショット、文字入りの素材は PNG のほうがきれいに見えやすいことがあります。透過が必要な場合も PNG が起点になりやすいです。",
          "ただし、公開用にそのまま PNG を多用すると重くなることがあります。まず PNG で保持し、公開前に WebP 化できるものは変換する、という運用にすると品質と軽さのバランスを取りやすくなります。",
        ],
      },
      {
        title: "形式だけでなくサイズも重要",
        paragraphs: [
          "形式選びだけで劇的に軽くならない場合は、画像サイズ自体が大きすぎる可能性があります。表示幅に合わない過剰なサイズの画像は、どの形式でも無駄が出やすくなります。",
          "そのため、Web 用の最適化は形式とサイズをセットで考えるのが基本です。先に必要サイズへリサイズし、そのあと形式変換や圧縮を行うと、見た目を保ちながら軽さを出しやすくなります。",
        ],
      },
      {
        title: "迷ったときの現実的な進め方",
        paragraphs: [
          "まずは写真なら JPG、透過や図版なら PNG で作業し、公開前に WebP も比較する、という順番が分かりやすいです。最初からすべてを最適化しようとするより、用途ごとに段階を分けるほうが進めやすくなります。",
          "このサイトでは JPG、PNG、WebP 間の変換、圧縮、リサイズをまとめて行えます。公開用画像を整える流れを一か所で試せるので、容量と見た目を見比べながら判断しやすくなります。",
        ],
      },
    ],
  },
  {
    slug: "how-to-remove-pages-from-pdf",
    title: "PDF から不要なページを削除するときの考え方",
    description:
      "提出前や共有前に PDF の不要ページを外したいとき、削除だけで足りるのか、分割までしたほうがいいのかを判断しやすくするためのガイドです。",
    cardDescription:
      "PDF ページ削除ツールを使うべき場面と、分割との違いを実務寄りに見ていきます。",
    sections: [
      {
        title: "削除と分割は似ているが目的が違う",
        paragraphs: [
          "PDF ページ削除は、もとの資料を基本的に保ちながら不要ページだけを外す作業です。一方で分割は、資料を複数のまとまりに分ける作業なので、似ているようで使いどころが違います。",
          "たとえば表紙や余白ページを外したいだけなら削除のほうが自然です。章ごとに分けたい、必要部分だけ別ファイルにしたいなら分割のほうが向いています。目的が細い調整か、構成変更かで考えると整理しやすくなります。",
        ],
      },
      {
        title: "不要ページを外したい典型例",
        paragraphs: [
          "提出資料から下書きページを外したい、会議用資料から補足ページを抜きたい、スキャン PDF から空白ページを消したい。そういう場面では、ページ削除だけで十分なことが多いです。全体構成はそのままに、見せたい状態だけ整えられます。",
          "外部提出では、関係ないページが混じっているだけで資料全体が雑に見えることもあります。共有前の最後のひと手間として、不要ページを落としておく意味は意外と大きいです。",
        ],
      },
      {
        title: "ページ削除が向いている理由",
        paragraphs: [
          "削除は変更範囲が小さいので、構成を大きく崩さず整理できます。ページ順を保ったまま余計な部分だけを除けるため、送り先に合わせて最小限の調整をしたいときに向いています。",
          "また、複数ファイルに分かれないので、提出や保存もそのまま行いやすいです。分割ほど作業結果が増えないため、後で管理が複雑になりにくいのも利点です。",
        ],
      },
      {
        title: "削除前に確認したいこと",
        paragraphs: [
          "ページ番号、参照関係、目次、説明文のつながりが崩れないかは見ておきたいポイントです。不要に見えるページでも、前後の説明上は必要なことがあるので、単純に削ればよいとは限りません。",
          "特に複数人で扱う資料では、あとから『このページが必要だった』となることもあります。元ファイルを残したうえで、提出用や共有用だけ別に整える運用にすると安全です。",
        ],
      },
      {
        title: "おすすめの使い分け",
        paragraphs: [
          "少数ページを外すだけなら PDF ページ削除、必要な部分だけ別ファイルにしたいなら PDF 分割、複数ファイルを一つにしたいなら PDF 結合、という整理が分かりやすいです。やりたいことを短く言い換えると選びやすくなります。",
          "このサイトには PDF ページ削除、PDF 分割、PDF 結合がそろっているので、資料整理の流れをブラウザだけで進められます。提出前の微調整としても使いやすい組み合わせです。",
        ],
      },
    ],
  },
  {
    slug: "prepare-images-for-upload",
    title: "アップロード前に画像を整える手順",
    description:
      "フォーム提出、メール添付、管理画面への登録前に、画像形式、容量、サイズ、見た目をどう確認すると失敗しにくいかをまとめた実用ガイドです。",
    cardDescription:
      "画像を送る前に、形式、容量、サイズ、見た目を順番に確認するための実用手順です。",
    sections: [
      {
        title: "まず提出先の条件を見る",
        paragraphs: [
          "画像アップロードでつまずく原因の多くは、画質そのものではなく、提出先の条件と画像の状態が合っていないことです。対応形式、最大容量、推奨サイズ、縦横比、透過の可否を先に確認すると、変換や圧縮の順番を決めやすくなります。",
          "たとえば、JPG しか受け付けないフォームに PNG や HEIC を入れると弾かれることがあります。逆に、透過が必要なロゴを JPG にすると背景が失われます。最初に条件を見るだけで、やり直しをかなり減らせます。",
        ],
      },
      {
        title: "形式を合わせる",
        paragraphs: [
          "受け付け形式が決まっている場合は、まず形式変換から始めます。iPhone 写真なら HEIC から JPG、Web で拾った画像なら WebP から JPG や PNG、スクリーンショットなら PNG のまま使うか JPG に軽くするかを判断します。",
          "ここで大切なのは、変換だけで画質が良くなるわけではないという点です。目的は、相手先で開ける形式にそろえることです。見た目を保ちたい場合は、変換後に一度開いて文字や色味を確認します。",
        ],
      },
      {
        title: "容量とサイズを整える",
        paragraphs: [
          "形式を合わせても容量が大きい場合は、画像圧縮やリサイズを使います。アップロード制限に引っかかる画像は、まず表示に必要な大きさまでリサイズし、そのあと圧縮すると自然に軽くなりやすいです。",
          "写真は圧縮で軽くなりやすい一方、文字が多い画像や図版は崩れが目立ちやすいことがあります。容量だけで判断せず、変換後の画像を開いて読みにくくなっていないかを見るのが安全です。",
        ],
      },
      {
        title: "見た目を最終確認する",
        paragraphs: [
          "提出前には、ファイル名、向き、余白、切り抜き、透かし、文字の読みやすさを確認します。スマホで撮った写真は向きがずれて見えることがあり、スクリーンショットは不要な余白が残りやすいです。",
          "必要なら画像回転、切り抜き、リサイズを使って、相手が見やすい状態に整えます。単にアップロードできるだけでなく、開いたときに伝わる状態にすることが実務では重要です。",
        ],
      },
      {
        title: "おすすめの作業順",
        paragraphs: [
          "迷ったときは、条件確認、形式変換、リサイズ、圧縮、見た目確認の順番で進めると整理しやすいです。最初から圧縮だけを試すより、原因を分けて対応したほうが失敗しにくくなります。",
          "このサイトでは、HEIC to JPG、WebP to JPG、画像リサイズ、画像圧縮、画像切り抜きなどをまとめて使えます。アップロード前の準備をブラウザだけで進めたいときに、一連の流れとして使いやすい構成です。",
        ],
      },
    ],
  },
  {
    slug: "iphone-photos-to-pdf",
    title: "iPhone写真を提出用PDFにする手順",
    description:
      "iPhoneで撮った写真を、学校、仕事、申請、共有用のPDFにまとめるときの形式変換、容量調整、ページ順確認の流れを整理します。",
    cardDescription:
      "HEIC写真をJPGに変換し、必要に応じて軽くしてからPDFにまとめる流れを説明します。",
    sections: [
      {
        title: "iPhone写真はそのまま提出できないことがある",
        paragraphs: [
          "iPhone の写真は HEIC 形式になっていることがあり、提出先によっては開けない、アップロードできない、プレビューが出ないことがあります。自分の端末では問題なく見えても、相手側の環境では扱いづらい場合があります。",
          "提出用にするなら、まず JPG に変換して互換性を上げるのが分かりやすいです。特に学校や会社のフォーム、古い業務システム、メール添付では JPG のほうが安全なことが多いです。",
        ],
      },
      {
        title: "最初に写真を選び直す",
        paragraphs: [
          "PDF にまとめる前に、必要な写真だけを選びます。似た写真、失敗した写真、個人情報が写り込んだ写真、不要な余白が多い写真を外しておくと、後の作業がかなり楽になります。",
          "書類やメモを撮影した写真は、文字が読めるか、斜めになりすぎていないか、影で見えにくくないかを確認します。必要なら撮り直したほうが、変換や補正で無理に直すよりきれいに仕上がります。",
        ],
      },
      {
        title: "HEICをJPGにしてから整える",
        paragraphs: [
          "HEIC の写真は、まず HEIC to JPG ツールで JPG に変換します。その後、容量が大きい場合は JPG 圧縮、向きが違う場合は画像回転、余白が多い場合は切り抜きで整えます。",
          "PDF にする前に画像単位で整えておくと、完成後のページが見やすくなります。あとから PDF 側で直そうとすると、ページ全体の調整になりやすいので、画像の段階で確認するのが効率的です。",
        ],
      },
      {
        title: "PDFにまとめるときの注意点",
        paragraphs: [
          "画像を PDF にまとめるときは、ページ順が特に大切です。申請書、領収書、資料写真などは、見る人が自然に追える順番に並べるだけで伝わりやすくなります。",
          "また、写真の枚数が多いとPDFの容量が大きくなりやすいです。提出先に容量制限がある場合は、画像圧縮や PDF 圧縮を組み合わせて、読める範囲で軽くします。",
        ],
      },
      {
        title: "提出前の最終チェック",
        paragraphs: [
          "完成したPDFは必ず一度開き、ページ抜け、順番、文字の読みやすさ、不要な写真の混入がないか確認します。スマホだけで確認すると見落とすことがあるので、できれば大きめの画面でも見ると安心です。",
          "このサイトでは HEIC to JPG、JPG 圧縮、画像回転、画像切り抜き、Image to PDF、PDF 圧縮までまとめて使えます。写真を提出用PDFにする流れを一か所で進めやすくなっています。",
        ],
      },
    ],
  },
  {
    slug: "optimize-blog-and-site-images",
    title: "ブログやサイト画像を軽くする手順",
    description:
      "ブログ、LP、EC、ポートフォリオなどで使う画像を、見た目を保ちながら軽くするための形式選び、リサイズ、圧縮の考え方をまとめます。",
    cardDescription:
      "Web掲載前に画像形式、サイズ、圧縮を見直し、表示速度と見た目のバランスを取りやすくします。",
    sections: [
      {
        title: "Web画像は見た目と軽さの両方を見る",
        paragraphs: [
          "ブログやサイト画像は、きれいに見えることだけでなく、ページの読み込みを重くしすぎないことも大切です。大きすぎる写真や未圧縮の画像が多いと、スマホ回線では表示が遅くなり、ユーザーが離れやすくなります。",
          "ただし、軽さだけを優先して画質を落としすぎると、商品写真や説明画像の信頼感が下がります。用途ごとに、どこまで軽くしてよいかを決めるのが現実的です。",
        ],
      },
      {
        title: "まず表示サイズに合わせる",
        paragraphs: [
          "画像が重い原因の一つは、表示サイズよりも大きすぎる画像をそのまま使っていることです。横幅 800px で表示する画像に、4000px の写真を置いても、見た目以上にデータ量が増えます。",
          "そのため、最初に画像リサイズで必要な大きさへ近づけるのがおすすめです。リサイズしてから圧縮すると、見た目の劣化を抑えながら容量を減らしやすくなります。",
        ],
      },
      {
        title: "形式を使い分ける",
        paragraphs: [
          "写真は JPG や WebP、ロゴや透過素材は PNG、Web公開の最終出力は WebP も候補にする、という切り分けが分かりやすいです。すべてを同じ形式にするより、画像の種類で選んだほうが自然に軽くなります。",
          "特にWebPは軽量化に向いていますが、再編集や相手先への再提出がある場合は、PNGやJPGも残しておくと安心です。公開用と保管用を分ける考え方が役立ちます。",
        ],
      },
      {
        title: "圧縮後は必ず見比べる",
        paragraphs: [
          "圧縮後は、容量だけでなく見た目も確認します。人物写真なら肌や背景のざらつき、商品写真なら輪郭や細部、スクリーンショットなら文字の読みやすさを見ます。",
          "画像の種類によって、同じ圧縮でも目立ち方が違います。問題があれば圧縮を弱める、サイズを少し小さくする、形式を変えるなど、いくつかの手段を組み合わせると調整しやすくなります。",
        ],
      },
      {
        title: "公開前のおすすめフロー",
        paragraphs: [
          "おすすめは、用途確認、リサイズ、形式変換、圧縮、表示確認の順番です。先にサイズを整えることで、圧縮だけに頼らず自然に軽くできます。",
          "このサイトでは画像リサイズ、JPG圧縮、PNG圧縮、WebP圧縮、JPG to WebP、PNG to WebP をブラウザだけで使えます。公開前の画像準備をまとめて進めたいときに使いやすい流れです。",
        ],
      },
    ],
  },
];

const enGuides: GuideEntry[] = [
  {
    slug: "image-format-basics",
    title: "How to choose an image format",
    description:
      "A practical guide to choosing between JPG, PNG, WebP, and HEIC based on file size, transparency, compatibility, editing, and sharing needs.",
    cardDescription:
      "Understand when to use JPG, PNG, WebP, or HEIC based on file size, compatibility, transparency, and editing needs.",
    sections: [
      {
        title: "Start with the real use case",
        paragraphs: [
          "The best image format depends less on theory and more on what you need to do next. A file meant for web publishing, client delivery, internal review, and design editing may all start from the same picture, but they do not always end in the same format.",
          "That is why format choice should be tied to a workflow. If the image will be edited again, shared with mixed devices, uploaded to a form, or displayed on a public page, those constraints matter as much as raw image quality.",
        ],
      },
      {
        title: "When JPG is the safer choice",
        paragraphs: [
          "JPG works well for photos, lifestyle shots, event images, and other visuals with soft color transitions. It usually gives you a lighter file that is easy to email, upload, publish, and share across almost any platform.",
          "Its main tradeoff is that repeated saves can reduce quality, and sharp text or interface screenshots can lose clarity. If your image is mostly photographic and size matters, JPG is still one of the easiest starting points.",
        ],
      },
      {
        title: "When PNG is worth keeping",
        paragraphs: [
          "PNG is stronger for screenshots, diagrams, logos, interface assets, and images that need transparency. If crisp edges and clean text matter more than file size, PNG often holds up better than JPG.",
          "The downside is weight. Large PNG files can become expensive to store or slow to deliver on the web, so it often makes sense to keep PNG for working files and export a lighter format later if needed.",
        ],
      },
      {
        title: "How WebP and HEIC fit in",
        paragraphs: [
          "WebP is especially useful for web delivery because it often reduces file size while keeping the result visually strong. It is a practical format when page speed matters and you want a lighter publishing asset than JPG or PNG.",
          "HEIC is common on iPhones and is efficient for photo storage, but it can still cause compatibility problems in some workflows. If you are sending images outside Apple-heavy environments, converting HEIC to JPG is often the safer move.",
        ],
      },
      {
        title: "A practical rule of thumb",
        paragraphs: [
          "Use JPG for lighter photo sharing, PNG for screenshots and transparent assets, WebP for lighter web delivery, and HEIC-to-JPG conversion when compatibility matters. That simple decision tree covers most everyday cases well enough to avoid obvious mistakes.",
          "If you are unsure, compare the same image in two formats and judge both size and clarity. A browser-based tool makes that kind of testing fast, and it is often more useful than overthinking format rules in the abstract.",
        ],
      },
    ],
  },
  {
    slug: "jpg-vs-png",
    title: "JPG vs PNG",
    description:
      "Compare JPG and PNG across photos, screenshots, transparency, file size, clarity, and editing workflows so you can choose the more practical format.",
    cardDescription:
      "Compare JPG and PNG for photos, screenshots, transparency, file size, and editing workflows.",
    sections: [
      {
        title: "The difference is mostly about image type",
        paragraphs: [
          "JPG and PNG are both common, but they solve different problems. JPG is built for lighter photographic compression, while PNG is better when you want sharp edges, clean text, or transparency.",
          "That is why the same file can feel perfect in one format and frustrating in another. Picking the right one is usually less about preference and more about whether the image behaves like a photo or a graphic asset.",
        ],
      },
      {
        title: "Where JPG usually wins",
        paragraphs: [
          "JPG is the practical choice for photo-heavy content such as portraits, product photos, travel shots, event images, and editorial visuals. It keeps files manageable and works almost everywhere.",
          "If your main concern is easy sharing and smaller uploads, JPG is often the fastest answer. For blogs, CMS uploads, email attachments, and general-purpose delivery, it remains hard to beat for convenience.",
        ],
      },
      {
        title: "Where PNG is stronger",
        paragraphs: [
          "PNG is better for screenshots, UI captures, logos, charts, illustrations, and anything that needs transparency. Text and sharp shapes usually look cleaner, and the file stays friendlier for design reuse.",
          "That makes PNG a strong working format even when it is not the final publishing format. Teams often keep a PNG master and only convert later when lighter delivery becomes necessary.",
        ],
      },
      {
        title: "Size and clarity tradeoffs",
        paragraphs: [
          "JPG often wins on size for photos, while PNG often wins on clarity for screenshots and graphic assets. If you only optimize for file weight, you can easily damage the part of the image that matters most.",
          "A useful habit is to separate working files from delivery files. Keep the format that preserves the image best while you work, then convert or compress once you know the real destination.",
        ],
      },
      {
        title: "How to decide quickly",
        paragraphs: [
          "Use JPG when you want a lighter photo file and broad compatibility. Use PNG when you need transparency, crisp text, or a safer editing source. That rule handles most day-to-day image choices.",
          "If the destination is fixed, let the destination decide. Otherwise, test both once and compare clarity and size in the actual context where the image will be used.",
        ],
      },
    ],
  },
  {
    slug: "png-vs-webp",
    title: "PNG vs WebP",
    description:
      "Understand when PNG is still the better source format and when WebP is the better publishing format for lighter web delivery.",
    cardDescription:
      "See when PNG is better for source graphics and when WebP is better for lighter web delivery.",
    sections: [
      {
        title: "They solve different publishing stages",
        paragraphs: [
          "PNG and WebP can both work on the web, but they often belong to different steps in a workflow. PNG is often the easier source or editing format, while WebP is often the better final delivery format when speed matters.",
          "That difference becomes clearer when you think about the image lifecycle. A design team may work in PNG first, then export WebP only when the image is ready to be published.",
        ],
      },
      {
        title: "Why PNG is still useful",
        paragraphs: [
          "PNG remains strong for logos, diagrams, app screenshots, interface assets, and transparent graphics. It is reliable, easy to inspect, and often friendlier for reuse in design and documentation work.",
          "If an image still needs annotation, cropping, markup, or further edits, PNG is often easier to keep around. It makes sense as a working file even when it is not the best format for the public page.",
        ],
      },
      {
        title: "Why WebP is attractive for delivery",
        paragraphs: [
          "WebP is often lighter than PNG for publishing, especially when page speed matters. That makes it helpful for landing pages, article imagery, ecommerce assets, and content-heavy pages where image weight adds up fast.",
          "For many teams, WebP is not about novelty. It is simply a practical way to reduce weight without introducing a completely different workflow.",
        ],
      },
      {
        title: "Compatibility and reuse",
        paragraphs: [
          "WebP is widely supported, but PNG is still easier to pass through mixed business tools, older editors, and some internal workflows. If the image will be repurposed outside the web, PNG may still be the safer archive format.",
          "That is why many sites keep a PNG original and create a WebP publishing copy. It is a simple split between source quality and delivery efficiency.",
        ],
      },
      {
        title: "A practical rule",
        paragraphs: [
          "Keep PNG when you need a reusable source, transparency, or crisp graphic detail. Use WebP when you want a lighter public-facing file. That division keeps the decision simple without forcing one format everywhere.",
          "If you are unsure, compare the published result in both formats and check the weight difference. Practical testing is often more useful than general advice alone.",
        ],
      },
    ],
  },
  {
    slug: "pdf-workflows",
    title: "How to choose the right PDF tool",
    description:
      "A task-based guide to choosing between merging, splitting, converting, compressing, rotating, and cleaning PDFs depending on what you need to do next.",
    cardDescription:
      "Learn when to merge, split, convert, clean up, or optimize PDFs depending on the task in front of you.",
    sections: [
      {
        title: "Start from the task, not the file type",
        paragraphs: [
          "PDF work becomes much easier when you describe the job in plain language first. Do you need one file instead of many, only a few pages instead of all pages, or an image instead of a document? That question usually points to the right tool immediately.",
          "People often lose time because they open the wrong tool family first. The file may be a PDF in every case, but merging, splitting, deleting pages, compressing, and converting are different tasks with different goals.",
        ],
      },
      {
        title: "When merge is the right move",
        paragraphs: [
          "If you need to send a packet, combine chapters, gather supporting documents, or turn scattered files into one deliverable, merging is usually the first step. It reduces friction for the person receiving the document and makes the package easier to store later.",
          "Merging is especially useful when order matters. A clear sequence often matters more than keeping files separate.",
        ],
      },
      {
        title: "When split or page cleanup is better",
        paragraphs: [
          "If the recipient only needs part of the document, splitting or removing pages is more precise than sending everything. It keeps the file focused and reduces the review burden for the other side.",
          "This matters most for long reports, draft decks, scanned packets, and submission bundles where only a specific range is relevant. Cleanup tools are best when you want a smaller, cleaner version of the same document.",
        ],
      },
      {
        title: "When conversion makes sense",
        paragraphs: [
          "Convert PDF pages to JPG or PNG when the document needs to become a visual asset. That often happens with slide previews, excerpts for reports, social posts, thumbnails, or image-based editing.",
          "Go the other direction when you have many images that should live in one portable document. Image-to-PDF is useful for scans, submission packs, and simple multi-page exports.",
        ],
      },
      {
        title: "When compression matters",
        paragraphs: [
          "Compression matters when upload limits, email size limits, or storage constraints are the main problem. It is often the last polishing step before submission or sharing.",
          "The main tradeoff is readability. If the PDF contains detailed charts or small text, always check whether the smaller file is still fit for the real destination before you send it.",
        ],
      },
    ],
  },
  {
    slug: "heic-to-jpg-guide",
    title: "When to convert HEIC to JPG",
    description:
      "A practical guide to deciding when an iPhone HEIC photo should stay as-is and when it should be converted to JPG for easier sharing and compatibility.",
    cardDescription:
      "Learn when HEIC is fine to keep and when converting to JPG is the safer move for uploads and sharing.",
    sections: [
      {
        title: "Why HEIC becomes a workflow problem",
        paragraphs: [
          "HEIC works well inside Apple-heavy environments, but it can still create friction in mixed-device workflows, upload forms, older Windows machines, and business tools that expect JPG instead.",
          "The problem is not usually image quality. The problem is that compatibility breaks at the exact moment you need the image to move smoothly between systems.",
        ],
      },
      {
        title: "Why JPG is often safer",
        paragraphs: [
          "JPG is broadly accepted almost everywhere. If you are sending photos to another person, uploading to a website, using a form, or passing assets into a business tool, JPG is often the least risky format.",
          "That wide compatibility makes it a practical delivery format even if HEIC remains your storage format on the phone.",
        ],
      },
      {
        title: "When HEIC is fine to keep",
        paragraphs: [
          "If the image stays inside your own Apple workflow, HEIC may be perfectly fine. It can be efficient for storage and does not automatically need to be converted just because it came from an iPhone.",
          "Still, the moment a file needs to leave that environment, it helps to know you can produce a JPG quickly without friction.",
        ],
      },
      {
        title: "What to check before conversion",
        paragraphs: [
          "Ask what the destination expects. If the upload target, teammate, or client already wants JPG, convert first and avoid delays. If the destination is flexible, you can decide based on convenience and file handling.",
          "Also check whether size changes or extra optimization will be needed after conversion. Sometimes HEIC-to-JPG is only the first step before compression or resizing.",
        ],
      },
      {
        title: "A practical workflow",
        paragraphs: [
          "For sharing, uploads, and mixed-device work, convert HEIC to JPG first. Then resize or compress only if the destination requires it. That order solves the compatibility problem before anything else.",
          "This keeps the process simple and reduces the chance of doing extra work on a file that still cannot be accepted by the final platform.",
        ],
      },
    ],
  },
  {
    slug: "compress-images-without-losing-quality",
    title: "How to compress images without ruining quality",
    description:
      "A practical guide to reducing image size while protecting the part of the image that actually matters for readers, customers, or reviewers.",
    cardDescription:
      "Learn how format choice, dimensions, and compression work together when you want smaller images without obvious damage.",
    sections: [
      {
        title: "Compression is only one part of optimization",
        paragraphs: [
          "People often jump straight to compression settings, but image weight is also shaped by format and dimensions. If the file is too large for the way it will be displayed, compression alone is not the cleanest fix.",
          "That is why image optimization works best as a sequence. First match the format to the content, then match the size to the display, and only then compress if more reduction is still needed.",
        ],
      },
      {
        title: "Treat photos and graphics differently",
        paragraphs: [
          "Photographs usually compress well in JPG or WebP, while screenshots, interface captures, and text-heavy diagrams can show artifacts quickly if treated the same way. The content type should shape the compression strategy.",
          "Trying one aggressive setting for every image often creates uneven results. It is better to decide whether the file behaves like a photo or a graphic asset first.",
        ],
      },
      {
        title: "Format changes can outperform compression",
        paragraphs: [
          "A photo stored as PNG can sometimes shrink dramatically just by becoming JPG or WebP. In those cases, changing the format is more effective than squeezing the original format harder.",
          "The reverse is also true. A transparent or text-heavy asset may become less usable if you force it into JPG just for weight savings, so practical fit matters more than theoretical reduction.",
        ],
      },
      {
        title: "Oversized dimensions create waste",
        paragraphs: [
          "If a page only shows an image at a modest width, an ultra-large source file may be carrying far more pixels than the page needs. Resizing before compressing can protect quality better than compression alone.",
          "This is especially true for web publishing. A right-sized image often looks just as good in context while requiring much less transfer.",
        ],
      },
      {
        title: "A safer workflow",
        paragraphs: [
          "Start by confirming the destination, then fix the format, then resize to the right display range, and only then compress. That sequence preserves the most control and reduces the odds of visible quality damage.",
          "It also makes troubleshooting easier. If the image looks bad later, you can tell whether the real issue came from format, dimensions, or compression strength.",
        ],
      },
    ],
  },
  {
    slug: "pdf-to-jpg-guide",
    title: "When to convert PDF to JPG",
    description:
      "Learn when a PDF page should stay in document form and when it is more useful as a JPG image for sharing, presentation, or reuse.",
    cardDescription:
      "Understand when PDF pages are better as JPG images and when the original PDF should stay intact.",
    sections: [
      {
        title: "PDF is not always the most reusable format",
        paragraphs: [
          "PDF is excellent for preserving a document as a package, but it is not always the easiest format to reuse in other publishing or editing contexts. If you need one page as a visual asset, an image can be easier to move around.",
          "That is why PDF-to-image conversion matters. It turns a document page into something you can place in slides, posts, reports, or previews without requiring a PDF workflow everywhere.",
        ],
      },
      {
        title: "Where JPG output helps",
        paragraphs: [
          "JPG output is useful when you want broad compatibility and lighter image files. It works well for sharing page previews, creating thumbnails, dropping a page into a presentation, or using document content in visual channels.",
          "For social posts, lightweight previews, and quick collaboration, JPG is often the more flexible destination than a full PDF.",
        ],
      },
      {
        title: "Where PDF should stay PDF",
        paragraphs: [
          "Keep the file as PDF when page order, text searchability, formal submission rules, or multi-page integrity matter. Contracts, submission packets, and distribution-ready documents usually belong in PDF form.",
          "Converting those files to JPG can make the document easier to preview but harder to manage as a real document.",
        ],
      },
      {
        title: "Think about readability",
        paragraphs: [
          "If the page contains small text or detailed diagrams, readability matters more than raw size reduction. A lighter JPG is not helpful if the real destination requires zooming or careful reading.",
          "The right output depends on whether the image is a quick visual reference or a page readers must inspect closely.",
        ],
      },
      {
        title: "A practical decision rule",
        paragraphs: [
          "Convert PDF to JPG when you need pages as images for previews, reuse, or lightweight sharing. Keep the PDF when the file is still meant to function as a structured document.",
          "If you are unsure, ask whether the recipient needs a document or a picture of a document. That answer usually resolves the decision quickly.",
        ],
      },
    ],
  },
  {
    slug: "resize-images-for-web",
    title: "How to resize images for the web",
    description:
      "A guide to choosing image dimensions that are large enough to look good, but not so large that they slow the page down.",
    cardDescription:
      "Learn how width, height, display context, and file weight work together when preparing images for web publishing.",
    sections: [
      {
        title: "Resizing is often the cleanest first step",
        paragraphs: [
          "When images feel too heavy on the web, people often think about compression first. But if the dimensions are far larger than the actual display area, resizing is frequently the cleaner and more predictable improvement.",
          "This matters because extra pixels create weight even before compression settings enter the conversation. A right-sized image gives every later optimization step a better starting point.",
        ],
      },
      {
        title: "Think in placements, not just pixels",
        paragraphs: [
          "A hero image, a blog inline image, a product thumbnail, and a card preview do not need the same width. Resizing should follow the actual placement where the image will appear.",
          "That placement-first mindset prevents oversized uploads and helps standardize image handling across a site.",
        ],
      },
      {
        title: "Protect the aspect ratio",
        paragraphs: [
          "In most cases, preserving the original aspect ratio is the safest choice. Stretching width or height independently creates obvious visual distortion and makes even a good image feel unprofessional.",
          "If a strict target size is required, cropping combined with resizing often gives a cleaner result than forcing the whole image into an awkward box.",
        ],
      },
      {
        title: "Resize before deeper optimization",
        paragraphs: [
          "Once dimensions fit the intended placement, it becomes easier to judge whether format conversion or compression is still necessary. Many files become acceptable after resizing alone.",
          "That sequence also helps protect quality. It is easier to keep a strong visual result when you are not compressing a file that is still oversized in the first place.",
        ],
      },
      {
        title: "A practical publishing workflow",
        paragraphs: [
          "Check the destination width, resize to fit that range, then decide whether the image should stay in the same format or move to a lighter one. Compression comes last if you still need more savings.",
          "This step-by-step approach keeps the process simple and avoids over-editing the file before you know what the page really needs.",
        ],
      },
    ],
  },
  {
    slug: "merge-or-split-pdf",
    title: "When to merge a PDF and when to split it",
    description:
      "A practical guide to deciding whether multiple PDFs should become one file or whether one long file should be broken into smaller parts.",
    cardDescription:
      "Understand when to combine PDFs into one file and when to split a file into smaller, more targeted documents.",
    sections: [
      {
        title: "The real question is how people will consume the file",
        paragraphs: [
          "Merging and splitting look like opposite actions, but both serve the same goal: giving people the right amount of document in the easiest form. The best option depends on how the file will be reviewed, shared, stored, or submitted.",
          "That is why it helps to think about the reader first. Are they meant to see a complete packet, or only one relevant section?",
        ],
      },
      {
        title: "When merging is better",
        paragraphs: [
          "Merge PDFs when several files belong together as one deliverable. This is common for proposal packets, chapter bundles, submission sets, or multi-part documentation that should be reviewed in one pass.",
          "A single combined file can make handoff cleaner and reduce confusion about ordering.",
        ],
      },
      {
        title: "When splitting is better",
        paragraphs: [
          "Split a PDF when only certain pages matter to the next step. This is useful for approvals, excerpts, chapter extraction, limited sharing, and focused review workflows.",
          "It keeps the file smaller and helps the recipient avoid irrelevant material, which is often more respectful of their time.",
        ],
      },
      {
        title: "How to decide fast",
        paragraphs: [
          "If the content should be treated as one packet, merge it. If the content should be narrowed to specific parts, split it. That simple distinction is usually enough to choose the right tool without overthinking.",
          "You can refine the decision further by asking whether the document needs continuity or precision. Continuity usually favors merge; precision usually favors split.",
        ],
      },
      {
        title: "These actions often work together",
        paragraphs: [
          "In real workflows, teams often merge first and split later, or split first and merge targeted files into a new packet. The tools are not rivals so much as adjacent steps in document cleanup.",
          "That is why it helps to think in workflows instead of single actions. One operation often sets up the next one.",
        ],
      },
    ],
  },
  {
    slug: "choose-best-image-format-for-web",
    title: "How to choose the best image format for the web",
    description:
      "A practical guide to choosing between JPG, PNG, and WebP for web publishing based on speed, clarity, transparency, and reuse.",
    cardDescription:
      "Learn how JPG, PNG, and WebP fit different web publishing needs when you care about both speed and quality.",
    sections: [
      {
        title: "Web images need more than visual quality",
        paragraphs: [
          "A web image has to look good, but it also has to load efficiently and fit the real page context. That means format choice affects not just aesthetics but speed, performance, and publishing friction.",
          "If you only optimize for appearance, pages can become unnecessarily heavy. If you only optimize for size, graphics can lose clarity where it matters most.",
        ],
      },
      {
        title: "JPG and WebP for photographs",
        paragraphs: [
          "For photo-heavy content, JPG and WebP are usually the main candidates. JPG is broadly compatible and easy to manage, while WebP often gives you lighter publishing assets for the same general kind of content.",
          "That makes JPG a comfortable baseline and WebP a strong optimization layer when page speed deserves extra attention.",
        ],
      },
      {
        title: "PNG for graphics and transparency",
        paragraphs: [
          "PNG is still the practical choice for transparent assets, logos, screenshots, and graphic-heavy images with text. It often behaves better as a source or working format, especially when the image may be edited later.",
          "The main caution is weight. PNG can be excellent for working quality while still being too heavy for final delivery in some web contexts.",
        ],
      },
      {
        title: "Size still matters alongside format",
        paragraphs: [
          "Even the right format can be inefficient if the dimensions are too large for the layout. That is why web optimization usually works best when resizing and format choice are handled together rather than separately.",
          "A good publishing process checks the page placement first, then chooses the format that fits the content and the delivery goal.",
        ],
      },
      {
        title: "A practical rule for web teams",
        paragraphs: [
          "Keep source-friendly files where needed, but publish with the lightest format that still preserves the image well enough for its role. For many teams, that means PNG for source graphics, JPG for standard photo delivery, and WebP for lighter final output.",
          "The exact mix depends on your workflow, but that rule gives you a stable starting point that is easy to apply across many pages.",
        ],
      },
    ],
  },
  {
    slug: "how-to-remove-pages-from-pdf",
    title: "How to remove unwanted pages from a PDF",
    description:
      "A practical guide to cleaning up PDFs by removing extra pages without overcomplicating the file or turning a simple edit into a larger restructuring task.",
    cardDescription:
      "Learn when page removal is the right PDF cleanup step and how it differs from splitting a file.",
    sections: [
      {
        title: "Page removal is a cleanup task",
        paragraphs: [
          "Removing pages is usually the right choice when the document is mostly correct and only a few pages should disappear. It is a cleanup step, not a full restructuring step.",
          "That makes it especially useful late in a workflow, just before sharing, submission, or final export.",
        ],
      },
      {
        title: "Typical cases where removal helps",
        paragraphs: [
          "Common examples include deleting blank scan pages, draft covers, duplicate pages, appendix pages that should not be shared, or internal-only material before an external handoff.",
          "In those cases, page removal is often faster and cleaner than splitting the whole file into multiple parts.",
        ],
      },
      {
        title: "How it differs from splitting",
        paragraphs: [
          "Splitting creates separate files from a larger document. Removing pages keeps the same document structure but trims away pieces you no longer want. They are related tools, but they answer different questions.",
          "If the goal is still one document, just cleaner, removal is usually the simpler choice.",
        ],
      },
      {
        title: "What to check before deleting",
        paragraphs: [
          "Before removing pages, confirm that page references, section flow, and numbering still make sense. A page that looks unnecessary in isolation can still support the logic of the pages around it.",
          "It is also wise to keep the original untouched version, especially when the PDF is part of a larger review or submission workflow.",
        ],
      },
      {
        title: "A practical cleanup approach",
        paragraphs: [
          "Use page removal when you want the same PDF, just cleaner. Use splitting when you need multiple outputs. Use merging when the job is the opposite and scattered files need to become one document.",
          "Thinking about those three operations together makes PDF cleanup much easier to manage in real projects.",
        ],
      },
    ],
  },
  {
    slug: "prepare-images-for-upload",
    title: "How to prepare images before upload",
    description:
      "A practical upload checklist for matching image format, file size, dimensions, and visual quality before sending files to forms, dashboards, email, or CMS tools.",
    cardDescription:
      "Check format, size, dimensions, and image quality in the right order before uploading or sending images.",
    sections: [
      {
        title: "Start with the upload requirements",
        paragraphs: [
          "Many upload problems happen because the image does not match the destination requirements. Before converting or compressing, check the accepted formats, maximum file size, recommended dimensions, aspect ratio, and whether transparency is allowed.",
          "For example, a form that only accepts JPG may reject PNG, WebP, or HEIC. A logo that needs transparency should not be flattened into JPG. Reading the requirements first can prevent a lot of unnecessary trial and error.",
        ],
      },
      {
        title: "Match the file format first",
        paragraphs: [
          "If the destination requires a specific format, start with conversion. iPhone photos may need HEIC to JPG, downloaded web images may need WebP to JPG or PNG, and screenshots may need to stay PNG if text clarity matters.",
          "Conversion does not magically improve quality. Its main purpose is compatibility. After converting, open the result once and check text edges, colors, and transparency before continuing.",
        ],
      },
      {
        title: "Resize and compress only after the format is right",
        paragraphs: [
          "If the image is still too large, use resizing and compression. A good order is to resize the image close to the final display size first, then compress it. That usually gives a cleaner result than heavy compression alone.",
          "Photos often compress well, while screenshots, diagrams, and images with small text can show artifacts faster. Always check readability after reducing file size.",
        ],
      },
      {
        title: "Do a visual check before sending",
        paragraphs: [
          "Before upload, check file name, orientation, blank margins, cropping, watermark placement, and text readability. Phone photos can sometimes appear rotated, and screenshots often include extra space that does not need to be sent.",
          "If needed, rotate, crop, resize, or compress the image before submitting. The goal is not just a file that uploads, but a file that is easy for the recipient to understand.",
        ],
      },
      {
        title: "A practical upload workflow",
        paragraphs: [
          "A reliable order is: check requirements, convert format, resize dimensions, compress file size, then review the final image. This keeps each decision separate and easier to fix.",
          "AI Image Tools includes HEIC to JPG, WebP to JPG, image resize, image compress, crop image, and other tools that fit this upload preparation workflow in the browser.",
        ],
      },
    ],
  },
  {
    slug: "iphone-photos-to-pdf",
    title: "How to turn iPhone photos into a submission PDF",
    description:
      "A step-by-step guide for converting iPhone photos into a clean PDF for school, work, forms, applications, or document sharing.",
    cardDescription:
      "Convert HEIC photos to JPG, clean them up if needed, and combine them into a readable PDF.",
    sections: [
      {
        title: "iPhone photos may need conversion first",
        paragraphs: [
          "iPhone photos are often stored as HEIC files. That format works well inside Apple devices, but it can cause problems in older systems, workplace tools, upload forms, or email workflows.",
          "If the goal is submission, JPG is usually the safer intermediate format. Converting HEIC to JPG first makes the files easier to review, compress, and combine into a PDF.",
        ],
      },
      {
        title: "Select only the photos you need",
        paragraphs: [
          "Before making a PDF, remove duplicate shots, blurry photos, screenshots with private information, and images with too much irrelevant background. A cleaner input set creates a cleaner PDF.",
          "For photos of documents, check whether the text is readable, the page is not too skewed, and shadows are not hiding important details. Retaking the photo is often better than trying to fix a poor source later.",
        ],
      },
      {
        title: "Convert and clean up before creating the PDF",
        paragraphs: [
          "Convert HEIC photos to JPG first. If the files are large, compress the JPG images. If orientation or framing is wrong, use rotate or crop before creating the PDF.",
          "Cleaning the images first usually creates a better final document than trying to fix everything after the PDF has already been created.",
        ],
      },
      {
        title: "Watch page order and file size",
        paragraphs: [
          "When combining images into a PDF, page order matters. Receipts, application photos, study notes, and scanned documents should be arranged in the order the reader expects.",
          "Many photos can create a large PDF, so check any file size limit before submission. If needed, compress images before creating the PDF or compress the finished PDF afterward.",
        ],
      },
      {
        title: "Final review before sending",
        paragraphs: [
          "Open the PDF once before sending it. Check missing pages, page order, readability, and whether any unwanted image slipped in. A quick review can prevent a lot of submission mistakes.",
          "AI Image Tools includes HEIC to JPG, JPG compress, rotate image, crop image, image to PDF, and compress PDF tools that fit this workflow.",
        ],
      },
    ],
  },
  {
    slug: "optimize-blog-and-site-images",
    title: "How to optimize blog and website images",
    description:
      "A practical guide to making blog, landing page, ecommerce, and portfolio images lighter without losing the visual quality that matters.",
    cardDescription:
      "Resize, convert, and compress website images while keeping a good balance between loading speed and appearance.",
    sections: [
      {
        title: "Website images need both quality and speed",
        paragraphs: [
          "Images for blogs and websites should look good, but they should not make pages unnecessarily heavy. Oversized or uncompressed images can slow down mobile visitors and make the page feel less reliable.",
          "At the same time, excessive compression can damage trust, especially for product photos, portfolio images, and instructional graphics. The goal is a balanced final file.",
        ],
      },
      {
        title: "Resize before compressing",
        paragraphs: [
          "One common mistake is uploading images that are much larger than they will ever appear on the page. A 4000px image displayed at 800px is wasting data before compression even begins.",
          "Resize the image near the real display size first, then compress it. This often gives a cleaner and lighter result than trying to solve everything with heavy compression.",
        ],
      },
      {
        title: "Choose the format by image type",
        paragraphs: [
          "JPG is a practical choice for photos, PNG is useful for transparent graphics and screenshots, and WebP is often strong for final web delivery. Choosing by image type usually works better than forcing every image into one format.",
          "If you may need to edit the asset later, keep a source-friendly version such as PNG or JPG and create a lighter WebP only for publishing.",
        ],
      },
      {
        title: "Compare the compressed result",
        paragraphs: [
          "After compression, check the image visually. For portraits, look at skin and background texture. For product photos, check edges and small details. For screenshots, confirm text is still readable.",
          "If the result looks too rough, reduce compression strength, resize more carefully, or try another format. Image optimization is usually a combination of small decisions rather than one setting.",
        ],
      },
      {
        title: "A reliable publishing workflow",
        paragraphs: [
          "A simple workflow is: confirm use case, resize dimensions, choose or convert format, compress, then preview on the page. Resizing first reduces the need for aggressive compression.",
          "AI Image Tools includes resize image, JPG compress, PNG compress, WebP compress, JPG to WebP, and PNG to WebP tools for preparing web images in the browser.",
        ],
      },
    ],
  },
];

const guideMap = {
  ja: jaGuides,
  en: enGuides,
} satisfies Record<GuideLocale, GuideEntry[]>;

export function getGuides(locale: GuideLocale) {
  return guideMap[locale];
}

export function getGuide(locale: GuideLocale, slug: string) {
  return guideMap[locale].find((guide) => guide.slug === slug);
}

