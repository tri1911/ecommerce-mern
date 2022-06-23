import { useSearchParams } from "react-router-dom";
import { Size } from "../../types";

export const SIZES = ["xs", "s", "m", "l", "xl"] as const;

function SizeItem({
  size,
  onChange,
  checked,
}: {
  size: Size;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="size-filter">
      <input
        className="hidden"
        type="radio"
        id={`size-${size}`}
        name="size"
        value={size}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={`size-${size}`}
        className="text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600"
      >
        {size.toUpperCase()}
      </label>
    </div>
  );
}

// NOTE: where should I put onChangeHandler?
export default function SizeFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSizeChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;

    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((size) => (
          <SizeItem
            key={size}
            size={size}
            checked={searchParams.get("size") === size}
            onChange={handleSizeChanged}
          />
        ))}
      </div>
    </div>
  );
}
