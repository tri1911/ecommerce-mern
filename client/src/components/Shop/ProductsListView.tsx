import { Product } from "../../services/category.service";
import ProductHorizontalCard from "./ProductHorizontalCard";

const ProductsListView = ({ products }: { products: Product[] }) => {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductHorizontalCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductsListView;
