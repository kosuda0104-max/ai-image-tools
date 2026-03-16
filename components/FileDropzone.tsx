type Props = {
  file: File | null;
  accept: string;
  emptyTitle: string;
  onFileSelect: (file: File | null) => void;
};

export default function FileDropzone({
  file,
  accept,
  emptyTitle,
  onFileSelect,
}: Props) {
  return (
    <label
      htmlFor="fileUpload"
      className="block border-2 border-dashed rounded-xl p-8 text-center cursor-pointer hover:bg-gray-50"
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const f = e.dataTransfer.files?.[0] || null;
        onFileSelect(f);
      }}
    >

      <input
        id="fileUpload"
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) =>
          onFileSelect(e.target.files?.[0] || null)
        }
      />

      <div className="space-y-2">

        <div className="text-sm text-gray-600">
          {file ? "選択中のファイル" : emptyTitle}
        </div>

        <div className="text-lg font-semibold">
          {file ? file.name : "ここにファイルをドロップ"}
        </div>

        <div className="text-sm text-gray-500">
          またはクリックして選択
        </div>

        <div className="inline-flex bg-black text-white px-4 py-2 rounded-lg">
          ファイルを選択
        </div>

      </div>

    </label>
  );
}