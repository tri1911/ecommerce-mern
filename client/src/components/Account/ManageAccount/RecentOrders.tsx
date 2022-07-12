import classNames from "classnames";
import { Link } from "react-router-dom";

function OrderThumbnail() {
  return (
    <img
      src="/images/products/product1.jpg"
      alt=""
      className="w-20 h-14 lg:w-16 lg:h-14 object-cover mr-4"
    />
  );
}

function OrderInfoItem({ title, info }: { title: string; info: string }) {
  return (
    <>
      <h4 className="mb-1 text-base text-gray-800 font-medium capitalize">
        {title}
      </h4>
      <p className="text-gray-500">{info}</p>
    </>
  );
}

type OrderStatus = "in progress" | "delivered" | "canceled";

function OrderStatusItem({ status = "in progress" }: { status?: OrderStatus }) {
  return (
    <>
      <h4 className="mb-1 text-base text-gray-800 font-medium capitalize hidden md:block">
        Status
      </h4>
      <h5 className="mb-1 text-base font-medium md:hidden">
        <span className="mr-2 inline-block font-normal text-xs">x3</span>
        $120
      </h5>
      <p
        className={classNames(
          "font-roboto capitalize",
          { "text-yellow-600": status === "in progress" },
          { "text-green-600": status === "delivered" },
          { "text-red-600": status === "canceled" }
        )}
      >
        {status}
      </p>
    </>
  );
}

function ViewOrderBtn() {
  return (
    <Link
      to="/account/order/details"
      className="default-btn w-fit text-sm px-4 py-2 bg-white text-primary hover:bg-primary hover:text-white"
    >
      View Order
    </Link>
  );
}

export function OrderSummaryCard() {
  return (
    <li className="__wrapper grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-6 p-5 border border-gray-200 rounded">
      <div className="__images col-span-2 md:col-span-4 flex items-center justify-start">
        <OrderThumbnail />
        <OrderThumbnail />
      </div>
      <div className="__view-order-btn row-start-3 col-start-2 md:row-start-1 md:col-start-5 self-center">
        <ViewOrderBtn />
      </div>
      <div>
        <OrderInfoItem title="Order Number" info="23E34RT3" />
      </div>
      <div>
        <OrderInfoItem title="Purchased" info="01 March 2021" />
      </div>
      <div className="hidden md:block">
        <OrderInfoItem title="Quantity" info="x3" />
      </div>
      <div className="hidden md:block">
        <OrderInfoItem title="Total" info="$120" />
      </div>
      <div>
        <OrderStatusItem status="delivered" />
      </div>
    </li>
  );
}

export default function RecentOrders() {
  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <h3 className="font-medium capitalize text-gray-800 text-lg">
        Recent Orders
      </h3>
      <ul className="mt-6 space-y-6">
        <OrderSummaryCard />
        <OrderSummaryCard />
      </ul>
    </div>
  );
}