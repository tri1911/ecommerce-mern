import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import Spinner from "../components/Shared/Spinner";
import FilterToggle from "../components/Shop/FilterToggle";
import ProductsDisplayControl from "../components/Shop/ProductsDisplayControl";
import ProductsList from "../components/Shop/ProductsList";
import ProductSorter from "../components/Shop/ProductSorter";
import ShopSideBar from "../components/Shop/ShopSideBar";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsRequestStatus,
} from "../slices/productsSlice";
import { SORT_OPTIONS } from "../types";

export default function ShopPage() {
  /* importing hooks */

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  /* Select desired data */

  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsRequestStatus);

  // TODO: refactor to `filter` object (later, after finishing the ui prototype part)

  /* Filtering */

  const selectedCategories = searchParams.getAll("category") ?? [];
  const selectedBrands = searchParams.getAll("brand") ?? [];
  const selectedSize = searchParams.get("size") ?? "";
  const selectedColor = searchParams.get("color") ?? "";

  let processedProducts = [];

  processedProducts = products
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
    .filter((product) => (!selectedSize ? true : selectedSize === product.size))
    .filter((product) =>
      !selectedColor ? true : selectedColor === product.color
    );

  /* Sorting */

  const selectedSort = searchParams.get("sort") ?? "";

  if (selectedSort) {
    const { compareFn } = SORT_OPTIONS[selectedSort];
    processedProducts.sort(compareFn);
  }

  /* Fetching data when the page was mounted */

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  return (
    <div>
      <Breadcrumbs paths={["Shop"]} />
      <div className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
        <section className="col-span-1 bg-white px-4 pt-4 pb-6 shadow rounded overflow-hidden absolute lg:static left-4 top-16 z-10 w-72 lg:w-full lg:block">
          <ShopSideBar />
        </section>
        <section className="col-span-3">
          <div className="mb-4 flex items-center">
            <FilterToggle />
            <ProductSorter />
            <ProductsDisplayControl />
          </div>
          {status === "loading" && <Spinner />}
          {status === "succeeded" && (
            <ProductsList products={processedProducts} />
          )}
        </section>
      </div>
    </div>
  );
}
