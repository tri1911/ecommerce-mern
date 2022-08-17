import { useMemo } from "react";
import type {
  ProductReview,
  AggregatedProductReviews,
} from "services/product.service";
import { StarIcon } from "@heroicons/react/solid";

function SingleRatingRate({
  boundary,
  percentage,
}: {
  boundary: number;
  percentage: number;
}) {
  return (
    <li className="flex items-center space-x-2">
      <span className="text-xs w-2 text-center">{boundary}</span>
      <StarIcon className="w-4 h-4 text-yellow-400" />
      <div className="w-full bg-gray-100 rounded-full h-3 border border-gray-200">
        <div
          className="bg-yellow-400 h-full rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 inline-block pl-2 text-xs text-gray-800">
        {percentage}%
      </span>
    </li>
  );
}

function ReviewsSummaryChart({
  total,
  average,
  ratings,
}: {
  total: number;
  average: number;
  ratings: Array<{ _id: number; count: number }>;
}) {
  // convert aggregated ratings [{_id: 3, count: 2}, {_id: 4, count: 1}] into rating percentage array like [0, 0, 66.7, 33.3, 0]
  const ratingPercentages = useMemo(
    () =>
      ratings.reduce((prev, cur) => {
        prev[cur._id - 1] = (cur.count / total) * 100;
        return prev;
      }, Array(5).fill(0) as number[]),
    [ratings, total]
  );

  return (
    <div className="flex-col space-y-4">
      <h4 className="text-xl text-gray-900 font-semibold">Customer Reviews</h4>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1 text-xs text-yellow-400">
          {[...Array(5).keys()].map((key) => (
            <span key={key}>
              <i
                className={
                  average >= key + 1
                    ? "fas fa-star"
                    : average >= key + 0.5
                    ? "fas fa-star-half-alt"
                    : "far fa-star"
                }
              />
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-700">Based on {total} reviews</p>
      </div>
      <ul className="flex-col space-y-3">
        {ratingPercentages.map((percentage, index) => (
          <SingleRatingRate
            key={index}
            boundary={index + 1}
            percentage={percentage}
          />
        ))}
      </ul>
    </div>
  );
}

function ReviewCTAButton() {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h5 className="text-base font-normal text-gray-800">
          Share your thoughts
        </h5>
        <p className="text-xs">
          If you've used this product, share your thoughts with other customers
        </p>
      </div>
      <div className="">
        <button className="w-full border border-gray-200 rounded-md px-4 py-2 text-sm font-roboto text-gray-700 hover:bg-gray-100">
          Write a review
        </button>
      </div>
    </div>
  );
}

function SingleReview({
  review: { rating, desc, createdAt, user },
}: {
  review: ProductReview;
}) {
  return (
    <div className="space-y-3">
      <div className="flex space-x-3">
        <div className="__avatar w-9 h-9 rounded-full overflow-hidden">
          <img
            src={user.avatar ? user.avatar : "/images/my-avatar.jpeg"}
            alt="user avatar"
            className="w-full object-cover"
          />
        </div>
        <div className="space-y-1">
          <h4 className="__name text-xs font-medium text-gray-800">
            {user.name}
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
          {desc}
        </p>
      </div>
    </div>
  );
}

function ReviewsList({ reviews }: { reviews: ProductReview[] }) {
  return (
    <ul className="divide-y flex-col space-y-7 mt-8 sm:mt-0">
      {reviews.map((review) => (
        <li key={review._id} className="pt-5">
          <SingleReview review={review} />
        </li>
      ))}
    </ul>
  );
}

export default function Reviews({
  total,
  average,
  aggregated,
}: {
  total: number;
  average: number;
  aggregated: AggregatedProductReviews;
}) {
  return (
    <section className="sm:grid sm:grid-cols-5 sm:space-x-14 bg-white rounded-md">
      <div className="__left sm:col-span-2 space-y-8">
        <ReviewsSummaryChart
          total={total}
          average={average}
          ratings={aggregated.ratings}
        />
        <ReviewCTAButton />
      </div>
      <div className="__right sm:col-span-3">
        <ReviewsList reviews={aggregated.reviews} />
      </div>
    </section>
  );
}
