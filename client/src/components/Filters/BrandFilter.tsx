import { useSearchParams } from "react-router-dom";
import { Brand } from "../../services/category.service";
import FilterCheckBox from "./FilterCheckBox";
import useFilterCheckboxHandler from "../../hooks/useFilterCheckboxHandler";

export default function BrandFilter({ brands }: { brands: Brand[] }) {
  const [searchParams] = useSearchParams();
  const handleBrandSelected = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
        Brands
      </h3>
      <div className="space-y-2">
        {brands.map(({ _id, count }) => (
          <FilterCheckBox
            key={_id}
            id={_id}
            name="brand"
            value={encodeURIComponent(_id)}
            text={_id}
            count={count}
            checked={searchParams
              .getAll("brand")
              .includes(encodeURIComponent(_id))}
            onChange={handleBrandSelected}
          />
        ))}
      </div>
    </div>
  );
}
