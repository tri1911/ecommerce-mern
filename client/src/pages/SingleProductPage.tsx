import { Tab } from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useAppSelector,
  useAddCartItem,
  useAddWishlistItem,
  useAppDispatch,
} from "../app/hooks";
import ProductSection from "../components/Home/ProductSection";
import ProductInfo from "../components/Product/ProductInfo";
import QA from "../components/Product/QA";
import Reviews from "../components/Product/Reviews";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import QuantitySelector from "../components/Shared/QuantitySelector";
import Rating from "../components/Shared/Rating";
import Spinner from "../components/Shared/Spinner";
import {
  fetchSingleProduct,
  selectProductDetails,
} from "../slices/product.slice";
import { selectAllProducts } from "../slices/products.slice";
import { Color, COLORS, Fn, Product, Size, SIZES } from "../types";

/* Product Image */

// NOTE: pass the array of product images
export function ProductImage() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div>
        <img
          id="__main-img"
          className="w-full"
          src={`/images/products/product${selected + 1}.jpg`}
          alt="main"
        />
      </div>
      <div className="grid grid-cols-5 gap-4 mt-4">
        {[...Array(5).keys()].map((key) => (
          <div key={key}>
            <img
              className={`__single-image w-full cursor-pointer border ${
                key === selected && "border-primary"
              }`}
              src={`/images/products/product${key + 1}.jpg`}
              alt="sub"
              onClick={() => setSelected(key)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* Product Content */

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

function ProductDetails({
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
        <span className="text-gray-600">{sku}</span>
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
  selectedSize,
  setSelectedSize,
}: {
  selectedSize: Size | undefined;
  setSelectedSize: Fn<[Size | undefined], void>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((value) => (
          <div
            key={value}
            className={classNames("product-size-box", {
              "bg-primary text-white": selectedSize === value,
            })}
            onClick={() => setSelectedSize(value)}
          >
            {value.toUpperCase()}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductColorSelector({
  selectedColor,
  setSelectedColor,
}: {
  selectedColor: Color | undefined;
  setSelectedColor: Fn<[Color | undefined], void>;
}) {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Color</h3>
      <div className="flex items-center gap-2">
        {Object.entries(COLORS).map(([colorName, hexCode]) => (
          // <ColorItem key={colorName} colorName={colorName} hexCode={hexCode} />
          <div
            key={colorName}
            className={classNames("product-color-box", {
              "ring-2 ring-primary": selectedColor === colorName,
            })}
            style={{ backgroundColor: hexCode }}
            onClick={() => setSelectedColor(colorName as Color)}
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
  // TODO: refactor the duplicates with quantity counter in `CartPage`
  const increaseQuantity = () => {
    if (selectedQuantity < countInStock) {
      setSelectedQuantity(selectedQuantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 0) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Quantity</h3>
      <QuantitySelector
        value={selectedQuantity}
        handleAdd={increaseQuantity}
        handleRemove={decreaseQuantity}
      />
    </div>
  );
}

function ProductCTAButtons({
  canAddItem,
  onAddToCartClicked,
  isAddedToWishlist,
  onWishlistClicked,
}: {
  canAddItem: boolean;
  onAddToCartClicked: Fn<[], void>;
  isAddedToWishlist: boolean;
  onWishlistClicked: Fn<[], void>;
}) {
  return (
    <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
      <button
        type="button"
        className="px-8 py-2 flex items-center border border-primary text-sm font-medium rounded uppercase text-white bg-primary hover:bg-transparent hover:text-primary transition disabled:opacity-75 disabled:cursor-not-allowed"
        onClick={onAddToCartClicked}
        disabled={!canAddItem}
      >
        <span className="mr-2">
          <i className="fas fa-shopping-bag" />
        </span>{" "}
        Add to cart
      </button>
      <button
        className="px-8 py-2 border border-primary rounded text-sm font-medium text-primary bg-white uppercase hover:bg-primary hover:text-white transition"
        onClick={onWishlistClicked}
      >
        <span className="mr-2">
          <i className={isAddedToWishlist ? "fas fa-heart" : "far fa-heart"} />
        </span>
        {isAddedToWishlist ? "Remove from Wishlist" : "Wishlist"}
      </button>
    </div>
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

type Values = {
  size?: Size;
  color?: Color;
  quantity: number;
};

export function ProductContent({ product }: { product: Product }) {
  const [values, setValues] = useState<Values>(() => ({ quantity: 1 }));

  const { size, color, quantity } = values;

  const {
    _id,
    name,
    image,
    description,
    rating,
    reviews,
    inStockQty: countInStock,
    brand,
    category,
    sku,
    price,
  } = product;

  const { canAddItem, handleAddToCart } = useAddCartItem({
    item: { productId: _id, name, image, price, inStockQty: countInStock },
    ...values,
  });
  const { isAddedToWishlist, handleAddToWishlist } =
    useAddWishlistItem(product);

  return (
    <div>
      <h2 className="md:text-3xl text-2xl font-medium uppercase mb-2">
        {name}
      </h2>
      <RatingWrapper rating={rating} reviews={reviews} />
      <ProductDetails
        countInStock={countInStock}
        brand={brand}
        category={category}
        sku={sku}
      />
      <ProductPrice price={price} />
      <p className="mt-4 text-gray-600">{description.substring(0, 100)}</p>
      <ProductSizeSelector
        selectedSize={size}
        setSelectedSize={(size) => setValues((prev) => ({ ...prev, size }))}
      />
      <ProductColorSelector
        selectedColor={color}
        setSelectedColor={(color) => setValues((prev) => ({ ...prev, color }))}
      />
      <ProductQuantity
        countInStock={countInStock}
        selectedQuantity={quantity}
        setSelectedQuantity={(quantity) =>
          setValues((prev) => ({ ...prev, quantity }))
        }
      />
      <ProductCTAButtons
        canAddItem={canAddItem}
        onAddToCartClicked={handleAddToCart}
        isAddedToWishlist={isAddedToWishlist}
        onWishlistClicked={handleAddToWishlist}
      />
      <SocialShareIcons />
    </div>
  );
}

export default function SingleProductPage() {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  // const product = useAppSelector((state) =>
  //   selectProductById(state, productId!)
  // );

  const { status, product } = useAppSelector(selectProductDetails);

  useEffect(() => {
    if (productId && productId !== product?._id) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId, product]);

  const products = useAppSelector(selectAllProducts);

  if (!product) {
    return null;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  const tabs = ["Product Info", "Question & Answers", "Review (10)"];

  return (
    <div>
      <Breadcrumbs paths={["Shop", product?.name ?? "unknown"]} />
      <section className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
        <ProductImage />
        <ProductContent product={product} />
      </section>
      <section className="container pb-16">
        <Tab.Group>
          <Tab.List className="border-b border-gray-200 space-x-2">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "px-4 py-2 border border-b-0 rounded-t-md font-roboto text-base font-medium focus:outline-none",
                    selected
                      ? "text-primary border-primary"
                      : "text-gray-700 border-gray-700 "
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="lg:w-4/5 xl:w-3/5 pt-6">
              <ProductInfo />
            </Tab.Panel>
            <Tab.Panel className="pt-6">
              <QA />
            </Tab.Panel>
            <Tab.Panel className="pt-6">
              <Reviews />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
      <ProductSection
        title="related products"
        products={products.slice(0, 4)}
      />
    </div>
  );
}
