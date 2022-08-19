import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks";
import Breadcrumbs from "components/Shared/Breadcrumbs";
import Spinner from "components/Shared/Spinner";
import ShopSideBar from "components/Shop/ShopSidebar";
import {
  fetchProductsByCategory,
  selectAllProducts,
} from "slices/products.slice";
import ProductsGridView from "components/Shop/ProductsGridView";
import ProductsSorter from "components/Shop/ProductsSorter";
import ProductsDisplayControl from "components/Shop/ProductsDisplayControl";
import ProductsListView from "components/Shop/ProductsListView";
import { ShopDisplayMode } from "types";
import Pagination from "components/Pagination";
import { RootState } from "app/store";
import categoryToCrumbs from "utils/generate-crumbs.util";
import { fetchSingleCategory } from "slices/category.slice";

// NOTE: put it into configuration file
const PAGE_SIZE = 12;

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(
        fetchProductsByCategory({
          categoryId,
          queries: {
            category: searchParams.getAll("category"),
            brand: searchParams.getAll("brand"),
            sizes: searchParams.getAll("size"),
            colors: searchParams.getAll("color"),
            minPrice: searchParams.get("minPrice"),
            maxPrice: searchParams.get("maxPrice"),
            page: searchParams.get("page"),
            limit: PAGE_SIZE,
            sort: searchParams.get("sort"),
          },
        })
      );
    }
  }, [dispatch, searchParams, categoryId]);

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchSingleCategory(categoryId));
    }
  }, [dispatch, categoryId]);

  const [displayMode, setDisplayMode] = useState<ShopDisplayMode>("grid");
  const { status, metadata } = useAppSelector((state) => state.products);
  const category = useAppSelector((state: RootState) => state.category.data);
  const products = useAppSelector(selectAllProducts);
  const crumbs = category ? categoryToCrumbs(category) : [];

  return (
    <div>
      <Breadcrumbs crumbs={crumbs} />
      <main className="container grid lg:grid-cols-4 gap-6 pt-4 pb-16 items-start relative">
        <section className="col-span-1 px-4 pt-4 pb-6 bg-white shadow rounded overflow-hidden absolute left-4 top-16 z-10 w-72 lg:static lg:block lg:w-full">
          <ShopSideBar />
        </section>
        <section className="col-span-3 space-y-4">
          <div className="flex items-center">
            <ProductsSorter />
            <ProductsDisplayControl
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
          </div>
          <div className="">
            {status === "loading" && <Spinner />}
            {status === "succeeded" ? (
              products.length > 0 ? (
                <>
                  {displayMode === "grid" ? (
                    <ProductsGridView products={products} />
                  ) : (
                    <ProductsListView products={products} />
                  )}
                  {metadata && (
                    <div className="__pagination-container mt-4">
                      <Pagination
                        total={metadata.total}
                        pageSize={metadata.pageSize}
                      />
                    </div>
                  )}
                </>
              ) : (
                "No Products Found"
              )
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductsPage;
