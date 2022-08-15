import { Link } from "react-router-dom";

interface Offer {
  percent: number;
  title: string;
  desc: string;
  image: string;
}

const offers: Offer[] = [
  {
    percent: 30,
    title: "Free Shipping",
    desc: "Attractive Sporty Shoes",
    image: "offer-1.png",
  },
  {
    percent: 50,
    title: "Flash Sale",
    desc: "Attractive Sporty Shoes",
    image: "offer-2.png",
  },
];

function OfferCard({
  offer: { percent, title, desc, image },
}: {
  offer: Offer;
}) {
  return (
    <div className="p-8 flex items-center justify-between bg-blue-100 rounded-sm group">
      {/* Text */}
      <div className="">
        <div className="space-y-1">
          <h3 className="text-lg font-medium text-primary">{percent}% offer</h3>
          <h4 className="text-xl font-medium text-gray-800">{title}</h4>
          <p className="text-base text-gray-600">{desc}</p>
        </div>
        <div className="mt-6 mb-3">
          <Link to="#" className="default-btn">
            Shop Now
          </Link>
        </div>
      </div>
      {/* Image */}
      <div className="w-56">
        <img
          src={`/images/offer/${image}`}
          alt=""
          className="group-hover:scale-105 ease-in-out duration-300 object-cover"
        />
      </div>
    </div>
  );
}

export default function Offers() {
  return (
    <div className="container pb-16 space-y-5 md:space-x-10 md:space-y-0 md:grid grid-cols-2">
      {offers.map((offer) => (
        <OfferCard key={offer.title} offer={offer} />
      ))}
    </div>
  );
}
