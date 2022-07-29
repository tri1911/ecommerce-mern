import { Link } from "react-router-dom";

export interface Crumb {
  label: string;
  href?: string;
}

const SingleCrumb = ({ crumb: { label, href } }: { crumb: Crumb }) => (
  <>
    <span className="text-sm text-gray-400">
      <i className="fas fa-chevron-right" />
    </span>
    {href ? (
      <Link to={href} className="text-base font-medium text-primary">
        {label}
      </Link>
    ) : (
      <span className="text-base font-medium text-gray-600">{label}</span>
    )}
  </>
);

const Breadcrumbs = ({ crumbs }: { crumbs: Crumb[] }) => (
  <div className="container py-4 space-x-3 flex items-center">
    <Link to="/" className="text-primary text-base">
      <i className="fas fa-home" />
    </Link>
    {crumbs.map((crumb, index) => (
      <SingleCrumb key={index} crumb={crumb} />
    ))}
  </div>
);

export default Breadcrumbs;
