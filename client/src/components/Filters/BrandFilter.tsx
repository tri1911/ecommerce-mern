import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterCheckboxHandler from "hooks/useFilterCheckboxHandler";
import { Brand } from "services/category.service";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import FilterCheckBox from "./FilterCheckBox";

const SHOW_LIMIT = 5;

export default function BrandFilter({ brands }: { brands: Brand[] }) {
  const [searchParams] = useSearchParams();
  const handleBrandSelected = useFilterCheckboxHandler();

  const [showFull, setShowFull] = useState(!(brands.length > SHOW_LIMIT));
  const brandsToShow = showFull ? brands : brands.slice(0, SHOW_LIMIT);

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
        Brands
      </h3>
      <div className="space-y-2">
        {brandsToShow.map(({ _id, count }) => (
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
      {brands.length > SHOW_LIMIT && (
        <div className="mt-3">
          <button
            className="flex items-center"
            onClick={() => setShowFull((showMore) => !showMore)}
          >
            <span className="font-roboto font-medium text-primary">
              {showFull ? "Show Less" : "Show More"}
            </span>
            {showFull ? (
              <ChevronUpIcon className="w-4 h-4 ml-1 text-primary" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-1 text-primary" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
