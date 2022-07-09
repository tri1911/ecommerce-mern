import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Advertisement from "../components/Home/Advertisement";
import Banner from "../components/Home/Banner";
import CategoriesList from "../components/Home/CategoriesList";
import Features from "../components/Home/Features";
import ProductSection from "../components/Home/ProductSection";
import Spinner from "../components/Shared/Spinner";
import {
  fetchProducts,
  selectAllProducts,
  selectProductsRequestStatus,
} from "../slices/productsSlice";

export default function HomePage() {
  const dispatch = useAppDispatch();

  const products = useAppSelector(selectAllProducts);
  const status = useAppSelector(selectProductsRequestStatus);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts({}));
    }
  }, [dispatch, status]);

  return (
    <div>
      <Banner />
      <Features />
      <CategoriesList />
      {status === "loading" ? (
        <Spinner />
      ) : (
        <ProductSection
          title="top new arrival"
          products={products.slice(0, 4)}
        />
      )}
      <Advertisement />
      {status === "loading" ? (
        <Spinner />
      ) : (
        <ProductSection title="top new arrival" products={products.slice(4)} />
      )}
    </div>
  );
}
