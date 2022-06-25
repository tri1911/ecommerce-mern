import { Link } from "react-router-dom";
import Breadcrumbs from "../components/Shared/Breadcrumbs";

export default function NotFoundPage() {
  return (
    <div>
      <Breadcrumbs paths={["404"]} />
      <div className="container pt-4 pb-16">
        <div className="w-2/3 mx-auto">
          <img
            className="w-full object-contain"
            src="/images/svg/404.svg"
            alt="page not found"
          />
        </div>
        <div className="text-center mt-5">
          <h4 className="my-8 text-2xl font-medium uppercase">
            The page you've requested is not available
          </h4>
          <Link to="/" className="default-btn">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
