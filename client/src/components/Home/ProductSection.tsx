import { Product } from "../../types";
import ProductVerticalCard from "../Shared/ProductVerticalCard";

export default function ProductSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  return (
    <section className="container pb-16">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">
        {title}
      </h2>
      <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6">
        {products.map((product) => (
          <ProductVerticalCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
