import { useSearchParams } from "react-router-dom";
import { useFilterCheckboxHandler } from "../../app/hooks";
import { Category } from "../../types";
import FilterCheckBox from "./FilterCheckBox";

function CloseFilterButton() {
  return (
    <div className="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer">
      <i className="fas fa-times" />
    </div>
  );
}

export default function CategoryFilter({ items }: { items: Category[] }) {
  const [searchParams] = useSearchParams();
  const handleCategorySelected = useFilterCheckboxHandler();

  return (
    <div className="relative">
      <CloseFilterButton />
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {items.map(({ slug, name: text, quantity }) => (
          <FilterCheckBox
            key={slug}
            slug={slug}
            text={text}
            name="category"
            productsCount={quantity}
            checked={searchParams.getAll("category").includes(slug)}
            onChange={handleCategorySelected}
          />
        ))}
      </div>
    </div>
  );
}
