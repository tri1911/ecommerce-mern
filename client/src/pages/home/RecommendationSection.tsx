import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/solid";
import type { Product } from "services/product.service";
import ProductVerticalCard from "components/Shared/ProductVerticalCard";

export default function RecommendationSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="container pb-16">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase">
          {title}
        </h2>
        <Link
          to="#"
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500"
        >
          <span className="font-medium">See More</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
      {/* Items Content */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductVerticalCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
