import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";
// import Breadcrumbs from "../components/Shared/Breadcrumbs";

function SingleQA({ question }: { question: string }) {
  return (
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={classNames(
              "w-full flex items-center justify-between px-4 py-2 font-roboto focus:outline-none focus-visible:ring focus-visible:ring-primary focus-visible:ring-opacity-75",
              {
                "text-primary": open,
              }
            )}
          >
            <span>{question}</span>
            <ChevronUpIcon
              className={classNames("w-5 h-5", {
                "rotate-180": open,
              })}
            />
          </Disclosure.Button>
          <Transition
            enter="transition duration-300 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition duration-100 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam
              saepe minima quod perspiciatis labore adipisci explicabo, tenetur
              iste neque totam.
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
}

function FQASection({ title }: { title: string }) {
  return (
    <section className="max-w-2xl">
      <h2 className="mb-4 text-2xl capitalize font-medium">{title}</h2>
      <div className="border border-gray-200 rounded-md divide-y divide-gray-200">
        <SingleQA question="How will my parcel be delivered?" />
        <SingleQA question="Do I pay for delivery?" />
        <SingleQA question="How will my parcel be delivered?" />
        <SingleQA question="Do I pay for delivery?" />
      </div>
    </section>
  );
}

export default function FAQPage() {
  return (
    <div>
      {/* <Breadcrumbs crumbs={["FAQ"]} /> */}
      <div className="container pt-4 pb-16">
        <h1 className="text-3xl font-medium capitalize text-gray-900 mt-1 mb-2">
          F.A.Q
        </h1>
        <p className="mt-2 mb-6 text-sm text-gray-800">
          Can’t find the answer you’re looking for? We’ve shared some{" "}
          <br className="hidden md:block" /> of your most frequently asked
          questions to help you out!
        </p>
        <main className="space-y-8">
          <FQASection title="Shipping Information" />
          <FQASection title="Orders And Returns" />
          <FQASection title="Payments" />
        </main>
      </div>
    </div>
  );
}
