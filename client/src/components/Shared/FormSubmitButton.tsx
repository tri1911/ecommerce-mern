import React from "react";
import classNames from "classnames";

export default function FormSubmitButton({
  label,
  fluid,
}: {
  label: string;
  fluid?: boolean;
}) {
  return (
    <button
      type="submit"
      className={classNames("default-btn", "py-2", { "w-full": fluid })}
    >
      {label}
    </button>
  );
}
