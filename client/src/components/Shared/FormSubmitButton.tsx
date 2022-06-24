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
      className={classNames(
        "block py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium",
        { "w-full": fluid },
        { "px-6": !fluid }
      )}
    >
      {label}
    </button>
  );
}
