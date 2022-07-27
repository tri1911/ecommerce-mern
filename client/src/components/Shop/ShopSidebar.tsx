import BrandFilter from "../Filters/BrandFilter";
import PriceFilter from "../Filters/PriceFilter";
import SizeFilter from "../Filters/SizeFilter";
import ColorFilter from "../Filters/ColorFilter";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { Category } from "../../services/category.service";

const CategoryLinkItem = ({
  category: { _id, name, count },
}: {
  category: Category;
}) => (
  <div className="flex items-center justify-between">
    <Link
      to={`/categories/${_id}`}
      className="text-gray-600 hover:text-primary"
    >
      {name}
    </Link>
    <div className="text-sm text-gray-600">({count})</div>
  </div>
);

const SubCategoriesList = ({ categories }: { categories?: Category[] }) => (
  <div className="">
    <h3 className="mb-3 text-xl text-gray-800 uppercase font-medium">
      Categories
    </h3>
    <div className="space-y-2">
      {categories?.map((category) => (
        <CategoryLinkItem key={category._id} category={category} />
      ))}
    </div>
  </div>
);

export default function ShopSideBar() {
  const { categories, brands, sizes, colors } = useAppSelector(
    (state) => state.products
  );

  return (
    <div className="relative space-y-5 divide-y divide-gray-200 ">
      <SubCategoriesList categories={categories} />
      <BrandFilter brands={brands} />
      <PriceFilter />
      <SizeFilter sizes={sizes} />
      <ColorFilter colors={colors} />
    </div>
  );
}
