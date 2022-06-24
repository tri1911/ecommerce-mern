import classNames from "classnames";

// TODO: handle the toggle hide/show password properly
export default function InputField({
  label,
  type = "text",
  value,
  placeholder,
  required,
}: {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-gray-600 mb-2 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <span
          className={classNames(
            { hidden: type !== "password" },
            "absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
          )}
        >
          <i className="far fa-eye-slash" />
        </span>
        <input
          type={type}
          className="default-input"
          value={value}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}
