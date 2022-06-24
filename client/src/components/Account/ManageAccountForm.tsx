import React from "react";

export default function AccountFormWrapper({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <form>
        <h3 className="text-lg font-medium capitalize mb-4">{title}</h3>
        <div className="space-y-4">{children}</div>
      </form>
    </div>
  );
}
