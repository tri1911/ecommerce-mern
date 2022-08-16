// import { Dialog, Transition } from "@headlessui/react";
// import { XCircleIcon } from "@heroicons/react/solid";
// import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import useShoppingCart from "hooks/useShoppingCart";
// import { ProductContent, ProductImage } from "pages/SingleProductPage";
import { Product } from "services/category.service";
import { Fn } from "types";
import Rating from "./Rating";

function ProductCardHeader({
  image,
  isAddedToWishlist,
  onWishlistClicked,
  openQuickView,
}: {
  image: string;
  isAddedToWishlist?: boolean;
  onWishlistClicked?: React.MouseEventHandler<HTMLButtonElement>;
  openQuickView?: Fn<[], void>;
}) {
  return (
    <div className="relative">
      <div className="h-48 overflow-hidden">
        <img className="w-full" src={image} alt="product thumbnail" />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition">
        <button
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
          onClick={openQuickView}
        >
          <i className="fas fa-search" />
        </button>
        <button
          className="text-white text-lg w-9 h-9 rounded-full bg-primary hover:bg-gray-800 transition flex items-center justify-center"
          onClick={onWishlistClicked}
        >
          <i className={isAddedToWishlist ? "fas fa-heart" : "far fa-heart"} />
        </button>
      </div>
    </div>
  );
}

function ProductCardContent({
  product: { _id, title, price, ratings },
  onAddToCartClicked,
}: {
  product: Product;
  onAddToCartClicked?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <div className="py-4 px-4 relative overflow-hidden">
      <Link to={`/products/${_id}`}>
        <h4 className="truncate capitalize font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
          {title}
        </h4>
      </Link>
      <div className="__price-rating-wrapper opacity-100 group-hover:opacity-0">
        <div className="__price flex items-baseline mb-1 space-x-2">
          <p className="text-lg text-primary font-roboto font-medium">
            ${price.toFixed(2)}
          </p>
          <p className="text-sm text-gray-400 font-roboto line-through">
            ${(price * 1.25).toFixed(2)}
          </p>
        </div>
        <div className="__rating flex items-center">
          <Rating rating={ratings.average} />
          <div className="text-xs text-gray-500 ml-3">({ratings.count})</div>
        </div>
      </div>
      <div className="__cta-btn absolute left-4 top-14 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition duration-300">
        <button
          className="inline-block px-4 py-2 min-w-[150px] uppercase border border-primary rounded text-center text-base font-medium bg-primary text-white hover:bg-transparent hover:text-primary transition duration-300"
          onClick={onAddToCartClicked}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default function ProductVerticalCard({ product }: { product: Product }) {
  // NOTE: should place `Quick View` visibility control here? or put it into centralized redux store?
  // const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // function closeQuickView() {
  //   setIsQuickViewOpen(false);
  // }

  // function openQuickView() {
  //   setIsQuickViewOpen(true);
  // }

  // const { isAddedToWishlist, handleAddToWishlist } =
  //   useAddWishlistItem(product);

  const { handleAddToCart } = useShoppingCart();

  // NOTE: code duplication here - each product card have one modal
  return (
    <div className="group rounded bg-white border border-gray-200 shadow-md overflow-hidden">
      <ProductCardHeader
        image={product.image}
        // isAddedToWishlist={isAddedToWishlist}
        // onWishlistClicked={handleAddToWishlist}
        // openQuickView={openQuickView}
      />
      <ProductCardContent
        product={product}
        onAddToCartClicked={handleAddToCart({
          productId: product._id,
          quantity: 1,
        })}
      />
      {/* <Transition appear show={isQuickViewOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeQuickView}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl translate-all relative">
                  <section className="container pt-4 grid lg:grid-cols-2 gap-6">
                    <ProductImage />
                    <ProductContent product={product} />
                  </section>

                  <button
                    className="absolute top-2 right-2 text-primary hover:text-primary/75 transition"
                    onClick={closeQuickView}
                  >
                    <XCircleIcon className="w-7 h-7" />
                  </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </div>
  );
}
