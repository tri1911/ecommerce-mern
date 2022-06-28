import { useField } from "formik";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  name: string;
}

export default function CheckBox({ children, ...rest }: CheckBoxProps) {
  const [field, meta] = useField({ ...rest, type: "checkbox" });

  return (
    <>
      <div className="flex items-center">
        <input
          id={rest.name}
          type="checkbox"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer"
          {...field}
          {...rest}
        />
        <label
          htmlFor={rest.name}
          className="text-gray-600 ml-3 cursor-pointer"
        >
          {children}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
      ) : null}
    </>
  );
}
