import { StarIcon } from "@heroicons/react/solid";
import classNames from "classnames";

function SingleRatingRate({
  rating,
  rightOffset,
}: {
  rating: number;
  rightOffset: string;
}) {
  return (
    <li className="__single-rating flex items-center space-x-2">
      <span className="text-xs w-2 text-center">{rating}</span>
      <StarIcon className="w-4 h-4 text-yellow-400" />
      <div className="__indicator relative h-3 w-full rounded-md bg-gray-200">
        <div
          className={classNames(
            "absolute left-0 bg-yellow-400 h-full rounded-md",
            rightOffset
          )}
        />
      </div>
      <span className="inline-block pl-3 text-xs text-gray-800">63%</span>
    </li>
  );
}

function SingleReview({ rating }: { rating: number }) {
  return (
    <div className="__single-review space-y-3">
      <div className="__profile flex space-x-3">
        <div className="__avatar w-9 h-9 rounded-full overflow-hidden">
          <img
            src="/images/my-avatar.jpeg"
            alt="avatar"
            className="w-full object-cover"
          />
        </div>
        <div className="__name-and-rating space-y-1">
          <h4 className="__name text-xs font-medium text-gray-800">
            Emily Selman
          </h4>
          <div className="__rating flex space-x-1 text-xs text-yellow-400">
            {[...Array(5).keys()].map((key) => (
              <span key={key}>
                <i
                  className={
                    rating >= key + 1
                      ? "fas fa-star"
                      : rating >= key + 0.5
                      ? "fas fa-star-half-alt"
                      : "far fa-star"
                  }
                />
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="__comment">
        <p className="italic font-roboto text-sm font-thin text-gray-500">
          This is the macbook pro of my dreams. I took it on my last vacation
          and was able to fit an absurd amount of data for the many long and
          hungry flights.
        </p>
      </div>
    </div>
  );
}

export default function Reviews() {
  const rating = 4;

  return (
    <div className="sm:grid sm:grid-cols-5 sm:space-x-14 bg-white rounded-md">
      <div className="__left sm:col-span-2 space-y-8">
        <div className="__summary-wrp flex-col space-y-4">
          <h4 className="__heading text-xl text-gray-900 font-semibold">
            Customer Reviews
          </h4>
          <div className="__rating-wrp flex items-center space-x-2">
            <div className="__rating flex space-x-1 text-xs text-yellow-400">
              {[...Array(5).keys()].map((key) => (
                <span key={key}>
                  <i
                    className={
                      rating >= key + 1
                        ? "fas fa-star"
                        : rating >= key + 0.5
                        ? "fas fa-star-half-alt"
                        : "far fa-star"
                    }
                  />
                </span>
              ))}
            </div>
            <p className="__reviews text-xs text-gray-700">
              Based on 1624 reviews
            </p>
          </div>
          <ul className="__rating-statistics flex-col space-y-3">
            <SingleRatingRate rating={5} rightOffset="right-[37%]" />
            <SingleRatingRate rating={4} rightOffset="right-[90%]" />
            <SingleRatingRate rating={3} rightOffset="right-[94%]" />
            <SingleRatingRate rating={2} rightOffset="right-[88%]" />
            <SingleRatingRate rating={1} rightOffset="right-[93%]" />
          </ul>
        </div>
        <div className="__write-review space-y-4">
          <div className="__heading space-y-1">
            <h5 className="text-base font-normal text-gray-800">
              Share your thoughts
            </h5>
            <p className="text-xs">
              If you've used this product, share your thoughts with other
              customers
            </p>
          </div>
          <div className="">
            <button className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm font-roboto text-gray-700 hover:bg-gray-100">
              Write a review
            </button>
          </div>
        </div>
      </div>
      <ul className="__right sm:col-span-3 divide-y flex-col overflow-y-scroll space-y-7 sm:max-h-[400px] mt-8 sm:mt-0">
        <li className="pt-5">
          <SingleReview rating={5} />
        </li>
        <li className="pt-7">
          <SingleReview rating={3.5} />
        </li>
        <li className="pt-5">
          <SingleReview rating={4} />
        </li>
        <li className="pt-5">
          <SingleReview rating={4} />
        </li>
      </ul>
    </div>
  );
}
