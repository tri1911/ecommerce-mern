import { Link } from "react-router-dom";

function SingleBreadcrumb({
  path,
  isActive,
}: {
  path: string;
  isActive: boolean;
}) {
  return (
    <>
      <span className="text-sm text-gray-400">
        <i className="fas fa-chevron-right" />
      </span>
      <p
        className={`${
          isActive ? "text-gray-600" : "text-primary"
        } text-base font-medium`}
      >
        {path}
      </p>
    </>
  );
}

export default function Breadcrumbs({ paths }: { paths: string[] }) {
  return (
    <div className="container py-4 gap-3 flex items-center">
      <Link to="/" className="text-primary text-base">
        <i className="fas fa-home" />
      </Link>
      {paths.map((path, index) => (
        <SingleBreadcrumb
          key={index}
          path={path}
          isActive={index === paths.length - 1}
        />
      ))}
    </div>
  );
}
