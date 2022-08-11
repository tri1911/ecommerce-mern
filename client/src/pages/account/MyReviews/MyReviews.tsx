import { StarIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";

function OrderReviewRow({
  name,
  image,
  action,
}: {
  name: string;
  image: string;
  action: string;
}) {
  return (
    <div className="__single-order px-6 py-7 shadow md:flex md:items-start md:justify-between">
      <div className="flex items-start">
        <div className="w-16 h-full">
          <img
            src={`/images/products/${image}`}
            alt="product thumbnail"
            className="w-full object-contain align-middle"
          />
        </div>
        <div className="pl-4 md:w-[200px]">
          <h5 className="mb-1 font-roboto text-base leading-5 font-medium">
            {name}
          </h5>
          {action === "Edit Review" ? (
            <div className="flex gap-1 text-sm text-yellow-400">
              {[...Array(5).keys()].map((key) => (
                <StarIcon key={key} className="w-4 h-4" />
              ))}
            </div>
          ) : (
            <p className="text-xs sm:text-sm text-gray-500">Not Review Yet</p>
          )}
        </div>
      </div>
      <div className="mt-4 flex items-start justify-between md:justify-around md:mt-0 md:grow">
        <div>
          <h5 className="mb-1 font-roboto text-sm sm:text-base leading-5 font-medium">
            Order Number
          </h5>
          <p className="text-xs sm:text-sm">798W4E574</p>
        </div>
        <div>
          <h5 className="mb-1 font-roboto text-sm sm:text-base leading-5 font-medium">
            Purchased
          </h5>
          <p className="text-xs sm:text-sm">16 Dec 2020</p>
        </div>
        <div className="flex items-center">
          <Link
            to="details"
            className="default-btn capitalize px-4 py-2 text-xs sm:text-sm bg-white text-primary hover:bg-primary hover:text-white"
          >
            {action}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MyReviews() {
  return (
    <div className="space-y-6">
      <OrderReviewRow
        name="Xbox One Wireless Controller"
        image="x-box.png"
        action="Write a Review"
      />
      <OrderReviewRow
        name="Herschel Leather Duffle Bag"
        image="bag-2.png"
        action="Edit Review"
      />
      <OrderReviewRow
        name="Sound Intone I65 Earphone"
        image="headphone-3.png"
        action="Edit Review"
      />
    </div>
  );
}
