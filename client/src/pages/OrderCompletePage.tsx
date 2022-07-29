import React from "react";
import { Link } from "react-router-dom";
// import Breadcrumbs from "../components/Shared/Breadcrumbs";

export default function OrderCompletePage() {
  return (
    <div>
      {/* <Breadcrumbs crumbs={["Order Complete"]} /> */}
      <div className="container pt-16 pb-24 text-center">
        <div className="mb-8">
          <img
            src="/images/complete.png"
            alt="order complete"
            className="w-16 inline-block"
          />
        </div>
        <h2 className="text-gray-800 font-medium text-3xl uppercase mb-3">
          Your order is completed!
        </h2>
        <p className="text-gray-600">
          Thank you for your order! Your order is being processed and will be
          completed within 3-6 hours. You will receive an email confirmation
          when your order is completed.
        </p>
        <div className="mt-10">
          <Link to="/" className="default-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
