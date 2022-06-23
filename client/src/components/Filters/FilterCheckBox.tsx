export default function FilterCheckBox({
  slug,
  text,
  name,
  productsCount,
  checked,
  onChange,
}: {
  slug: string;
  text: string;
  name: string;
  productsCount: number;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={slug}
        name={name}
        value={slug}
        checked={checked}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
        onChange={onChange}
      />
      <label
        htmlFor={slug}
        className="text-gray-600 ml-3 cursor-pointer truncate"
      >
        {text}
      </label>
      <div className="ml-auto text-gray-600 text-sm">({productsCount})</div>
    </div>
  );
}
