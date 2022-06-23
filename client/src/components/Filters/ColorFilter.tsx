import { useSearchParams } from "react-router-dom";
import { COLORS } from "../../types";

function ColorItem({
  colorName,
  hexCode,
  onChange,
}: {
  colorName: string;
  hexCode: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const id = `color-${colorName}`;

  return (
    <div className="color-filter">
      <input
        className="hidden"
        type="radio"
        id={id}
        name="color"
        value={colorName}
        onChange={onChange}
      />
      <label
        htmlFor={id}
        style={{ backgroundColor: hexCode }}
        className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
      />
    </div>
  );
}

export default function ColorFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleColorChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;

    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

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
            onChange={handleColorChanged}
          />
        ))}
      </div>
    </div>
  );
}
