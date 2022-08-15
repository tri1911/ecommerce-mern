import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { getNewProducts } from "slices/home.slice";
// components
import HeroSection from "pages/home/HeroSection";
import Features from "pages/home/Features";
import Offers from "./Offers";
import CategoriesList from "pages/home/CategoriesList";
import ProductsCarouselSection from "./ProductsCarouselSection";
import Advertisement from "./Advertisement";
import BestSellingSection from "./BestSellingSection";
import RecommendationSection from "./RecommendationSection";

export default function HomePage() {
  const { newArrivals, status } = useAppSelector((state) => state.home);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      // fetch 10 newest products from server
      dispatch(getNewProducts(10));
    }
  }, [dispatch, status]);

  return (
    <div>
      <HeroSection />
      <Features />
      <Offers />
      <CategoriesList />
      <BestSellingSection />
      <Advertisement />
      <ProductsCarouselSection title="New Arrivals" products={newArrivals} />
      <RecommendationSection
        title="Recommended for you"
        products={newArrivals}
      />
    </div>
  );
}
