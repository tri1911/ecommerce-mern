import { Brand } from "../../types";
import FilterCheckBox from "./FilterCheckBox";

export default function BrandFilter({ items }: { items: Brand[] }) {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Brands
      </h3>
      <div className="space-y-2">
        {items.map(({ name, quantity }) => (
          <FilterCheckBox
            slug={"#"}
            key={name}
            name={name}
            productsCount={quantity}
          />
        ))}
      </div>
    </div>
  );
}