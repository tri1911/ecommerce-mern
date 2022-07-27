import Advertisement from "../components/Home/Advertisement";
import Banner from "../components/Home/Banner";
import CategoriesList from "../components/Home/CategoriesList";
import Features from "../components/Home/Features";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <Features />
      <CategoriesList />
      {/* {status === "loading" ? (
        <Spinner />
      ) : (
        <ProductSection
          title="top new arrival"
          products={products.slice(0, 4)}
        />
      )} */}
      <Advertisement />
      {/* {status === "loading" ? (
        <Spinner />
      ) : (
        <ProductSection title="top new arrival" products={products.slice(4)} />
      )} */}
    </div>
  );
}
