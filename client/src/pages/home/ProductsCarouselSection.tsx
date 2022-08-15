import { useState } from "react";
import { Link } from "react-router-dom";
import { Product } from "services/category.service";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import ProductVerticalCard from "components/Shared/ProductVerticalCard";
// swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default function ProductsCarouselSection({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <section className="container pb-16">
      {/* Heading */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase">
          {title}
        </h2>
        <Link
          to="#"
          className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-500"
        >
          <span className="font-medium">See More</span>
          <ChevronRightIcon className="w-4 h-4" />
        </Link>
      </div>
      {/* <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-6"> */}
      <div className="relative">
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          navigation={{ prevEl, nextEl }}
          modules={[Navigation]}
          loop={true}
        >
          {products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductVerticalCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Custom Nav Buttons */}
        <button
          className="absolute top-1/2 -left-4 -translate-x-full z-10 p-2 rounded-full shadow-md hover:bg-primary hover:text-white"
          ref={(element) => setPrevEl(element)}
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          className="absolute top-1/2 -right-4 translate-x-full z-10 p-2 rounded-full shadow-md hover:bg-primary hover:text-white"
          ref={(element) => setNextEl(element)}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
      {/* </div> */}
    </section>
  );
}
