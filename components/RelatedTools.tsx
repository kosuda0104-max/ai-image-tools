import Link from "next/link";

type Tool = {
  name: string;
  href: string;
};

type Props = {
  items: Tool[];
};

export default function RelatedTools({ items }: Props) {
  if (!items.length) return null;

  return (
    <section className="space-y-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-semibold">関連ツール</h2>

      <div className="flex flex-wrap gap-3">
        {items.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-50"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}