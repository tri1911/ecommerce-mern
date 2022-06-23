import { useSearchParams } from "react-router-dom";
import { useFilterRadioHandler } from "../../app/hooks";
import { Size, SIZES } from "../../types";

function SizeItem({
  size,
  checked,
  onChange,
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

// TODO: clicking on the currently-active button should de-active it
// NOTE: should put onChangeHandler here?
export default function SizeFilter() {
  const [searchParams] = useSearchParams();
  const handleSizeChanged = useFilterRadioHandler();

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((size) => {
          const isSelected = searchParams.get("size") === size;

          return (
            <SizeItem
              key={size}
              size={size}
              checked={isSelected}
              onChange={handleSizeChanged}
            />
          );
        })}
      </div>
    </div>
  );
}
