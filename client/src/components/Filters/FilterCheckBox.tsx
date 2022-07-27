export default function FilterCheckBox({
  id,
  name,
  value,
  text,
  count,
  checked,
  onChange,
}: {
  id: string;
  name: string;
  value: string;
  text: string;
  count: number;
  checked?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        className="text-primary rounded-sm cursor-pointer focus:ring-0"
        onChange={onChange}
      />
      <label
        htmlFor={id}
        className="text-gray-600 ml-3 cursor-pointer truncate"
      >
        {text}
      </label>
      <div className="ml-auto text-sm text-gray-600">({count})</div>
    </div>
  );
}
