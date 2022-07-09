import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Breadcrumbs from "../components/Shared/Breadcrumbs";
import Spinner from "../components/Shared/Spinner";
import FilterToggle from "../components/Shop/FilterToggle";
import ProductsDisplayControl from "../components/Shop/ProductsDisplayControl";
import ProductsGridView from "../components/Shop/ProductsGridView";
import ProductsListView from "../components/Shop/ProductsListView";
import ProductSorter from "../components/Shop/ProductSorter";
import ShopSideBar from "../components/Shop/ShopSideBar";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsRequestStatus,
} from "../slices/productsSlice";
import { SORT_OPTIONS } from "../types";

function PageItem({ active, page }: { active?: boolean; page: number }) {
  // bg-indigo-50 text-indigo-600 border-indigo-500
  const activeStyle =
    "z-10 relative inline-flex items-center px-4 py-2 text-sm font-medium border bg-primary text-white border-primary";
  const defaultStyle =
    "relative inline-flex items-center px-4 py-2 bg-white text-gray-500 text-sm font-medium border border-gray-300 hover:bg-gray-50";

  return (
    <Link
      to={`/shop?page=${page}`}
      aria-current={active && "page"}
      className={active ? activeStyle : defaultStyle}
    >
      {page}
    </Link>
  );
}

function Pagination({
  current = 1,
  pages,
}: {
  current?: number;
  pages: number;
}) {
  return (
    <div className="__pagination-wrapper bg-white py-3 flex items-center justify-between">
      <div className="__mobile-pagination flex-1 flex justify-between sm:hidden">
        <Link
          to="/shop?page=previous"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Previous
        </Link>
        <Link
          to="/shop?page=next"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Next
        </Link>
      </div>
      <div className="__main-pagination hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="__current-page-desc">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div className="__pages-control">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <Link
              to="/shop?page=previous"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-50"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
            {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            <PageItem active={current === 1} page={1} />
            <PageItem active={current === 2} page={2} />
            <PageItem active={current === 3} page={3} />
            <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
              ...
            </span>
            <PageItem page={8} />
            <PageItem page={9} />
            <PageItem page={10} />
            <Link
              to="/shop?page=previous"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:text-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  /* importing hooks */

  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();

  /* Select desired data */

  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsRequestStatus);

  const currentPage = useAppSelector((state) => state.products.page);
  const pagesInTotal = useAppSelector((state) => state.products.pages);

  const pageQuery = searchParams.get("page") || undefined;

  // TODO: refactor to `filter` object (later, after finishing the ui prototype part) & use `useMemo` as well

  /* Filtering */

  const selectedCategories = searchParams.getAll("category") ?? [];
  const selectedBrands = searchParams.getAll("brand") ?? [];
  const selectedSizes = searchParams.getAll("size") ?? [];
  const selectedColors = searchParams.getAll("color") ?? [];

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
    .filter((product) =>
      selectedSizes.length === 0 ? true : selectedSizes.includes(product.size)
    )
    .filter((product) =>
      selectedColors.length === 0
        ? true
        : selectedColors.includes(product.color)
    );

  /* Sorting */

  const selectedSort = searchParams.get("sort") ?? "";

  if (selectedSort) {
    const { compareFn } = SORT_OPTIONS[selectedSort];
    processedProducts.sort(compareFn);
  }

  /* Fetching data when the page was mounted */

  useEffect(() => {
    if (
      status === "idle" ||
      (status !== "loading" &&
        currentPage !== undefined &&
        pageQuery !== undefined &&
        parseInt(pageQuery) !== currentPage)
    ) {
      dispatch(fetchProducts({ page: pageQuery }));
    }
  }, [dispatch, status, currentPage, pageQuery]);

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
            <ProductsDisplayControl
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
          </div>
          <div className="">
            {status === "loading" && <Spinner />}
            {status === "succeeded" &&
              (displayMode === "grid" ? (
                <ProductsGridView products={processedProducts} />
              ) : (
                <ProductsListView products={processedProducts} />
              ))}
          </div>
          {pagesInTotal && (
            <div className="__pagination-container mt-4">
              <Pagination current={currentPage} pages={pagesInTotal} />
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
