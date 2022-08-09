import classNames from "classnames";
import { Link } from "react-router-dom";

// NOTE: similar to Rows in MyReviews page
function SingleReturnRow({
  name,
  image,
  price,
  status,
}: {
  name: string;
  image: string;
  price: number;
  status: "successful" | "processing";
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
          <p className="text-sm font-medium text-gray-800">${price}</p>
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
            Return status
          </h5>
          <p
            className={classNames(
              "text-xs sm:text-sm capitalize",
              status === "successful" ? "text-green-500" : "text-yellow-500"
            )}
          >
            {status}
          </p>
        </div>
        <div className="flex items-center">
          <Link
            to="details"
            className="default-btn capitalize px-4 py-2 text-xs sm:text-sm bg-white text-primary hover:bg-primary hover:text-white"
          >
            View Order
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderReturns() {
  return (
    <div>
      <div className="space-y-6">
        <SingleReturnRow
          name="Xbox One Wireless Controller"
          image="x-box.png"
          price={55}
          status="successful"
        />
        <SingleReturnRow
          name="Herschel Leather Duffle Bag"
          image="bag-2.png"
          price={200}
          status="successful"
        />
        <SingleReturnRow
          name="Sound Intone I65 Earphone"
          image="headphone-3.png"
          price={59}
          status="processing"
        />
      </div>
    </div>
  );
}
