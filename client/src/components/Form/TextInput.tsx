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
        <input id={rest.name} className="default-input" {...field} {...rest} />
        {meta.touched && meta.error ? (
          <div className="input-error mb-2">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}
