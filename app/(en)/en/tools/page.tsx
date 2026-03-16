import Link from "next/link";

type ToolCategory = {
  title: string;
  description: string;
  tools: { name: string; href: string; description: string }[];
};

const categories: ToolCategory[] = [
  {
    title: "Image Conversion",
    description: "Convert image files into different formats.",
    tools: [
      {
        name: "JPG to PNG",
        href: "/tools/jpg-to-png",
        description: "Convert JPG images to PNG format.",
      },
      {
        name: "PNG to JPG",
        href: "/tools/png-to-jpg",
        description: "Convert PNG images to JPG format.",
      },
      {
        name: "WebP to PNG",
        href: "/tools/webp-to-png",
        description: "Convert WebP images to PNG format.",
      },
      {
        name: "WebP to JPG",
        href: "/tools/webp-to-jpg",
        description: "Convert WebP images to JPG format.",
      },
      {
        name: "JPG to WebP",
        href: "/tools/jpg-to-webp",
        description: "Convert JPG images to WebP format.",
      },
      {
        name: "PNG to WebP",
        href: "/tools/png-to-webp",
        description: "Convert PNG images to WebP format.",
      },
    ],
  },
  {
    title: "Image Editing",
    description: "Resize, compress and adjust image files.",
    tools: [
      {
        name: "Image Compress",
        href: "/tools/image-compress",
        description: "Reduce image file size.",
      },
      {
        name: "Resize Image",
        href: "/tools/resize-image",
        description: "Change image dimensions.",
      },
      {
        name: "Crop Image",
        href: "/tools/crop-image",
        description: "Crop the image.",
      },
      {
        name: "Rotate Image",
        href: "/tools/rotate-image",
        description: "Rotate the image.",
      },
    ],
  },
  {
    title: "PDF Tools",
    description: "Convert, merge and edit PDF files.",
    tools: [
      {
        name: "Image to PDF",
        href: "/tools/image-to-pdf",
        description: "Convert images to PDF.",
      },
      {
        name: "PDF to JPG",
        href: "/tools/pdf-to-jpg",
        description: "Convert PDF pages to JPG.",
      },
      {
        name: "PDF to PNG",
        href: "/tools/pdf-to-png",
        description: "Convert PDF pages to PNG.",
      },
      {
        name: "Merge PDF",
        href: "/tools/merge-pdf",
        description: "Merge multiple PDF files.",
      },
    ],
  },
];

export const metadata = {
  title: "All Tools - AI Image Tools",
  description:
    "Browse free online image conversion, image editing and PDF tools.",
};

export default function EnglishToolsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-gray-200 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              All Image & PDF Tools
            </h1>
            <p className="text-lg leading-8 text-gray-600">
              Browse free online tools for image conversion, compression,
              resizing and PDF processing.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {categories.map((category) => (
            <section key={category.title} className="space-y-5">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {category.title}
                </h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {category.tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:border-gray-300 hover:shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-gray-900">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {tool.description}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}