import {
  ChevronRightIcon,
  HomeIcon,
  ThumbUpIcon,
} from "@heroicons/react/outline";
import { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function StatisticItem({ value, text }: { value: string; text: string }) {
  return (
    <div>
      <h4 className="mb-1 uppercase text-xl leading-5 text-primary font-medium">
        {value}
      </h4>
      <p className="text-gray-800">{text}</p>
    </div>
  );
}

function VisionListItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex text-gray-800">
      <span className="pt-1 mr-2 text-primary">
        <ThumbUpIcon className="w-4 h-4" />
      </span>
      {children}
    </li>
  );
}

function TeamMember({
  image,
  name,
  title,
}: {
  image: string;
  name: string;
  title: string;
}) {
  return (
    <div className="w-80 space-y-3 group">
      <div className="__image relative rounded overflow-hidden">
        <img src={`/images/team/${image}.jpeg`} alt="" className="w-full" />
        <div className="__icons hidden absolute bottom-4 w-full group-hover:flex justify-center space-x-4">
          <Link to="#" className="rounded py-0.5 px-2 bg-blue-500 text-white">
            <i className="fab fa-facebook-f" />
          </Link>
          <Link to="#" className="rounded py-0.5 px-2 bg-green-500 text-white">
            <i className="fab fa-twitter" />
          </Link>
          <Link to="#" className="rounded py-0.5 px-2 bg-red-500 text-white">
            <i className="fab fa-linkedin-in" />
          </Link>
        </div>
      </div>
      <div className="__content text-center">
        <Link to="#" className="font-roboto text-lg text-gray-900 font-medium">
          {name}
        </Link>
        <p className="text-gray-800">{title}</p>
      </div>
    </div>
  );
}

function Partner({ image }: { image: string }) {
  return (
    <div className="w-44">
      <img src={image} alt="" className="w-full" />
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div>
      <div
        className="__about-banner bg-cover bg-no-repeat bg-center h-72 flex items-center justify-center"
        style={{ backgroundImage: "url('/images/contact-banner.jpeg')" }}
      >
        <div>
          <h1 className="mb-4 text-2xl text-white font-medium uppercase">
            About Us
          </h1>
          <div className="__breadcrumbs flex items-center space-x-1">
            <Link to="/">
              <HomeIcon className="w-4 h-4 text-primary" />
            </Link>
            <span>
              <ChevronRightIcon className="w-4 h-4 text-white" />
            </span>
            <Link to="#" className="font-roboto text-white text-base">
              About us
            </Link>
          </div>
        </div>
      </div>
      <div className="container py-14 space-y-14">
        <div className="__history lg:grid lg:grid-cols-12 lg:gap-7">
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="mb-2 uppercase text-primary font-medium">
              Our history
            </h2>
            <h3 className="mb-4 uppercase text-xl text-gray-900 font-medium">
              Creative and new fashion <br className="hidden xl:block" /> trends
              collection
            </h3>
            <p className="mb-6">
              Fashion is a potent visual marker of our times,” says Caroline
              Stevenson, head of cultural and ... “Trend analysis of any given
              era will reveal society's values and aspirations.” ... The urge to
              creative expression runs deep
            </p>
            <div className="flex justify-between pt-2">
              <StatisticItem value="12" text="Years experience" />
              <StatisticItem value="20k" text="Happy Customers" />
              <StatisticItem value="100%" text="Clients Satisfaction" />
            </div>
          </div>
          <div className="__image mt-6 lg:col-span-6 lg:mt-0 xl:col-span-5">
            <img src="/images/about-img.jpeg" alt="" className="w-full" />
          </div>
        </div>
        <div className="__vision flex flex-col-reverse lg:grid lg:grid-cols-12 lg:gap-7">
          <div className="__image mt-6 lg:col-span-6 lg:mt-0 xl:col-span-5">
            <img src="/images/about-img-2.jpeg" alt="" className="w-full" />
          </div>
          <div className="lg:col-span-6 xl:col-span-7">
            <h2 className="mb-2 uppercase text-primary font-medium">
              Our vision
            </h2>
            <h3 className="mb-4 uppercase text-xl text-gray-900 font-medium">
              Our vision is simple - We exist to{" "}
              <br className="hidden xl:block" /> accelerate our customers’
              progress
            </h3>
            <p className="mb-6">
              We design and deliver our customers’ digital transformation by
              bringing together their vision with our industry knowledge and
              deep technological expertise. we design and deliver our customers’
              digital transformation
            </p>
            <ul className="pt-2 space-y-2">
              <VisionListItem>We build strong relationships</VisionListItem>
              <VisionListItem>
                We encourage initiative and provide opportunity
              </VisionListItem>
              <VisionListItem>We embrace change and creativity</VisionListItem>
              <VisionListItem>
                We champion an environment of honesty{" "}
              </VisionListItem>
            </ul>
          </div>
        </div>
        <div className="__team space-y-5">
          <h3 className="text-2xl text-gray-900 font-medium uppercase text-center">
            Meet with our team
          </h3>
          <Swiper
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <TeamMember image="team-1" name="Jane Cooper" title="Founder" />
            </SwiperSlide>
            <SwiperSlide>
              <TeamMember
                image="team-2"
                name="Esther Howard"
                title="Team Leader"
              />
            </SwiperSlide>
            <SwiperSlide>
              <TeamMember
                image="team-4"
                name="Kristin Watson"
                title="Senior Officer"
              />
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="__partner space-y-5">
          <h3 className="text-2xl text-gray-900 font-medium uppercase text-center">
            Our Partners
          </h3>
          <Swiper
            slidesPerView={2}
            breakpoints={{
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              992: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            <SwiperSlide>
              <Partner image="/images/products/bag-2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <Partner image="/images/products/bag-2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <Partner image="/images/products/bag-2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <Partner image="/images/products/bag-2.png" />
            </SwiperSlide>
            <SwiperSlide>
              <Partner image="/images/products/bag-2.png" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
