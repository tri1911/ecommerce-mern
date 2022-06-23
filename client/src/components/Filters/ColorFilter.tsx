type Color = { name: string; code: string };

const COLORS: Color[] = [
  { name: "red", code: "#fc3d57" },
  { name: "white", code: "#fff" },
  { name: "black", code: "#000" },
];

function ColorItem({ color: { name, code } }: { color: Color }) {
  return (
    <div className="color-filter">
      <input
        type="radio"
        name="color"
        className="hidden"
        id={`color-${name}`}
      />
      <label
        htmlFor={`color-${name}`}
        style={{ backgroundColor: code }}
        className="text-xs border border-gray-200 rounded-sm h-5 w-5 flex items-center justify-center cursor-pointer shadow-sm"
      ></label>
    </div>
  );
}

export default function ColorFilter() {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        color
      </h3>
      <div className="flex items-center gap-2">
        {COLORS.map((color) => (
          <ColorItem key={color.name} color={color} />
        ))}
      </div>
    </div>
  );
}
