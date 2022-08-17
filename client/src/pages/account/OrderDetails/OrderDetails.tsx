import { Fragment } from "react";
import classNames from "classnames";
import { Link, useParams } from "react-router-dom";
import { useAppSelector } from "hooks";
import { selectOrderById } from "slices/orders.slice";
import type {
  Order,
  OrderItem,
  ShippingDetails,
  BillingDetails,
} from "services/order.service";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { InfoCard } from "../ProfileSummary/PersonalInfo";

function OrderInfo({ order }: { order: Order }) {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        <h5 className="text-base font-medium text-gray-800 mb-1">Sold By</h5>
        <p className="text-primary text-sm">Elliot</p>
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
          {/* Write a Review */}
          Cancel Order
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

function OrderItemMenu({
  orderId,
  purchasedAt,
  item,
}: {
  orderId: string;
  purchasedAt: string;
  item: OrderItem;
}) {
  return (
    <Menu
      as="div"
      className="relative mt-4 ml-auto flex items-center md:block md:mt-0"
    >
      <Menu.Button className="inline-flex w-fit justify-center rounded-md px-4 py-2 border border-primary bg-white font-roboto capitalize text-sm font-medium text-primary hover:bg-primary hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-opacity-75">
        Actions
        <ChevronDownIcon className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 px-1 py-1 absolute right-0 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <Link
                to={`/account/reviews/details`}
                state={{
                  orderId,
                  purchasedAt,
                  item,
                }}
                className={classNames(
                  { "bg-primary text-white": active },
                  { "text-gray-900": !active },
                  "flex w-full items-center rounded-md px-2 py-2 text-sm"
                )}
              >
                Write Review
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/account/order-return/details"
                className={classNames(
                  { "bg-primary text-white": active },
                  { "text-gray-900": !active },
                  "inline-block text-left w-full rounded-md px-2 py-2 text-sm"
                )}
              >
                Return Item
                <p className="text-xs text-gray-400">Until 24 Sep 2021</p>
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

function OrderItemRow({
  orderId,
  purchasedAt,
  item,
}: {
  orderId: string;
  purchasedAt: string;
  item: OrderItem;
}) {
  return (
    <li className="flex items-start flex-wrap">
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
      {/* <div className="mt-4 ml-auto flex items-center md:block md:mt-0">
        <h5 className="text-primary hover:text-primary/75 transition font-medium uppercase mr-4 md:mr-0 md:mb-1">
          <Link to="/account/order-return/details">Return</Link>
        </h5>
        <p className="text-sm text-gray-800">Until 24 Sep 2021</p>
      </div> */}
      <OrderItemMenu orderId={orderId} purchasedAt={purchasedAt} item={item} />
    </li>
  );
}

function OrderItems({ order }: { order: Order }) {
  return (
    <ul className="mt-14 space-y-8">
      {order.items.map((item) => (
        // NOTE: prop drilling here...
        <OrderItemRow
          key={item.productId}
          orderId={order._id}
          purchasedAt={order.createdAt}
          item={item}
        />
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
        <OrderItems order={order} />
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
