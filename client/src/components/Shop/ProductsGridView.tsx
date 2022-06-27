import { Product } from "../../types";
import ProductVerticalCard from "../Shared/ProductVerticalCard";

export default function ProductsGridView({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductVerticalCard key={product._id} product={product} />
      ))}
    </div>
  );
}
