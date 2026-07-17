type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({ children, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-teal-700 text-white py-3 rounded-lg font-medium hover:bg-teal-800 transition disabled:opacity-40"
    >
      {children}
    </button>
  );
}