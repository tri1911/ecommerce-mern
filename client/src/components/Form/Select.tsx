import { useField } from "formik";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
}

export default function Select({ label, ...rest }: SelectProps) {
  const [field, meta] = useField(rest);
  return (
    <div>
      <label htmlFor={rest.name} className="text-gray-600 mb-2 block">
        {label}
      </label>
      <select id={rest.name} className="default-input" {...field} {...rest} />
      {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
      ) : null}
    </div>
  );
}
