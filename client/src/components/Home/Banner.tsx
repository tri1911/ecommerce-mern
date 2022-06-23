import { Link } from "react-router-dom";

function BannerContent() {
  return (
    <>
      <h1 className="xl:text-6xl md:text-5xl text-4xl text-gray-800 font-medium mb-4">
        Best Collection For <br className="hidden sm:block" /> Home Decoration
      </h1>
      <p className="text-base text-gray-600 leading-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa{" "}
        <br className="hidden sm:block" />
        assumenda aliquid inventore nihil laboriosam odio
      </p>
    </>
  );
}

export default function Banner() {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36 relative"
      style={{ backgroundImage: "url('images/banner-bg.jpg')" }}
    >
      <div className="container">
        <BannerContent />
        <div className="mt-12">
          <Link to="/shop" className="default-btn">
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
