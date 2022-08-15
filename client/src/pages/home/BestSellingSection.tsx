import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Rating from "components/Shared/Rating";

function SingleCard() {
  return (
    <div className="w-full flex items-center space-x-5">
      {/* Thumbnail */}
      <div className="w-28 p-5 rounded bg-gray-100">
        <img src="images/products/headphone-3.png" alt="" />
      </div>
      {/* Summary Info */}
      <div className="space-y-1">
        {/* Title */}
        <Link to="#">
          <h4 className="truncate capitalize font-medium text-lg text-gray-800 hover:text-primary transition">
            Title
          </h4>
        </Link>
        {/* Price */}
        <div className="space-x-3">
          <span className="text-lg text-primary font-roboto font-medium">
            $45.00
          </span>
          <span className="text-sm text-gray-400 font-roboto line-through">
            $55.45
          </span>
        </div>
        {/* Rating */}
        <div className="flex items-center">
          <Rating rating={4.5} />
          <span className="text-xs text-gray-500 ml-2">(100)</span>
        </div>
      </div>
    </div>
  );
}

function CardsList({ title }: { title: string }) {
  return (
    <div className="md:col-span-6 lg:col-span-4">
      {/* Heading */}
      <div className="flex items-center justify-between pb-1 mb-6 border-b border-gray-400">
        <h2 className="text-xl font-medium text-gray-800 uppercase">{title}</h2>
        <Link
          to="#"
          className="flex items-center space-x-1 text-base text-indigo-600 hover:text-indigo-500"
        >
          <span className="font-medium">See More</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
      {/* Items List */}
      <div className="space-y-5">
        <SingleCard />
        <SingleCard />
        <SingleCard />
      </div>
    </div>
  );
}

export default function BestSellingSection() {
  return (
    <div className="container pb-16 gap-5 grid md:grid-cols-12">
      <CardsList title="latest" />
      <CardsList title="best selling" />
      <CardsList title="top rated" />
    </div>
  );
}
