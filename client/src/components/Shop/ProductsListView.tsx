import React from "react";
import { Product } from "../../types";
import ProductHorizontalCard from "./ProductHorizontalCard";

export default function ProductsListView({
  products,
}: {
  products: Product[];
}) {
  return (
    <div className="space-y-4">
      {products.map((product) => (
        <ProductHorizontalCard key={product._id} product={product} />
      ))}
    </div>
  );
}
