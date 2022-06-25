import React from "react";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import Breadcrumbs from "../components/Shared/Breadcrumbs";

export default function CheckoutPage() {
  return (
    <div>
      <Breadcrumbs paths={["Check Out"]} />
      <div className="container lg:grid lg:grid-cols-12 gap-6 items-start pb-16 pt-4">
        <section className="lg:col-span-8 border border-gray-200 shadow p-4 rounded">
          <CheckoutForm />
        </section>
        <section className="lg:col-span-4 border border-gray-200 shadow p-4 rounded mt-6 lg:mt-0">
          <OrderSummary />
        </section>
      </div>
    </div>
  );
}
