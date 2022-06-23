import { useNavigate, useSearchParams } from "react-router-dom";
import { Brand } from "../../types";
import FilterCheckBox from "./FilterCheckBox";

// TODO: abstract the CategoryFilter & BrandFilter into a generic one
export default function BrandFilter({ items }: { items: Brand[] }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const handleBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { checked, name } = event.target;

    if (checked) {
      searchParams.append("brand", name);
      setSearchParams(searchParams);
      // navigate(`/shop?${searchParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(
        Array.from(searchParams).filter(
          ([key, value]) => key !== "brand" || value !== name
        )
      );
      setSearchParams(newParams);
      // navigate(`/shop?${newParams.toString()}`);
    }
  };

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Brands
      </h3>
      <div className="space-y-2">
        {items.map(({ slug, name, quantity }) => (
          <FilterCheckBox
            key={slug}
            slug={slug}
            name={name}
            productsCount={quantity}
            checked={searchParams.getAll("brand").includes(slug)}
            onChange={handleBoxChecked}
          />
        ))}
      </div>
    </div>
  );
}
