type Props = {
  children: React.ReactNode;
};

export default function FormSection({ children }: Props) {
  return (
    <div className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}