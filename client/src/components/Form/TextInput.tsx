import cn from "classnames";
import { useField } from "formik";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function TextInput({
  label,
  required,
  ...rest
}: TextInputProps) {
  const [field, meta] = useField(rest);
  return (
    <div>
      <label htmlFor={rest.name} className="text-gray-600 mb-2 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <span
          className={cn(
            { hidden: rest.type !== "password" },
            "absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
          )}
        >
          <i className="far fa-eye-slash" />
        </span>
        <input id={rest.name} className="default-input" {...field} {...rest} />
        {meta.touched && meta.error ? (
          <div className="input-error mb-2">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}
