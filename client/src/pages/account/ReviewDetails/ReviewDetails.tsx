import { useState } from "react";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import { format } from "date-fns";
import { Popover } from "@headlessui/react";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { type OrderItem } from "services/order.service";
import type { Fn } from "types";
import useReview from "hooks/useReview";

function ItemSummary({
  image,
  name,
  purchasedAt,
}: {
  image?: string;
  name?: string;
  purchasedAt?: string;
}) {
  return (
    <div className="flex">
      <div className="w-16 h-full overflow-hidden">
        <img
          src={image ?? "/images/products/headphone-3.png"}
          alt="product thumbnail"
          className="w-full object-contain rounded-md"
        />
      </div>
      <div className="pl-4 space-y-1">
        <h5 className="mb-1 text-base font-medium leading-5 text-gray-700">
          {name ?? "Sound Intone I65 Earphone"}
        </h5>
        <p className="text-xs text-gray-600">
          Purchased on{" "}
          {purchasedAt
            ? format(new Date(purchasedAt), "MMM dd, yyyy")
            : "16 Dec 2022"}
        </p>
        <p className="font-roboto text-sm text-gray-800">
          No Warranty Available
        </p>
      </div>
    </div>
  );
}

/**
 * Ratings
 */

const ratingTexts = [
  "Rate it",
  "terrible",
  "bad",
  "average",
  "great",
  "excellent",
];

function InteractiveRating({
  title,
  rating,
  setRating,
}: {
  title: string;
  rating: number;
  setRating: Fn<[number], void>;
}) {
  const [hover, setHover] = useState(0);

  return (
    <section className="space-y-2">
      <h4 className="text-base font-medium leading-5 text-gray-900">{title}</h4>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5).keys()].map((key) => (
            <StarIcon
              className={classNames(
                "w-5 h-5 cursor-pointer transition",
                key + 1 <= (hover || rating)
                  ? "text-yellow-400"
                  : "text-gray-200"
              )}
              key={key}
              onClick={() => setRating(key + 1)}
              onMouseEnter={() => setHover(key + 1)}
              onMouseLeave={() => setHover(rating)}
            />
          ))}
        </div>
        <p className="text-sm leading-6 font-medium capitalize">
          {ratingTexts[hover || rating]}
        </p>
      </div>
    </section>
  );
}

function ReviewDescription({
  description,
  onDescriptionChanged,
}: {
  description: string;
  onDescriptionChanged?: React.ChangeEventHandler<HTMLTextAreaElement>;
}) {
  return (
    <section>
      <h4 className="mb-2 text-base font-medium leading-5 text-gray-900">
        Review details
      </h4>
      <textarea
        className="w-full min-h-[80px] px-4 py-2 font-roboto text-sm leading-5 text-gray-800 placeholder:text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:ring-opacity-25"
        placeholder="Please share your feedback about the product: Was the product as described? What is the quality like?"
        value={description}
        onChange={onDescriptionChanged}
      />
    </section>
  );
}

/**
 * Image Upload
 */

function Tooltip() {
  return (
    <Popover className="relative">
      <Popover.Button className="focus:outline-none">
        <ExclamationCircleIcon className="w-4 h-4" />
      </Popover.Button>
      <Popover.Panel className="absolute z-10 -ml-32">
        <div className="bg-gray-50 shadow px-2 py-3">
          <h4 className="mb-2 text-sm font-medium">Important:</h4>
          <ul className="list-disc ml-4 w-64 text-xs">
            <li>Maximum 6 images can be uploaded</li>
            <li>Image size can be maximum 5mb</li>
            <li>It takes upto 24 hours for the image to be reviewed</li>
            <li>
              Please ensure you meet the Community Guidelines before uploading
              your review
            </li>
          </ul>
        </div>
      </Popover.Panel>
    </Popover>
  );
}

function ImagesUpload() {
  return (
    <div className="flex sm:pt-7">
      <div className="__img-upload">
        <input type="file" id="img-upload" className="hidden" />
        <label
          htmlFor="img-upload"
          className="block text-center p-3 rounded border border-dashed border-primary cursor-pointer"
        >
          <div className="__upload-icon mb-2">
            <img
              src="/images/upload-img.png"
              alt=""
              className="inline-block w-8"
            />
          </div>
          <p className="font-roboto text-xs text-gray-500">Upload photo</p>
        </label>
      </div>
      <div className="ml-4">
        <Tooltip />
      </div>
    </div>
  );
}

/**
 * Main
 */

interface LocationState {
  orderId: string;
  purchasedAt: string;
  item: OrderItem;
}

export default function ReviewDetails() {
  // retrieve url state
  const location = useLocation();
  let state: LocationState | null = null;
  if (location.state) {
    state = location.state as LocationState;
  }

  const {
    productRating,
    setProductRating,
    sellerRating,
    setSellerRating,
    deliveryRating,
    setDeliveryRating,
    description,
    handleDescriptionChanged,
    canSubmit,
    handleCreateReview,
    status,
  } = useReview();

  return (
    <div className="px-6 py-7 rounded shadow-md">
      <h4 className="mb-4 text-lg leading-5 font-medium text-gray-800">
        Write Review
      </h4>
      <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-y-7 sm:gap-x-12">
        <ItemSummary
          image={state?.item.image}
          name={state?.item.name}
          purchasedAt={state?.purchasedAt}
        />
        <InteractiveRating
          title="Rate and review your product"
          rating={productRating}
          setRating={setProductRating}
        />
        <InteractiveRating
          title="Rate and review your seller"
          rating={sellerRating}
          setRating={setSellerRating}
        />
        <InteractiveRating
          title="Rate Delivery"
          rating={deliveryRating}
          setRating={setDeliveryRating}
        />
        <ReviewDescription
          description={description}
          onDescriptionChanged={handleDescriptionChanged}
        />
        <ImagesUpload />
        <div>
          <button
            type="button"
            className="default-btn w-fit px-4 py-2 disabled:cursor-not-allowed disabled:bg-primary/80 disabled:text-white"
            disabled={!state || !canSubmit}
            onClick={
              state
                ? handleCreateReview({
                    order: state.orderId,
                    purchasedAt: state.purchasedAt,
                    product: state.item.productId,
                    rating: (productRating + sellerRating + deliveryRating) / 3,
                    desc: description,
                  })
                : undefined
            }
          >
            {status === "loading" ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
