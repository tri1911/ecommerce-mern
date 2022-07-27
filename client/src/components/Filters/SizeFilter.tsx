import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { Size } from "../../services/category.service";
import useFilterCheckboxHandler from "../../hooks/useFilterCheckboxHandler";

function SizeItem({
  value,
  checked,
  onChange,
}: {
  value: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `size-${value}`;

  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        name="size"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className={cn("product-size-box", {
          "bg-primary text-white": checked,
        })}
      >
        {value}
      </label>
    </div>
  );
}

export default function SizeFilter({ sizes }: { sizes?: Size[] }) {
  const [searchParams] = useSearchParams();
  const handleSizeChanged = useFilterCheckboxHandler();

  if (!sizes) {
    return null;
  }

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">size</h3>
      <div className="flex items-center space-x-2">
        {sizes.map(({ _id }) => (
          <SizeItem
            key={_id}
            value={_id}
            checked={searchParams.getAll("size").includes(_id)}
            onChange={handleSizeChanged}
          />
        ))}
      </div>
    </div>
  );
}
