import { useField } from "formik";
import { useState } from "react";

interface PasswordFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}

export default function Password({
  label,
  required,
  ...rest
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField({ ...rest, type: "password" });
  return (
    <div>
      <label htmlFor={rest.name} className="text-gray-600 mb-2 block">
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <div className="relative">
        <div
          className="absolute right-3 top-3 text-sm text-gray-500 cursor-pointer"
          onClick={() => {
            setShowPassword(!showPassword);
          }}
        >
          <i className={`far ${showPassword ? "fa-eye-slash" : "fa-eye"}`} />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          id={rest.name}
          className="default-input"
          {...field}
          {...rest}
        />
        {meta.touched && meta.error ? (
          <div className="input-error mb-2">{meta.error}</div>
        ) : null}
      </div>
    </div>
  );
}
