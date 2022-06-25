import React from "react";
import { Link } from "react-router-dom";

function OrderItem() {
  return (
    <div className="flex justify-between">
      <div>
        <h5 className="text-gray-800 font-medium">Italian Shape Sofa</h5>
        <p className="text-sm text-gray-600">Size: M</p>
      </div>
      <p className="text-gray-600">x3</p>
      <p className="text-gray-800 font-medium">$320.00</p>
    </div>
  );
}

export default function OrderSummary() {
  return (
    <>
      <h4 className="text-gray-800 text-lg mb-4 pb-2 font-medium uppercase border-b border-gray-200">
        Order Summary
      </h4>
      <div className="space-y-2">
        <OrderItem />
        <OrderItem />
      </div>
      <div className="flex justify-between border-b border-gray-200 mt-1 text-gray-800 font-medium uppercase">
        <h4 className="my-3">Subtotal</h4>
        <h4 className="my-3">$320.00</h4>
      </div>
      <div className="flex justify-between border-b border-gray-200 text-gray-800 font-medium uppercase">
        <h4 className="my-3">Shipping</h4>
        <h4 className="my-3">Free</h4>
      </div>
      <div className="flex justify-between text-gray-800 font-semibold uppercase">
        <h4 className="my-3">Total</h4>
        <h4 className="my-3">$320.00</h4>
      </div>
      <div className="flex items-center mb-4 mt-2">
        <input
          type="checkbox"
          id="agreement"
          className="text-primary focus:ring-0 rounded-sm cursor-pointer w-3 h-3"
        />
        <label
          htmlFor="agreement"
          className="text-gray-600 ml-3 cursor-pointer text-sm"
        >
          Agree to our &nbsp;
          <Link to="#" className="text-primary">
            terms &amp; conditions
          </Link>
        </label>
      </div>
      <Link to="/order-complete" className="block default-btn">
        Place Order
      </Link>
    </>
  );
}
