import classNames from "classnames";

export default function NotificationMessage({
  variant,
  text,
}: {
  variant: "success" | "error";
  text: string;
}) {
  return (
    <div
      className={classNames(
        "px-4 py-3 rounded border",
        { "bg-red-100 border-red-400 text-red-700": variant === "error" },
        {
          "bg-green-100 border-green-400 text-green-700": variant === "success",
        }
      )}
      role="alert"
    >
      <span className="block sm:inline">{text}</span>
    </div>
  );
}
