import { Link } from "react-router-dom";
import { Product } from "../../types";

function ProductImage({ id, image }: { id: string; image: string }) {
  return (
    <div className="relative">
      <img className="w-full" src={image} alt="" />
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition">
        <a
          href={`/products/${id}`}
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
        >
          <i className="fas fa-search" />
        </a>
        <a
          href={`/wishlist/add/${id}`}
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
        >
          <i className="far fa-heart" />
        </a>
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
      <a href={`/products/${_id}`}>
        <h4 className="truncate uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {name}
        </h4>
      </a>
      <div className="flex items-baseline mb-1 space-x-2">
        <p className="text-xl text-primary font-semibold">
          ${price.toFixed(2)}
        </p>
        <p className="text-sm text-gray-400 line-through">
          ${(price * 1.25).toFixed(2)}
        </p>
      </div>
      <div className="flex items-center">
        <div className="flex gap-1 text-sm text-yellow-400">
          {[...Array(5).keys()].map((key) => (
            <span key={key}>
              <i
                className={
                  rating >= key + 1
                    ? "fas fa-star"
                    : rating >= key + 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
              />
            </span>
          ))}
        </div>
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
