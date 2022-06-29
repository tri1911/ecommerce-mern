import cn from "classnames";
import { useSearchParams } from "react-router-dom";
import { useFilterCheckboxHandler } from "../../app/hooks";
import { COLORS } from "../../types";

export function ColorItem({
  colorName,
  hexCode,
  checked,
  onChange,
}: {
  colorName: string;
  hexCode: string;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `color-${colorName}`;

  return (
    <div>
      <input
        className="hidden"
        type="checkbox"
        id={id}
        name="color"
        value={colorName}
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        style={{ backgroundColor: hexCode }}
        className={cn("product-color-box", {
          "ring-2 ring-primary": checked,
        })}
      />
    </div>
  );
}

export default function ColorFilter() {
  const [searchParams] = useSearchParams();
  const handleColorChanged = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        color
      </h3>
      <div className="flex items-center gap-2">
        {Object.entries(COLORS).map(([colorName, hexCode]) => (
          <ColorItem
            key={colorName}
            colorName={colorName}
            hexCode={hexCode}
            checked={searchParams.getAll("color").includes(colorName)}
            onChange={handleColorChanged}
          />
        ))}
      </div>
    </div>
  );
}
