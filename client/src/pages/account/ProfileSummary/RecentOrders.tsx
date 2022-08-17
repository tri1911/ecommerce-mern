import classNames from "classnames";
import { useAppSelector } from "hooks";
import { Link } from "react-router-dom";
import { Order } from "services/order.service";
import { selectAllOrders } from "slices/orders.slice";

function OrderThumbnail({ image }: { image: string }) {
  return (
    <img
      // src="/images/products/product1.jpg"
      src={image}
      alt="order thumbnail"
      className="w-20 h-14 lg:w-16 lg:h-14 object-cover mr-4 rounded"
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

type OrderStatus = "processing" | "shipped" | "delivered" | "cancelled";

function OrderStatusInfo({ status = "processing" }: { status?: OrderStatus }) {
  return (
    <>
      <h4 className="mb-1 text-base text-gray-800 font-medium capitalize hidden md:block">
        Status
      </h4>
      {/* on small screen devices */}
      <h5 className="mb-1 text-base font-medium md:hidden">
        <span className="mr-2 inline-block font-normal text-xs">x3</span>
        $120
      </h5>
      <p
        className={classNames(
          "font-roboto capitalize",
          { "text-yellow-600": status === "processing" },
          { "text-sky-600": status === "shipped" },
          { "text-green-600": status === "delivered" },
          { "text-red-600": status === "cancelled" }
        )}
      >
        {status}
      </p>
    </>
  );
}

function ViewOrderBtn({ orderId }: { orderId: string }) {
  return (
    <Link
      to={`/account/orders/${orderId}`}
      className="default-btn w-fit text-sm px-4 py-2 bg-white text-primary hover:bg-primary hover:text-white"
    >
      View Order
    </Link>
  );
}

export function OrderSummaryCard({ order }: { order: Order }) {
  return (
    <li className="grid grid-cols-2 md:grid-cols-5 gap-y-4 md:gap-y-6 p-5 border border-gray-200 rounded">
      {/* Thumbnails */}
      <div className="col-span-2 md:col-span-4 flex items-center justify-start">
        {order.items.map((item) => (
          <OrderThumbnail key={item.productId} image={item.image} />
        ))}
      </div>
      {/* View Order Button */}
      <div className="row-start-3 col-start-2 md:row-start-1 md:col-start-5 self-center">
        <ViewOrderBtn orderId={order._id} />
      </div>
      {/* Order Summary Infos */}
      <div>
        <OrderInfoItem
          title="Order Number"
          info={order._id.slice(0, 10).toUpperCase()}
        />
      </div>
      <div>
        <OrderInfoItem title="Purchased" info={order.createdAt.split("T")[0]} />
      </div>
      <div className="hidden md:block">
        <OrderInfoItem title="Quantity" info={`x${order.items.length}`} />
      </div>
      <div className="hidden md:block">
        <OrderInfoItem title="Total" info={`$${order.amountTotal}`} />
      </div>
      <div>
        <OrderStatusInfo status={order.status as OrderStatus} />
      </div>
    </li>
  );
}

export default function RecentOrders() {
  const orders = useAppSelector(selectAllOrders);

  return (
    <div className="shadow rounded bg-white px-4 pt-6 pb-8">
      <h3 className="font-medium capitalize text-gray-800 text-lg">
        Recent Orders
      </h3>
      <ul className="mt-6 space-y-6">
        {orders.map((order) => (
          <OrderSummaryCard key={order._id} order={order} />
        ))}
      </ul>
    </div>
  );
}
