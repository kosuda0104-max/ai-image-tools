type Props = {
  status: string;
};

export default function StatusMessage({ status }: Props) {
  if (!status) return null;

  const className = `rounded-xl border p-4 text-sm ${
    status.startsWith("エラー")
      ? "border-red-200 bg-red-50 text-red-700"
      : status.startsWith("完了")
      ? "border-green-200 bg-green-50 text-green-700"
      : "border-gray-200 bg-gray-50 text-gray-600"
  }`;

  return <div className={className}>{status}</div>;
}