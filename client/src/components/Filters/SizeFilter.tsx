import classNames from "classnames";
import { useSearchParams } from "react-router-dom";
import { useFilterRadioHandler } from "../../app/hooks";
import { Size, SIZES } from "../../types";

export function SizeItem({
  value,
  checked,
  onChange,
}: {
  value: Size;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const labelClassName = classNames(
    "text-xs border border-gray-200 rounded-sm h-6 w-6 flex items-center justify-center cursor-pointer shadow-sm text-gray-600",
    { "bg-primary text-white": checked }
  );

  return (
    <div>
      <input
        className="hidden"
        type="radio"
        id={`size-${value}`}
        name="size"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={`size-${value}`} className={labelClassName}>
        {value.toUpperCase()}
      </label>
    </div>
  );
}

// TODO: clicking on the currently-active button should de-active it
export default function SizeFilter() {
  const [searchParams] = useSearchParams();
  // NOTE: should put onChangeHandler here?
  const handleSizeChanged = useFilterRadioHandler();

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((value) => (
          <SizeItem
            key={value}
            value={value}
            checked={searchParams.get("size") === value}
            onChange={handleSizeChanged}
          />
        ))}
      </div>
    </div>
  );
}
