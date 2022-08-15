import { useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

import { Fn } from "types";
import { ProductDetails } from "services/product.service";
import useShoppingCart from "hooks/useShoppingCart";

import QuantitySelector from "components/Shared/QuantitySelector";
import Rating from "components/Shared/Rating";

function RatingWrapper({
  rating,
  reviews,
}: {
  rating: number;
  reviews: number;
}) {
  return (
    <div className="flex items-center mb-4">
      <Rating rating={rating} />
      <div className="text-xs text-gray-500 ml-3">({reviews} Reviews)</div>
    </div>
  );
}

function ProductSummary({
  countInStock,
  brand,
  category,
  sku,
}: {
  countInStock: number;
  brand: string;
  category: string;
  sku: string;
}) {
  return (
    <div className="space-y-2">
      <p className="text-gray-800 font-semibold space-x-2">
        <span>Availability: </span>
        <span className={countInStock > 0 ? "text-green-600" : "text-red-600"}>
          {countInStock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </p>
      <p className="space-x-2">
        <span className="text-gray-800 font-semibold">Brand: </span>
        <span className="text-gray-600">{brand}</span>
      </p>
      <p className="space-x-2">
        <span className="text-gray-800 font-semibold">Category: </span>
        <span className="text-gray-600">{category}</span>
      </p>
      <p className="space-x-2">
        <span className="text-gray-800 font-semibold">SKU: </span>
        <span className="text-gray-600">{sku.toUpperCase()}</span>
      </p>
    </div>
  );
}

function ProductPrice({ price }: { price: number }) {
  return (
    <div className="mt-4 flex items-baseline gap-3">
      <span className="text-primary font-semibold text-xl">
        ${price.toFixed(2)}
      </span>
      <span className="text-gray-500 text-base line-through">
        ${(price * 1.35).toFixed(2)}
      </span>
    </div>
  );
}

function ProductSizeSelector({
  sizes,
  selectedSize,
  setSelectedSize,
}: {
  sizes: string[];
  selectedSize: string | undefined;
  setSelectedSize: Fn<[string | undefined], void>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Size</h3>
      <div className="flex items-center gap-2">
        {sizes.map((size) => (
          <div
            key={size}
            className={classNames("product-size-box", {
              "bg-primary text-white": selectedSize === size,
            })}
            onClick={() => {
              setSelectedSize(size);
            }}
          >
            {size.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductColorSelector({
  colors,
  selectedColor,
  setSelectedColor,
}: {
  colors: string[];
  selectedColor: string | undefined;
  setSelectedColor: Fn<[string | undefined], void>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Color</h3>
      <div className="flex items-center gap-2">
        {colors.map((color) => (
          <div
            key={color}
            className={classNames("product-color-box", {
              "ring-2 ring-primary": selectedColor === color,
            })}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          />
        ))}
      </div>
    </div>
  );
}

function ProductQuantity({
  countInStock,
  selectedQuantity,
  setSelectedQuantity,
}: {
  countInStock: number;
  selectedQuantity: number;
  setSelectedQuantity: Fn<[number], void>;
}) {
  const handleIncreaseQty = () => {
    if (selectedQuantity < countInStock) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const handleDecreaseQty = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Quantity</h3>
      <QuantitySelector
        value={selectedQuantity}
        onIncreaseQty={handleIncreaseQty}
        onDecreaseQty={handleDecreaseQty}
      />
    </div>
  );
}

function AddToCartBtn({
  disabled,
  onAddToCartClicked,
}: {
  disabled: boolean;
  onAddToCartClicked: Fn<[], void>;
}) {
  return (
    <button
      type="button"
      className="px-8 py-2 flex items-center border border-primary text-sm font-medium rounded uppercase text-white bg-primary hover:bg-transparent hover:text-primary transition disabled:opacity-75 disabled:cursor-not-allowed"
      onClick={onAddToCartClicked}
      disabled={disabled}
    >
      <span className="mr-2">
        <i className="fas fa-shopping-bag" />
      </span>{" "}
      Add to cart
    </button>
  );
}

function AddToWishlist({
  wasAddedToWishlist,
  onAddToWishlistClicked,
}: {
  wasAddedToWishlist?: boolean;
  onAddToWishlistClicked?: Fn<[], void>;
}) {
  return (
    <button
      className="px-8 py-2 border border-primary rounded text-sm font-medium text-primary bg-white uppercase hover:bg-primary hover:text-white transition"
      onClick={onAddToWishlistClicked}
    >
      <span className="mr-2">
        <i className={wasAddedToWishlist ? "fas fa-heart" : "far fa-heart"} />
      </span>
      {wasAddedToWishlist ? "Remove from Wishlist" : "Wishlist"}
    </button>
  );
}

function SocialShareIcons() {
  return (
    <div className="flex space-x-3 mt-4">
      <Link
        to="#"
        className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
      >
        <i className="fab fa-facebook-f" />
      </Link>
      <Link
        to="#"
        className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
      >
        <i className="fab fa-twitter" />
      </Link>
      <Link
        to="#"
        className="text-gray-400 hover:text-gray-500 h-8 w-8 rounded-full border border-gray-300 flex items-center justify-center"
      >
        <i className="fab fa-instagram" />
      </Link>
    </div>
  );
}

export default function ProductContent({
  product,
}: {
  product: ProductDetails;
}) {
  const [selectedInfos, setSelectedInfos] = useState<{
    size?: string;
    color?: string;
    quantity: number;
  }>({ quantity: 1 });

  const {
    size: selectedSize,
    color: selectedColor,
    quantity: selectedQuantity,
  } = selectedInfos;

  const {
    _id,
    sku,
    title,
    description,
    countInStock,
    price,
    brand,
    category,
    sizes,
    colors,
    ratings,
  } = product;

  const { handleAddToCart } = useShoppingCart();

  // const { isAddedToWishlist, handleAddToWishlist } =
  //   useAddWishlistItem(product);

  return (
    <div>
      <h2 className="md:text-3xl text-2xl font-medium uppercase mb-2">
        {title}
      </h2>
      <RatingWrapper rating={ratings.average} reviews={ratings.count} />
      <ProductSummary
        countInStock={countInStock}
        brand={brand.name}
        category={category.name}
        sku={sku}
      />
      <ProductPrice price={price} />
      {/* Short Summary Description */}
      <p className="mt-4 text-gray-600">{description.substring(0, 100)}</p>
      <ProductSizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        setSelectedSize={(newSize) =>
          setSelectedInfos((prev) => ({ ...prev, size: newSize }))
        }
      />
      <ProductColorSelector
        colors={colors}
        selectedColor={selectedColor}
        setSelectedColor={(newColor) =>
          setSelectedInfos((prev) => ({ ...prev, color: newColor }))
        }
      />
      <ProductQuantity
        countInStock={countInStock}
        selectedQuantity={selectedQuantity}
        setSelectedQuantity={(newQuantity) =>
          setSelectedInfos((prev) => ({ ...prev, quantity: newQuantity }))
        }
      />
      {/* CTA buttons */}
      <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
        <AddToCartBtn
          disabled={selectedQuantity <= 0}
          onAddToCartClicked={handleAddToCart({
            productId: _id,
            quantity: selectedQuantity,
          })}
        />
        <AddToWishlist />
      </div>
      <SocialShareIcons />
    </div>
  );
}
