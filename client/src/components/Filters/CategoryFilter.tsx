import { useNavigate, useSearchParams } from "react-router-dom";
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

  const navigate = useNavigate();

  // make the filter checkbox to be additive (clicking `cat1` and then `cat2` adds both categories to the search params) instead of replacing the brand
  const handleBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked, name } = event.target;

    if (checked) {
      // setSearchParams({ category: name });
      searchParams.append("category", name);
      navigate(`/shop?${searchParams.toString()}`);
    } else {
      // setSearchParams({});
      const newParams = new URLSearchParams(
        Array.from(searchParams).filter(
          ([key, value]) => key !== "category" || value !== name
        )
      );
      navigate(`/shop?${newParams.toString()}`);
    }
  };

  return (
    <div className="relative">
      <CloseFilterButton />
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {items.map(({ slug, name, quantity }) => (
          <FilterCheckBox
            key={name}
            name={name}
            slug={slug}
            productsCount={quantity}
            checked={searchParams.getAll("category").includes(slug)}
            onChange={handleBoxChecked}
          />
        ))}
      </div>
    </div>
  );
}
