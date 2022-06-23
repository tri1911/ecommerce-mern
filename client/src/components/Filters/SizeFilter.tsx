const SIZES = ["xs", "s", "m", "l", "xl"] as const;

function SizeItem({ size }: { size: typeof SIZES[number] }) {
  return (
    <div className="size-filter">
      <input type="radio" name="size" className="hidden" id={`size-${size}`} />
      <label
        htmlFor={`size-${size}`}
        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
      >
        {size.toUpperCase()}
      </label>
    </div>
  );
}

export default function SizeFilter() {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((size) => (
          <SizeItem key={size} size={size} />
        ))}
      </div>
    </div>
  );
}
