import { Fragment } from "react";
import classNames from "classnames";
import { Form, Formik } from "formik";
import { Tab } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/solid";
import { noop } from "types";
import TextInput from "components/Form/TextInput";
import Breadcrumbs from "components/Shared/Breadcrumbs";

function MethodTabButton({ name, image }: { name: string; image: string }) {
  return (
    <Tab as={Fragment}>
      {({ selected }) => (
        <div
          className={classNames(
            "relative w-full max-w-[148px] border border-gray-200 rounded-md text-center space-y-2 p-3 md:p-5",
            "focus:outline-none",
            { "border-primary": selected }
          )}
        >
          <div
            className={classNames(
              "absolute -right-2 -top-2 bg-primary rounded-full text-white",
              selected ? "block" : "hidden"
            )}
          >
            <CheckIcon className="w-5 h-5 p-1" />
          </div>
          <div className="h-10">
            <img
              src={`/images/payments/${image}.png`}
              alt="credit card"
              className="mx-auto h-full object-contain"
            />
          </div>
          <p className="text-xs font-medium text-gray-800">{name}</p>
        </div>
      )}
    </Tab>
  );
}

function SingleItem() {
  return (
    <div className="flex justify-between">
      <div className="text-sm text-gray-800">
        <h5 className="font-medium">Beigh Knitted Shoes</h5>
        <p className="mt-1">Size: M</p>
      </div>
      <p className="text-sm font-medium text-gray-800">x1</p>
      <p className="text-sm font-medium text-gray-800">$84.00</p>
    </div>
  );
}

function Paypal() {
  return (
    <>
      <header className="mb-2 flex items-center justify-between">
        <h4 className="text-gray-800 font-medium">Paypal</h4>
        <div className="flex space-x-1">
          <img src="/images/payments/paypal.png" alt="" className="" />
        </div>
      </header>
      <main className="w-full flex flex-col items-center py-5">
        <div>
          <p>Payment using your paypal</p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="default-btn font-roboto w-fit px-6 py-2"
          >
            Pay Now
          </button>
        </div>
      </main>
    </>
  );
}

function CashOn() {
  return (
    <>
      <header className="mb-2 flex items-center justify-between">
        <h4 className="text-gray-800 font-medium">Cash On delivery</h4>
        <div className="flex space-x-1">
          <img src="/images/payments/cash-on.png" alt="" className="" />
        </div>
      </header>
      <main className="w-full max-w-md flex flex-col items-center mx-auto py-6">
        <div>
          <p className="text-center">
            You can pay in cash to our courier when you receive the goods at
            your doorstep.
          </p>
        </div>
        <div className="mt-5">
          <button
            type="button"
            className="default-btn font-roboto w-fit px-6 py-2"
          >
            Confirm Order
          </button>
        </div>
      </main>
    </>
  );
}

function CreditCard() {
  return (
    <>
      <header className="mb-2 flex items-center justify-between">
        <h4 className="text-gray-800 font-medium">Credit Card</h4>
        <div className="flex space-x-1">
          <img src="/images/payments/payment-visa.png" alt="" className="" />
          <img src="/images/payments/payment-express.png" alt="" className="" />
          <img src="/images/payments/payment-master.png" alt="" className="" />
        </div>
      </header>
      <main className="">
        <Formik initialValues={{}} onSubmit={noop}>
          <Form>
            <div className="space-y-4">
              <TextInput name="number" label="Card Number" required />
              <TextInput name="name" label="Name on Card" required />
              <div className="lg:w-full lg:grid lg:grid-cols-2 lg:gap-4">
                <TextInput name="expiration" label="Expiration Date" required />
                <TextInput name="cvv" label="CVV" required />
              </div>
            </div>
            <div className="mt-5 lg:mt-8">
              <button
                type="button"
                className="default-btn font-roboto w-fit px-6 py-2"
              >
                Pay Now
              </button>
            </div>
          </Form>
        </Formik>
      </main>
    </>
  );
}

export default function PaymentPage() {
  return (
    <div>
      <Breadcrumbs
        crumbs={[
          { label: "Cart", href: "/cart" },
          { label: "Checkout", href: "/checkout" },
          { label: "Payment" },
        ]}
      />
      <div className="container pb-16 pt-4 lg:grid lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-8">
          <h4 className="px-4 py-2 bg-gray-200 text-base font-medium">
            Select Payment Method
          </h4>
          <div className="mt-10">
            <Tab.Group>
              <Tab.List className="w-full flex space-x-3">
                <MethodTabButton name="Credit Card" image="credit-card" />
                <MethodTabButton name="Paypal" image="paypal" />
                <MethodTabButton name="Cash on Delivery" image="cash-on" />
              </Tab.List>
              <Tab.Panels>
                <Tab.Panel className="mt-7 w-full bg-white shadow-md rounded py-6 px-3 lg:px-6">
                  <CreditCard />
                </Tab.Panel>
                <Tab.Panel className="mt-7 w-full bg-white shadow-md rounded py-6 px-3 lg:px-6">
                  <Paypal />
                </Tab.Panel>
                <Tab.Panel className="mt-7 w-full bg-white shadow-md rounded py-6 px-3 lg:px-6">
                  <CashOn />
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>
        </div>
        <div className="mt-5 lg:col-span-4 lg:mt-0">
          <h4 className="px-4 py-2 bg-gray-200 font-medium">Your Order</h4>
          <div className="mt-10 w-full border border-gray-200 py-4 px-5 rounded">
            <h4 className="uppercase text-lg text-gray-800 font-medium border-b border-gray-200 pb-2">
              Order Summary
            </h4>
            <div className="pt-4 space-y-4 divide-y divide-gray-200">
              <div className="space-y-3">
                <SingleItem />
                <SingleItem />
                <SingleItem />
              </div>
              <div className="flex justify-between font-medium text-gray-800 uppercase pt-4">
                <h5 className="">Subtotal</h5>
                <p className="">$140.00</p>
              </div>
              <div className="flex justify-between font-medium text-gray-800 uppercase pt-4">
                <h5 className="">Shipping</h5>
                <p className="">Free</p>
              </div>
              <div className="flex justify-between text-lg font-medium text-gray-800 uppercase pt-4">
                <h4 className="">Total</h4>
                <p className="">$140.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
