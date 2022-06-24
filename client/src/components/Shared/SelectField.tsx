import React from "react";

export default function SelectField({
  title,
  name,
  value,
  children,
}: {
  title: string;
  name?: string;
  value?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="text-gray-600 mb-2 block">{title}</label>
      <select className="default-input" name={name} value={value}>
        {children}
      </select>
    </div>
  );
}
