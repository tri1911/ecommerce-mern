import { Link } from "react-router-dom";

export default function Advertisement() {
  return (
    <div className="container pb-16">
      <Link to="#">
        <img
          className="w-full"
          src="images/offer/offer-banner.jpg"
          alt="advertisement banner"
        />
      </Link>
    </div>
  );
}

/*
  <div className="container pb-16 relative">
    <img
      className="w-full"
      src="images/offer/offer-banner.jpeg"
      alt="advertisement banner"
    />
    <div className="absolute top-7 left-20 space-y-3">
      <p className="text-xl uppercase">online exclusive</p>
      <p className="text-6xl text-primary uppercase font-extrabold tracking-wider">
        15% <span className="text-gray-800">off</span>
      </p>
      <p className="text-lg uppercase">
        vecteezy shoes, <br className="hidden md:block" />
        running shoes ready
      </p>
      <button className="default-btn">Shop Now</button>
    </div>
  </div>
*/
