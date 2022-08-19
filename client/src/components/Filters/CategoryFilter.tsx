import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFilterCheckboxHandler from "hooks/useFilterCheckboxHandler";
import { Category } from "services/category.service";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";
import FilterCheckBox from "./FilterCheckBox";

const SHOW_LIMIT = 5;

const CategoryFilter = ({ categories }: { categories: Category[] }) => {
  const [searchParams] = useSearchParams();
  const handleCategorySelected = useFilterCheckboxHandler();

  const [showFull, setShowFull] = useState(!(categories.length > SHOW_LIMIT));
  const categoriesToShow = showFull
    ? categories
    : categories.slice(0, SHOW_LIMIT);

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {categoriesToShow.map(({ _id, count }) => (
          <FilterCheckBox
            key={_id}
            id={_id}
            name="category"
            value={encodeURIComponent(_id)}
            text={_id}
            count={count}
            checked={searchParams
              .getAll("category")
              .includes(encodeURIComponent(_id))}
            onChange={handleCategorySelected}
          />
        ))}
      </div>
      {categories.length > SHOW_LIMIT && (
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
};

export default CategoryFilter;
