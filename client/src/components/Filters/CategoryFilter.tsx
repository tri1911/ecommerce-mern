import FilterCheckBox from "./FilterCheckBox";
import { useSearchParams } from "react-router-dom";
import useFilterCheckboxHandler from "../../hooks/useFilterCheckboxHandler";
import { Category } from "../../services/category.service";

const CategoryFilter = ({ categories }: { categories: Category[] }) => {
  const [searchParams] = useSearchParams();
  const handleCategorySelected = useFilterCheckboxHandler();

  return (
    <div className="pt-4">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {categories.map(({ _id, count }) => (
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
    </div>
  );
};

export default CategoryFilter;
