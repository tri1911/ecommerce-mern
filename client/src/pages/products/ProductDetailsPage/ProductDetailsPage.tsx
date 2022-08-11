import { useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import { useAppSelector, useAppDispatch } from "hooks";
// import ProductSection from "components/Home/ProductSection";
// import Breadcrumbs from "components/Shared/Breadcrumbs";
import Spinner from "components/Shared/Spinner";
import { fetchSingleProduct, selectProductDetails } from "slices/product.slice";
// import { selectAllProducts } from "slices/products.slice";
import ProductImage from "./ProductImage";
import ProductContent from "./ProductContent";
import ProductInfo from "./ProductInfo";
import QA from "./QA";
import Reviews from "./Reviews";

export default function ProductDetailsPage() {
  const { productId } = useParams();

  const dispatch = useAppDispatch();

  // const product = useAppSelector((state) =>
  //   selectProductById(state, productId!)
  // );

  const { status, data: product } = useAppSelector(selectProductDetails);

  useEffect(() => {
    if (productId && productId !== product?._id) {
      dispatch(fetchSingleProduct(productId));
    }
  }, [dispatch, productId, product]);

  // const products = useAppSelector(selectAllProducts);

  if (!product) {
    return null;
  }

  if (status === "loading") {
    return <Spinner />;
  }

  const tabs = ["Product Info", "Question & Answers", "Review (10)"];

  return (
    <div>
      {/* <Breadcrumbs crumbs={["Shop", product?.name ?? "unknown"]} /> */}
      {/* Main Info */}
      <section className="container pt-4 pb-6 grid lg:grid-cols-2 gap-6">
        <ProductImage />
        <ProductContent product={product} />
      </section>
      {/* Tab Views */}
      <section className="container pb-16">
        <Tab.Group>
          <Tab.List className="border-b border-gray-200 space-x-2">
            {tabs.map((tab) => (
              <Tab
                key={tab}
                className={({ selected }) =>
                  classNames(
                    "px-4 py-2 border border-b-0 rounded-t-md font-roboto text-base font-medium focus:outline-none",
                    selected
                      ? "text-primary border-primary"
                      : "text-gray-700 border-gray-700 "
                  )
                }
              >
                {tab}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel className="lg:w-4/5 xl:w-3/5 pt-6">
              <ProductInfo />
            </Tab.Panel>
            <Tab.Panel className="pt-6">
              <QA />
            </Tab.Panel>
            <Tab.Panel className="pt-6">
              <Reviews />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </section>
      {/* <ProductSection
        title="related products"
        products={products.slice(0, 4)}
      /> */}
    </div>
  );
}
