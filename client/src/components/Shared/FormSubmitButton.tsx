import classNames from "classnames";

type Props = {
  label: string;
  fluid?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function FormSubmitButton({ label, fluid, ...props }: Props) {
  return (
    <button
      type="submit"
      className={classNames("default-btn", "py-2", { "w-full": fluid })}
      {...props}
    >
      {label}
    </button>
  );
}
