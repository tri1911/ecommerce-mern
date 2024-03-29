import { Link } from "react-router-dom";
import { format } from "date-fns";
import { useAppSelector } from "hooks";
import { selectAllReviews } from "slices/reviews.slice";
import { StarIcon } from "@heroicons/react/solid";
import type { UserReview } from "services/review.service";
import classNames from "classnames";

function ReviewRow({ review }: { review: UserReview }) {
  const { order, purchasedAt, product, productRating } = review;

  return (
    <div className="px-6 py-7 shadow md:flex md:items-start md:justify-between">
      <div className="flex items-start">
        <div className="w-16 rounded overflow-hidden">
          <img
            src={`${product.image}`}
            alt="product thumbnail"
            className="w-full object-cover"
          />
        </div>
        <div className="pl-4 md:w-[200px]">
          <Link
            to={`/products/${product._id}`}
            className="block mb-2 font-roboto text-base leading-5 font-medium hover:text-primary transition"
          >
            {product.title}
          </Link>
          <div className="flex gap-1 text-sm text-yellow-400">
            {[...Array(5).keys()].map((key) => (
              <StarIcon
                key={key}
                className={classNames(
                  "w-4 h-4",
                  { "text-yellow-400": productRating >= key + 1 },
                  { "text-gray-200": productRating < key + 1 }
                )}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between md:justify-around md:mt-0 md:grow">
        <div>
          <h5 className="mb-1 font-roboto text-sm sm:text-base leading-5 font-medium">
            Order Number
          </h5>
          <p className="text-xs sm:text-sm uppercase">{order.slice(0, 10)}</p>
        </div>
        <div>
          <h5 className="mb-1 font-roboto text-sm sm:text-base leading-5 font-medium">
            Purchased
          </h5>
          <p className="text-xs sm:text-sm">
            {format(new Date(purchasedAt), "MMM dd, yyyy")}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to="details"
            state={{
              orderId: order,
              purchasedAt,
              productId: product._id,
              name: product.title,
              image: product.image,
              existingReview: review,
            }}
            className="default-btn capitalize px-4 py-2 text-xs sm:text-sm bg-white text-primary hover:bg-primary hover:text-white"
          >
            Edit Review
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MyReviews() {
  const reviews = useAppSelector(selectAllReviews);

  if (reviews.length === 0) {
    return <p className="text-center font-roboto text-gray-800">No Reviews</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <ReviewRow key={review._id} review={review} />
      ))}
      {/* <ReviewRow
        name="Xbox One Wireless Controller"
        image="x-box.png"
        action="Write a Review"
      />
      <ReviewRow
        name="Herschel Leather Duffle Bag"
        image="bag-2.png"
        action="Edit Review"
      />
      <ReviewRow
        name="Sound Intone I65 Earphone"
        image="headphone-3.png"
        action="Edit Review"
      /> */}
    </div>
  );
}
