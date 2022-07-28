import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import useFilterCheckboxHandler from "../../hooks/useFilterCheckboxHandler";
import { Color } from "../../services/category.service";

export function ColorItem({
  value,
  checked,
  onChange,
}: {
  value: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `color-${value}`;
  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        name="color"
        value={value}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        style={{ backgroundColor: value }}
        className={cn("product-color-box", {
          "ring-2 ring-primary": checked,
        })}
      />
    </div>
  );
}

export default function ColorFilter({ colors }: { colors: Color[] }) {
  const [searchParams] = useSearchParams();
  const handleColorChanged = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 font-medium uppercase">
        color
      </h3>
      <div className="flex items-center space-x-2">
        {colors.map(({ _id: color }) => (
          <ColorItem
            key={color}
            value={color}
            checked={searchParams.getAll("color").includes(color)}
            onChange={handleColorChanged}
          />
        ))}
      </div>
    </div>
  );
}
