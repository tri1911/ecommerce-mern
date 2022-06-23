import { Link } from "react-router-dom";

export default function Advertisement() {
  return (
    <div className="container pb-16">
      <Link to="/">
        <img
          className="w-full"
          src="images/offer.jpg"
          alt="advertisement banner"
        />
      </Link>
    </div>
  );
}
