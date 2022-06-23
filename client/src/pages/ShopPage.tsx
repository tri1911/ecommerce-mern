import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import Spinner from "../components/Shared/Spinner";
import FilterToggle from "../components/Shop/FilterToggle";
import ProductsDisplayControl from "../components/Shop/ProductsDisplayControl";
import ProductsList from "../components/Shop/ProductsList";
import ProductSorter from "../components/Shop/ProductSorter";
import ShopSidebar from "../components/Shop/ShopSidebar";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsRequestStatus,
} from "../slices/productsSlice";

export default function ShopPage() {
  const [searchParams] = useSearchParams();

  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsRequestStatus);

  const selectedCategories = searchParams.getAll("category") ?? "";
  const selectedBrands = searchParams.getAll("brand") ?? "";
  const selectedSize = searchParams.get("size") ?? "";

  const filteredProducts = products
    .filter((product) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(product.category)
    )
    .filter((product) =>
      selectedBrands.length === 0
        ? true
        : selectedBrands.includes(product.brand)
    )
    .filter((product) =>
      !selectedSize ? true : selectedSize === product.size
    );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

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
          {status === "loading" && <Spinner />}
          {status === "succeeded" && (
            <ProductsList products={filteredProducts} />
          )}
        </section>
      </div>
    </div>
  );
}
