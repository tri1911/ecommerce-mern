import React from "react";

export default function FormWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container pb-16">
      <div className="max-w-lg mx-auto shadow px-6 py-7 rounded overflow-hidden">
        {children}
      </div>
    </div>
  );
}
