import classNames from "classnames";
import { Tab } from "@headlessui/react";
import ProductInfo from "./ProductInfo";
import QA from "./QA";
import Reviews from "./Reviews";

export default function TabsView() {
  const tabTitles = ["Product Info", "Question & Answers", "Review (10)"];

  return (
    <section className="container pb-16">
      <Tab.Group>
        <Tab.List className="border-b border-gray-200 space-x-2">
          {tabTitles.map((tab) => (
            <Tab
              key={tab}
              className={({ selected }) =>
                classNames(
                  "px-4 py-2 border border-b-0 rounded-t-md font-roboto text-base font-medium focus:outline-none",
                  { "text-primary border-primary": selected },
                  { "text-gray-700 border-gray-700": !selected }
                )
              }
            >
              {tab}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels>
          <Tab.Panel className="lg:w-4/5 xl:w-3/5 pt-6">
            <ProductInfo />
          </Tab.Panel>
          <Tab.Panel className="pt-6">
            <QA />
          </Tab.Panel>
          <Tab.Panel className="pt-6">
            <Reviews />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </section>
  );
}
