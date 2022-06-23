import { products } from "../../data/products";
import ProductCard from "../Shared/ProductCard";

export default function ProductsList() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
