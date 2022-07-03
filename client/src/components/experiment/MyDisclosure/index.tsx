import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import classNames from "classnames";

export default function MyDisclosure() {
  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-2">
      <Disclosure>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between px-4 py-2 bg-purple-100 rounded-lg text-left text-sm text-purple-900 font-medium hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>What is your refund policy?</span>
              <ChevronUpIcon
                className={classNames("w-5 h-5 text-purple-500", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Transition
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                If you're unhappy with your purchase for any reason, email us
                within 90 days and we'll refund you in full, no questions asked.
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-4">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between px-4 py-2 bg-purple-100 rounded-lg text-left text-sm text-purple-900 font-medium hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
              <span>Do you offer technical support?</span>
              <ChevronUpIcon
                className={classNames("w-5 h-5 text-purple-500", {
                  "rotate-180": open,
                })}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
              No.
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}
