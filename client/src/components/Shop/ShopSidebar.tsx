import { categories } from "../../data/categories";
import { brands } from "../../data/brands";

import CategoryFilter from "../Filters/CategoryFilter";
import BrandFilter from "../Filters/BrandFilter";
import PriceFilter from "../Filters/PriceFilter";
import SizeFilter from "../Filters/SizeFilter";
import ColorFilter from "../Filters/ColorFilter";

export default function ShopSideBar() {
  return (
    <div className="divide-gray-200 divide-y space-y-5 relative">
      <CategoryFilter items={categories} />
      <BrandFilter items={brands} />
      <PriceFilter />
      <SizeFilter />
      <ColorFilter />
    </div>
  );
}
