import classNames from "classnames";
import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { StarIcon } from "@heroicons/react/solid";
import { useState } from "react";
import { Popover } from "@headlessui/react";

function RatingSection({ title }: { title: string }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const ratings = [
    "Rate it",
    "terrible",
    "bad",
    "average",
    "great",
    "excellent",
  ];

  return (
    <div className="space-y-2">
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
          {ratings[hover || rating]}
        </p>
      </div>
    </div>
  );
}

export default function ReviewDetails() {
  return (
    <div className="px-6 py-7 rounded shadow-md">
      <h4 className="mb-4 text-lg leading-5 font-medium text-gray-800">
        Write Review
      </h4>
      <div className="space-y-5 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-y-7 sm:gap-x-12">
        <div className="flex">
          <div className="w-16 h-full overflow-hidden">
            <img
              src="/images/products/headphone-3.png"
              alt="product thumbnail"
              className="w-full object-contain"
            />
          </div>
          <div className="pl-4 space-y-1">
            <h5 className="mb-1 text-base font-medium leading-5 text-gray-700">
              Sound Intone I65 Earphone
            </h5>
            <p className="text-xs text-gray-600">Purchased on 16 Dec 2022</p>
            <p className="font-roboto text-sm text-gray-800">
              No Warranty Available
            </p>
          </div>
        </div>
        <RatingSection title="Rate and review your product" />
        <RatingSection title="Rate and review your seller" />
        <RatingSection title="Rate Delivery" />
        <div>
          <h4 className="mb-2 text-base font-medium leading-5 text-gray-900">
            Review details
          </h4>
          <textarea
            className="w-full min-h-[80px] px-4 py-2 font-roboto text-sm leading-5 text-gray-800 placeholder:text-gray-400 border border-gray-200 rounded focus:outline-none focus:ring-primary focus:ring-opacity-25"
            placeholder="Please share your feedback about the product: Was the product as described? What is the quality like?"
          />
        </div>
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
        <div className="">
          <button type="button" className="default-btn w-fit px-4 py-2">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

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
