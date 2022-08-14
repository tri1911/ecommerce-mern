import { useAppSelector } from "hooks";
import { Link, useParams } from "react-router-dom";
import { selectOrderById } from "slices/orders.slice";
import {
  Order,
  OrderItem,
  ShippingDetails,
  BillingDetails,
} from "services/order.service";
import { InfoCard } from "../ProfileSummary/PersonalInfo";
import classNames from "classnames";

function OrderInfo({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        <h5 className="text-base font-medium text-gray-800 mb-1">Sold By</h5>
        <p className="text-primary text-sm">Apple</p>
      </div>
      <div>
        <h5 className="text-base font-medium text-gray-800 mb-1">
          Order Number
        </h5>
        <p className="text-sm text-gray-700">
          {order._id.slice(0, 10).toUpperCase()}
        </p>
      </div>
      <div>
        <h5 className="text-base font-medium text-gray-800 mb-1">
          Shipped Date
        </h5>
        <p className="text-sm text-gray-700">{order.createdAt.split("T")[0]}</p>
      </div>
      <div className="mt-4 w-full md:mt-0 md:w-fit">
        <Link
          to="/account/reviews/details"
          className="default-btn inline-block w-fit py-2 px-4 font-roboto text-base tracking-wide capitalize text-primary bg-white hover:text-white hover:bg-primary"
        >
          Write a Review
        </Link>
      </div>
    </div>
  );
}

const ORDER_STATUS = ["processing", "shipped", "delivered"] as const;

function OrderTimeline({ order: { status } }: { order: Order }) {
  const position = ORDER_STATUS.findIndex((value) => value === status);
  return (
    <div className="mt-16">
      <div className="relative max-w-2xl flex items-center justify-between">
        {/* progress bar */}
        <div className="absolute h-[2px] left-9 top-2 right-9">
          <span className="absolute left-0 top-0 h-[2px] w-full bg-slate-400" />
          <span
            className={classNames(
              "absolute left-0 top-0 h-[2px] bg-green-500",
              {
                "w-0": status === "processing",
                "w-1/2": status === "shipped",
                "w-full": status === "delivered",
              }
            )}
          />
        </div>
        {/* milestones */}
        {ORDER_STATUS.map((value, index) => (
          <div key={value} className="relative flex flex-col items-center">
            <div
              className={classNames("w-4 h-4 rounded-full", {
                "bg-slate-400": index > position,
                "bg-green-500 ": index <= position,
              })}
            />
            <p className="mt-1 text-base capitalize">{value}</p>
          </div>
        ))}
      </div>
      {/* message */}
      {/* TODO: update appropriate message based on the status */}
      <div className="relative max-w-2xl flex flex-col items-start justify-between border border-gray-200 py-3 px-6 mt-7 bg-white shadow text-sm text-gray-800">
        <p className="mb-2">23 Jul 2021 at 18:56</p>
        <p>
          Your package has been delivered. Thank you for shopping at Elliot
          Store!
        </p>
        <div className="absolute -top-3 right-9 translate-x-1/2 w-6 h-6 border-t border-l border-gray-200 rotate-45 bg-inherit" />
      </div>
    </div>
  );
}

function OrderItemRow({ item }: { item: OrderItem }) {
  return (
    <li className="flex items-center flex-wrap">
      <div className="w-16 h-16 overflow-hidden">
        <img
          // src="/images/products/headphone-3.png"
          src={item.image}
          alt="item thumbnail"
          className="w-full h-full object-cover rounded"
        />
      </div>
      <div className="w-[calc(100%-64px)] pl-4 md:w-56">
        <h5 className="text-base font-medium mb-1">{item.name}</h5>
        <p className="text-sm">No Warranty Available</p>
      </div>
      <div className="mt-4 ml-0 md:mt-0 md:ml-auto">
        <h5 className="text-base font-medium">${item.unitAmount}</h5>
      </div>
      <div className="mt-4 ml-auto md:mt-0">
        <h5 className="text-base font-medium">Qty: {item.quantity}</h5>
      </div>
      <div className="mt-4 ml-auto flex items-center md:block md:mt-0">
        <h5 className="text-primary hover:text-primary/75 transition font-medium uppercase mr-4 md:mr-0 md:mb-1">
          <Link to="/account/order-return/details">Return</Link>
        </h5>
        <p className="text-sm text-gray-800">Until 24 Sep 2021</p>
      </div>
    </li>
  );
}

function OrderItems({ items }: { items: OrderItem[] }) {
  return (
    <ul className="mt-14 space-y-8">
      {items.map((item) => (
        <OrderItemRow key={item.productId} item={item} />
      ))}
    </ul>
  );
}

function ShippingDetailsCard({
  shippingDetails: { name, address, city, province, postalCode },
}: {
  shippingDetails: ShippingDetails;
}) {
  return (
    <InfoCard title="Shipping Address">
      <h4 className="text-gray-700 font-medium">{name}</h4>
      <p className="text-gray-800">{address}</p>
      <p className="text-gray-800">
        {city}, {province}, {postalCode}
      </p>
      <p className="text-gray-800">(123) 456-789</p>
    </InfoCard>
  );
}

function BillingDetailsCard({
  billingDetails: { name, address, city, province, postalCode },
}: {
  billingDetails: BillingDetails;
}) {
  return (
    <InfoCard title="Billing Address">
      <h4 className="text-gray-700 font-medium">{name}</h4>
      <p className="text-gray-800">{address}</p>
      <p className="text-gray-800">
        {city}, {province}, {postalCode}
      </p>
      <p className="text-gray-800">(123) 456-789</p>
    </InfoCard>
  );
}

function TotalSummaryCard({
  order: {
    amountSubTotal,
    amountTotal,
    paymentMethod: { brand, last4 },
  },
}: {
  order: Order;
}) {
  return (
    <InfoCard title="Total Summary">
      <div className="flex items-center justify-between">
        <p>Subtotal</p>
        <p className="font-medium text-gray-800">${amountSubTotal}</p>
      </div>
      <div className="flex items-center justify-between border-b border-gray-300 pb-2">
        <p>Shipping Fee</p>
        <p className="font-medium text-gray-800">$30</p>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium text-gray-800">Total</p>
        <p className="font-medium text-gray-800">${amountTotal}</p>
      </div>
      <div className="pt-2">
        <p className="text-sm">
          Paid by <span className="capitalize">{brand} </span>
          Card ending in {last4}
        </p>
      </div>
    </InfoCard>
  );
}

export default function OrderDetails() {
  const { orderId } = useParams();
  const order = useAppSelector((state) => selectOrderById(state, orderId!));

  if (!order) {
    return null;
  }

  return (
    <div className="space-y-10">
      <div className="shadow rounded px-6 pt-5 pb-7">
        <h4 className="text-lg leading-6 font-medium mb-6">Order Details</h4>
        <OrderInfo order={order} />
        <OrderTimeline order={order} />
        <OrderItems items={order.items} />
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <ShippingDetailsCard shippingDetails={order.shippingDetails} />
        <BillingDetailsCard
          billingDetails={order.paymentMethod.billingDetails}
        />
        <TotalSummaryCard order={order} />
      </div>
    </div>
  );
}
