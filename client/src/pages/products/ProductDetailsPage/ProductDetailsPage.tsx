import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "hooks";
import { fetchSingleProduct, selectProductDetails } from "slices/product.slice";
import { selectAllProducts } from "slices/products.slice";
// import Breadcrumbs from "components/Shared/Breadcrumbs";
import Spinner from "components/Shared/Spinner";
import ProductImage from "./ProductImage";
import ProductContent from "./ProductContent";
import TabsView from "./TabsView";
import ProductsCarouselSection from "pages/home/ProductsCarouselSection";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  const { status, data: product } = useAppSelector(selectProductDetails);

  useEffect(() => {
    if (productId && productId !== product?._id) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId, product]);

  const products = useAppSelector(selectAllProducts);

  if (status === "loading") {
    return <Spinner />;
  }

  if (!product) {
    return null;
  }

  return (
    <div>
      {/* <Breadcrumbs crumbs={["Shop", product?.name ?? "unknown"]} /> */}
      <section className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
        <ProductImage />
        <ProductContent product={product} />
      </section>
      <TabsView />
      <ProductsCarouselSection
        title="related products"
        products={products.slice(0, 4)}
      />
    </div>
  );
}
