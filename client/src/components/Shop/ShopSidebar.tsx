import BrandFilter from "../Filters/BrandFilter";
import PriceFilter from "../Filters/PriceFilter";
import SizeFilter from "../Filters/SizeFilter";
import ColorFilter from "../Filters/ColorFilter";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../app/store";
import CategoryFilter from "../Filters/CategoryFilter";

const SubCategoriesList = () => {
  const subcategories = useAppSelector(
    (state: RootState) => state.category.data?.children
  );

  if (!subcategories || subcategories.length === 0) {
    return null;
  }

  return (
    <div className="">
      <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
        Sub-Categories
      </h3>
      <div className="space-y-2">
        {subcategories?.map(({ _id, name }) => (
          <div key={_id}>
            <Link
              to={`/categories/${_id}`}
              className="text-gray-600 hover:text-primary"
            >
              {name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShopSideBar = () => {
  const { categories, brands, sizes, colors, price } = useAppSelector(
    (state) => state.products
  );

  return (
    <div className="relative space-y-5 divide-y divide-gray-200 ">
      <SubCategoriesList />
      {categories && <CategoryFilter categories={categories} />}
      {brands && <BrandFilter brands={brands} />}
      {price && <PriceFilter {...price} />}
      {sizes && <SizeFilter sizes={sizes} />}
      {colors && <ColorFilter colors={colors} />}
    </div>
  );
};

export default ShopSideBar;
