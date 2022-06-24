import { Link } from "react-router-dom";
import { Product } from "../../types";
import Rating from "./Rating";

function ProductImage({ id, image }: { id: string; image: string }) {
  return (
    <div className="relative">
      <img className="w-full" src={image} alt="" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
        <Link
          to={`/products/${id}`}
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
        >
          <i className="fas fa-search" />
        </Link>
        <Link
          to={`/wishlist/add/${id}`}
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
        >
          <i className="far fa-heart" />
        </Link>
      </div>
    </div>
  );
}

function ProductContent({
  product: { _id, name, price, rating, reviews },
}: {
  product: Product;
}) {
  return (
    <div className="pt-4 pb-3 px-4">
      <Link to={`/products/${_id}`}>
        <h4 className="truncate uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {name}
        </h4>
      </Link>
      <div className="flex items-baseline mb-1 space-x-2">
        <p className="text-xl text-primary font-semibold">
          ${price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400 line-through">
          ${(price * 1.25).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center">
        <Rating rating={rating} />
        <div className="text-xs text-gray-500 ml-3">({reviews})</div>
      </div>
    </div>
  );
}

function AddToCartBtn({ id }: { id: string }) {
  return (
    <Link
      to={`/cart/${id}`}
      className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
    >
      Add to Cart
    </Link>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded bg-white shadow overflow-hidden">
      <ProductImage id={product._id} image={product.image} />
      <ProductContent product={product} />
      <AddToCartBtn id={product._id} />
    </div>
  );
}
