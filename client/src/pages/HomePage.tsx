import Advertisement from "../components/Home/Advertisement";
import Banner from "../components/Home/Banner";
import CategoriesList from "../components/Home/CategoriesList";
import Features from "../components/Home/Features";
import ProductSection from "../components/Home/ProductSection";
import { products } from "../data/products";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Features />
      <CategoriesList />
      <ProductSection title="top new arrival" products={products.slice(0, 4)} />
      <Advertisement />
      <ProductSection title="top new arrival" products={products.slice(4)} />
    </div>
  );
}
