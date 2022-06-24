import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { ColorItem } from "../components/Filters/ColorFilter";
import { SizeItem } from "../components/Filters/SizeFilter";
import ProductSection from "../components/Home/ProductSection";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import QuantitySelector from "../components/Shared/QuantitySelector";
import Rating from "../components/Shared/Rating";
import { selectAllProducts, selectProductById } from "../slices/productsSlice";
import { COLORS, Product, SIZES } from "../types";

/* Product Image */

// NOTE: pass the array of product images
function ProductImage() {
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

// TODO: pass checked, onChange attributes as well
function ProductSizeSelector() {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Size</h3>
      <div className="flex items-center gap-2">
        {SIZES.map((value) => (
          <SizeItem key={value} value={value} />
        ))}
      </div>
    </div>
  );
}

// TODO: pass checked, onChange attributes as well
function ProductColorSelector() {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Color</h3>
      <div className="flex items-center gap-2">
        {Object.entries(COLORS).map(([colorName, hexCode]) => (
          <ColorItem key={colorName} colorName={colorName} hexCode={hexCode} />
        ))}
      </div>
    </div>
  );
}

// TODO: pass `onChange` for buttons `+` & `-`
function ProductQuantity() {
  return (
    <div className="mt-4">
      <h3 className="text-base text-gray-800 mb-1">Quantity</h3>
      <QuantitySelector />
    </div>
  );
}

function ProductCTAButtons() {
  return (
    <div className="flex gap-3 border-b border-gray-200 pb-5 mt-6">
      <Link
        to="/cart/id-here"
        className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition text-sm flex items-center"
      >
        <span className="mr-2">
          <i className="fas fa-shopping-bag" />
        </span>{" "}
        Add to cart
      </Link>
      <Link
        to="/wishlist/id-here"
        className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase hover:bg-transparent hover:text-primary transition text-sm"
      >
        <span className="mr-2">
          <i className="far fa-heart" />
        </span>{" "}
        Wishlist
      </Link>
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

function ProductContent({
  product: { name, rating, reviews, countInStock, brand, category, sku, price },
}: {
  product: Product;
}) {
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
      <p className="mt-4 text-gray-600">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
        exercitationem quaerat excepturi labore blanditiis
      </p>
      <ProductSizeSelector />
      <ProductColorSelector />
      <ProductQuantity />
      <ProductCTAButtons />
      <SocialShareIcons />
    </div>
  );
}

function ProductInfo() {
  return (
    <>
      <h3 className="border-b border-gray-200 font-roboto text-gray-800 pb-3 font-medium">
        Product Details
      </h3>
      <div className="lg:w-4/5 xl:w-3/5 pt-6">
        <div className="space-y-3 text-gray-600">
          <p>
            Incredible graphics performanceMacBook Air can take on more
            graphics-intensive projects than ever. For the first time, content
            creators can edit and seamlessly play back multiple streams of
            full‑quality 4K video without dropping a frame.
          </p>
          <p>
            Incredible graphics performanceMacBook Air can take on more
            graphics-intensive projects than ever. For the first time, content
            creators can edit and seamlessly play back multiple streams of
            full‑quality 4K video without dropping a frame.
          </p>
          <p>
            Apps on MacBook Air can use machine learning (ML) to automatically
            retouch photos like a pro, make smart tools such as magic wands and
            audio filters more accurate at auto‑detection, and so much more.
            That’s not just brain power — that’s the power of a full stack of ML
            technologies.
          </p>
        </div>
        <table className="table-auto border-collapse w-full text-left text-gray-600 text-sm mt-6">
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Color
            </th>
            <td className="py-2 px-4 border border-gray-300">
              Black, Brown, Red
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Material
            </th>
            <td className="py-2 px-4 border border-gray-300">
              Artificial Leather
            </td>
          </tr>
          <tr>
            <th className="py-2 px-4 border border-gray-300 w-40 font-medium">
              Weight
            </th>
            <td className="py-2 px-4 border border-gray-300">55kg</td>
          </tr>
        </table>
      </div>
    </>
  );
}

export default function SingleProductPage() {
  const { productId } = useParams();

  const product = useAppSelector((state) =>
    selectProductById(state, productId!)
  );

  const products = useAppSelector(selectAllProducts);

  if (!product) {
    return null;
  }

  return (
    <div>
      <Breadcrumbs paths={["Shop", product?.name ?? "unknown"]} />
      <section className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
        <ProductImage />
        <ProductContent product={product} />
      </section>
      <section className="container pb-16">
        <ProductInfo />
      </section>
      <ProductSection
        title="related products"
        products={products.slice(0, 4)}
      />
    </div>
  );
}
