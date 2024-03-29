import { Fn } from "../../types";

export default function QuantitySelector({
  value,
  onDecreaseQty,
  onIncreaseQty,
}: {
  value: number;
  onDecreaseQty?: Fn<[], void>;
  onIncreaseQty?: Fn<[], void>;
}) {
  return (
    <div className="flex border border-gray-300 text-gray-600 divide-x divide-gray-300 w-max">
      <div className="product-quantity-btn" onClick={onDecreaseQty}>
        -
      </div>
      <div className="h-5 w-6 md:h-8 md:w-10 text-xs md:text-base flex items-center justify-center">
        {value}
      </div>
      <div className="product-quantity-btn" onClick={onIncreaseQty}>
        +
      </div>
    </div>
  );
}
