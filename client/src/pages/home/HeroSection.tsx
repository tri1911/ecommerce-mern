import React from "react";
import { Link } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Pagination } from "swiper";
import { PaginationOptions } from "swiper/types";

function HeroSlide({
  image,
  background,
}: {
  image: string;
  background: string;
}) {
  return (
    <div
      className="bg-cover bg-no-repeat bg-center py-36 relative"
      style={{ backgroundImage: `url('images/hero/${background}')` }}
    >
      <section className="container flex items-center justify-between">
        {/* Content */}
        <div className="">
          <h1 className="xl:text-5xl md:text-4xl text-3xl text-gray-800 font-medium mb-6">
            Discover Your New Shoes
          </h1>
          <p className="text-base text-gray-700 leading-6">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Accusantium odit maxime laborum, sed ipsum sapiente.
          </p>
          <div className="mt-12">
            <Link to="#" className="default-btn">
              Shop Now
            </Link>
          </div>
        </div>
        <div className="h-72 -rotate-12 scale-75 select-none hidden md:block">
          <img src={`/images/hero/${image}`} alt="" />
        </div>
      </section>
    </div>
  );
}

export default function HeroSection() {
  const pagination: PaginationOptions = {
    clickable: true,
  };

  return (
    <>
      <Swiper
        pagination={pagination}
        navigation={true}
        modules={[Pagination, Navigation]}
      >
        <SwiperSlide>
          <HeroSlide image="hero-1.png" background="hero-bg-1.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide image="hero-2.png" background="hero-bg-2.jpeg" />
        </SwiperSlide>
        <SwiperSlide>
          <HeroSlide image="hero-3.png" background="hero-bg-1.jpeg" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}

/*
  <div
    className="bg-cover bg-no-repeat bg-center py-36 relative"
    style={{ backgroundImage: "url('images/banner-bg.jpg')" }}
  >
    <section className="container">
      <h1 className="xl:text-6xl md:text-5xl text-4xl text-gray-800 font-medium mb-4">
        Best Collection For <br className="hidden sm:block" /> Home Decoration
      </h1>
      <p className="text-base text-gray-600 leading-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa{" "}
        <br className="hidden sm:block" />
        assumenda aliquid inventore nihil laboriosam odio
      </p>
      <div className="mt-12">
        <Link to="/shop" className="default-btn">
          Shop Now
        </Link>
      </div>
    </section>
  </div>
*/
