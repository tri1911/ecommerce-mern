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
  const { status, newArrivals, recommendations, topRated } = useAppSelector(
    (state) => state.home
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        getNewProducts({
          newArrivalsLimit: 8,
          recommendationsLimit: 12,
          topRatedLimit: 3,
        })
      );
    }
  }, [dispatch, status]);

  return (
    <div>
      <HeroSection />
      <Features />
      <Offers />
      <CategoriesList />
      <BestSellingSection topRated={topRated} />
      <Advertisement />
      <ProductsCarouselSection title="New Arrivals" products={newArrivals} />
      <RecommendationSection
        title="Recommended for you"
        products={recommendations}
      />
    </div>
  );
}
