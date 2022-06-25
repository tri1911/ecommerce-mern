import React from "react";
import { Link } from "react-router-dom";

function CartTotal() {
  return (
    <>
      <div className="space-y-1 text-gray-600 pb-3 border-b border-gray-200">
        <div className="flex justify-between font-medium">
          <p>Subtotal</p>
          <p>$320</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between">
          <p>Tax</p>
          <p>Free</p>
        </div>
      </div>
      <div className="flex justify-between my-3 text-gray-800 font-semibold uppercase">
        <h4>Total</h4>
        <h4>$320</h4>
      </div>
    </>
  );
}

function Coupon() {
  return (
    <div className="flex mb-5">
      <input
        type="text"
        className="pl-4 w-full border border-r-0 border-primary py-2 px-3 rounded-l-md focus:ring-primary focus:border-primary text-sm"
        placeholder="Coupon Code"
      />
      <button
        type="submit"
        className="px-5 border border-primary rounded-r-md bg-primary text-sm font-medium font-roboto text-white hover:bg-transparent hover:text-primary transition"
      >
        Apply
      </button>
    </div>
  );
}

function CheckoutBtn() {
  return (
    <Link
      to="/checkout"
      className="bg-primary border border-primary text-white px-4 py-3 font-medium rounded-md uppercase hover:bg-transparent hover:text-primary transition text-sm w-full block text-center"
    >
      Process to checkout
    </Link>
  );
}

export default function CartSummary() {
  return (
    <section className="xl:col-span-3 lg:col-span-4 border border-gray-200 px-4 py-4 rounded mt-6 lg:mt-0">
      <h4 className="mb-4 text-lg font-semibold text-gray-800 uppercase">
        Order Summary
      </h4>
      <CartTotal />
      <Coupon />
      <CheckoutBtn />
    </section>
  );
}
