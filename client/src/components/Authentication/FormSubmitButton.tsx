import React from "react";

export default function FormSubmitButton({ label }: { label: string }) {
  return (
    <div className="mt-4">
      <button
        type="submit"
        className="block w-full py-2 text-center text-white bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium"
      >
        {label}
      </button>
    </div>
  );
}
