import { Link } from "react-router-dom";
import { InfoCard } from "./ManageAccount/AccountInfo";

export default function OrderDetails() {
  return (
    <div className="space-y-10">
      <div className="shadow rounded px-6 pt-5 pb-7">
        <h4 className="text-lg leading-6 font-medium mb-6">Order Details</h4>
        <div className="flex items-center justify-between flex-wrap">
          <div>
            <h5 className="text-base font-medium text-gray-800 mb-1">
              Sold By
            </h5>
            <p className="text-primary text-sm">Apple</p>
          </div>
          <div>
            <h5 className="text-base font-medium text-gray-800 mb-1">
              Order By
            </h5>
            <p className="text-sm text-gray-700">789ER4S324</p>
          </div>
          <div>
            <h5 className="text-base font-medium text-gray-800 mb-1">
              Shipped Date
            </h5>
            <p className="text-sm text-gray-700">01 March 2021</p>
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
        <div className="__shipping-process mt-16">
          <div className="relative max-w-2xl flex items-center justify-between">
            <div className="absolute h-[2px] left-9 top-2 right-9">
              <span className="absolute left-0 top-0 h-[2px] w-full bg-green-500" />
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <p className="mt-1 text-base">Processing</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <p className="mt-1 text-base">Shipped</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-4 h-4 bg-green-500 rounded-full" />
              <p className="mt-1 text-base">Delivered</p>
            </div>
          </div>
          <div className="relative max-w-2xl flex flex-col items-start justify-between border border-gray-200 py-3 px-6 mt-7 bg-white shadow text-sm text-gray-800">
            <p className="mb-2">23 Jul 2021.18.56</p>
            <p>
              Your package has been delivered. Thank you for shopping at Elliot
              Store!
            </p>
            <div className="absolute -top-3 right-9 translate-x-1/2 w-6 h-6 border-t border-l border-gray-200 rotate-45 bg-inherit" />
          </div>
          <div className="mt-16 flex items-center flex-wrap">
            <div className="w-16 h-16 overflow-hidden">
              <img
                src="/images/products/headphone-3.png"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-[calc(100%-64px)] pl-4 md:w-56">
              <h5 className="text-base font-medium mb-1">
                Sound Intone I65 Earphone
              </h5>
              <p className="text-sm">No Warranty Available</p>
            </div>
            <div className="mt-4 ml-0 md:mt-0 md:ml-auto">
              <h5 className="text-base font-medium">$50</h5>
            </div>
            <div className="mt-4 ml-auto md:mt-0">
              <h5 className="text-base font-medium">Qty: 1</h5>
            </div>
            <div className="mt-4 ml-auto flex items-center md:block md:mt-0">
              <h5 className="text-primary hover:text-primary/75 transition font-medium uppercase mr-4 md:mr-0 md:mb-1">
                <Link to="/account/order-return/details">Return</Link>
              </h5>
              <p className="text-sm text-gray-800">Until 24 Sep 2021</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <InfoCard title="Shipping Address">
          <h4 className="text-gray-700 font-medium">Elliot Ho</h4>
          <p className="text-gray-800">5572 Wales Street</p>
          <p className="text-gray-800">Vancouver, BC, Canada</p>
          <p className="text-gray-800">(123) 456-789</p>
        </InfoCard>
        <InfoCard title="Billing Address">
          <h4 className="text-gray-700 font-medium">Elliot Ho</h4>
          <p className="text-gray-800">5572 Wales Street</p>
          <p className="text-gray-800">Vancouver, BC, Canada</p>
          <p className="text-gray-800">(123) 456-789</p>
        </InfoCard>
        <InfoCard title="Total Summary">
          <div className="flex items-center justify-between">
            <p>Subtotal</p>
            <p className="font-medium text-gray-800">$50</p>
          </div>
          <div className="flex items-center justify-between border-b border-gray-300 pb-2">
            <p>Shipping Fee</p>
            <p className="font-medium text-gray-800">$30</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800">Total</p>
            <p className="font-medium text-gray-800">$80</p>
          </div>
          <div>
            <p>Paid by Cash on Delivery</p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
}
