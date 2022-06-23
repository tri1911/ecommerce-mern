import { useSearchParams } from "react-router-dom";
import { useFilterCheckboxHandler } from "../../app/hooks";
import { Brand } from "../../types";
import FilterCheckBox from "./FilterCheckBox";

export default function BrandFilter({ items }: { items: Brand[] }) {
  const [searchParams] = useSearchParams();
  const handleBrandSelected = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Brands
      </h3>
      <div className="space-y-2">
        {items.map(({ slug, name: text, quantity }) => (
          <FilterCheckBox
            key={slug}
            slug={slug}
            text={text}
            name="brand"
            productsCount={quantity}
            checked={searchParams.getAll("brand").includes(slug)}
            onChange={handleBrandSelected}
          />
        ))}
      </div>
    </div>
  );
}
