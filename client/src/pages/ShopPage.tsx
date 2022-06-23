import Breadcrumbs from "../components/Shared/Breadcrumbs";
import FilterToggle from "../components/Shop/FilterToggle";
import ProductsDisplayControl from "../components/Shop/ProductsDisplayControl";
import ProductsList from "../components/Shop/ProductsList";
import ProductSorter from "../components/Shop/ProductSorter";
import ShopSidebar from "../components/Shop/ShopSidebar";

export default function ShopPage() {
  return (
    <div>
      <Breadcrumbs locationName="Shop" />
      <div className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
        <section className="col-span-1 bg-white px-4 pt-4 pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
          <ShopSidebar />
        </section>
        <section className="col-span-3">
          <div className="mb-4 flex items-center">
            <FilterToggle />
            <ProductSorter />
            <ProductsDisplayControl />
          </div>
          <ProductsList />
        </section>
      </div>
    </div>
  );
}
