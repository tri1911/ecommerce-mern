import { useField } from "formik";
import cn from "classnames";

interface CheckBoxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children: React.ReactNode;
  shrink?: boolean;
  name: string;
}

export default function CheckBox({ children, shrink, ...rest }: CheckBoxProps) {
  const [field, meta] = useField({ ...rest, type: "checkbox" });
  return (
    <>
      <div className="flex items-center">
        <input
          id={rest.name}
          type="checkbox"
          className={cn("text-primary focus:ring-0 rounded-sm cursor-pointer", {
            "w-3 h-3": shrink,
          })}
          {...field}
          {...rest}
        />
        <label
          htmlFor={rest.name}
          className={cn("text-gray-600 ml-3 cursor-pointer", {
            "text-sm": shrink,
          })}
        >
          {children}
        </label>
      </div>
      {meta.touched && meta.error ? (
        <div className={cn("input-error", { "text-xs": shrink })}>
          {meta.error}
        </div>
      ) : null}
    </>
  );
}
