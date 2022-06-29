import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { useFilterCheckboxHandler } from "../../app/hooks";
import { Size, SIZES } from "../../types";

function SizeItem({
  value,
  checked,
  onChange,
}: {
  value: Size;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id={`size-${value}`}
        name="size"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={`size-${value}`}
        className={cn("product-size-box", {
          "bg-primary text-white": checked,
        })}
      >
        {value.toUpperCase()}
      </label>
    </div>
  );
}

export default function SizeFilter() {
  const [searchParams] = useSearchParams();
  const handleSizeChanged = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((value) => (
          <SizeItem
            key={value}
            value={value}
            checked={searchParams.getAll("size").includes(value)}
            onChange={handleSizeChanged}
          />
        ))}
      </div>
    </div>
  );
}
