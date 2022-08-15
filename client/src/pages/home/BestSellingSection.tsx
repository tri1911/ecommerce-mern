import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import Rating from "components/Shared/Rating";
import { Product } from "services/category.service";

function SingleCard({
  product: { _id, image, title, price, ratings },
}: {
  product: Product;
}) {
  return (
    <div className="w-full flex items-center space-x-5">
      {/* Thumbnail */}
      <div className="w-28 p-5 rounded bg-gray-100">
        <img src={image} alt="product thumbnail" />
      </div>
      {/* Summary Info */}
      <div className="space-y-1">
        {/* Title */}
        <Link to={`/products/${_id}`}>
          <h4 className="truncate capitalize font-medium text-lg text-gray-800 hover:text-primary transition">
            {title}
          </h4>
        </Link>
        {/* Price */}
        <div className="space-x-3">
          <span className="text-lg text-primary font-roboto font-medium">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-400 font-roboto line-through">
            ${(price * 1.3).toFixed(2)}
          </span>
        </div>
        {/* Rating */}
        <div className="flex items-center">
          <Rating rating={ratings.average} />
          <span className="text-xs text-gray-500 ml-2">({ratings.count})</span>
        </div>
      </div>
    </div>
  );
}

function CardsList({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
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
        {products.map((product) => (
          <SingleCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default function BestSellingSection({
  topRated,
}: {
  topRated: Product[];
}) {
  return (
    <div className="container pb-16 gap-5 grid md:grid-cols-12">
      <CardsList title="latest" products={topRated} />
      <CardsList title="best selling" products={topRated} />
      <CardsList title="top rated" products={topRated} />
    </div>
  );
}
