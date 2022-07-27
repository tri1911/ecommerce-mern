import ProductVerticalCard from "../Shared/ProductVerticalCard";
import { Product } from "../../services/category.service";

const ProductsGridView = ({ products }: { products: Product[] }) => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {products.map((product) => (
      <ProductVerticalCard key={product._id} product={product} />
    ))}
  </div>
);

export default ProductsGridView;
