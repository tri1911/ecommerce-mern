import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs({
  locationName,
}: {
  locationName: string;
}) {
  return (
    <div className="container py-4 flex justify-between">
      <div className="flex gap-3 items-center">
        <Link to="/" className="text-primary text-base">
          <i className="fas fa-home" />
        </Link>
        <span className="text-sm text-gray-400">
          <i className="fas fa-chevron-right" />
        </span>
        <p className="text-gray-600 font-medium">{locationName}</p>
      </div>
    </div>
  );
}
