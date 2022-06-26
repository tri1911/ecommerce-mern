import { Link } from "react-router-dom";
import { CartItem, Size } from "../../types";
import QuantitySelector from "../Shared/QuantitySelector";

function CartItemImage({ image }: { image: string }) {
  return (
    <div className="w-32 shrink-0">
      <img src={image} className="w-full" alt="Cart Item Thumbnail" />
    </div>
  );
}

function CartItemContent({
  productId,
  name,
  price,
  size,
}: {
  productId: string;
  name: string;
  price: number;
  size: Size;
}) {
  return (
    <div className="md:w-fit w-full">
      <Link to={`/products/${productId}`}>
        <h2 className="text-gray-800 mb-3 xl:text-xl text-lg font-medium uppercase hover:text-primary transition">
          {name}
        </h2>
      </Link>
      <p className="text-primary font-semibold">${price.toFixed(2)}</p>
      <p className="text-gray-500">Size: {size}</p>
    </div>
  );
}

function CartItemPrice({ totalPrice }: { totalPrice: string }) {
  return (
    <div className="ml-auto md:ml-0">
      <p className="text-primary text-lg font-semibold">${totalPrice}</p>
    </div>
  );
}

function CartDeleteButton() {
  return (
    <div className="text-gray-600 hover:text-primary cursor-pointer">
      <i className="fas fa-trash" />
    </div>
  );
}

export default function CartItemRow({
  cartItem: { productId, image, name, price, size, quantity },
}: {
  cartItem: CartItem;
}) {
  return (
    <div className="flex items-center md:justify-between gap-4 md:gap-6 p-4 border border-gray-200 rounded flex-wrap md:flex-nowrap">
      <CartItemImage image={image} />
      <CartItemContent
        productId={productId}
        name={name}
        price={price}
        size={size}
      />
      <QuantitySelector value={1} />
      <CartItemPrice totalPrice={(quantity * price).toFixed(2)} />
      <CartDeleteButton />
    </div>
  );
}
