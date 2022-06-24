export default function InputField({
  label,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-gray-600 mb-2 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        type={type}
        className="w-full block border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
