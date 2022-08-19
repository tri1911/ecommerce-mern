import { Fragment, useEffect, useState } from "react";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSearchParams } from "react-router-dom";

const SORT_OPTIONS: Array<{ name: string; value?: string }> = [
  { name: "Default Sorting", value: undefined },
  { name: "Best Rating", value: "-ratings.average" },
  { name: "Newest", value: "-createdAt" },
  { name: "Price: Low to High", value: "price" },
  { name: "Price: High to Low", value: "-price" },
];

const ProductsSorter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedSort, setSelectedSort] = useState(SORT_OPTIONS[0]);

  useEffect(() => {
    selectedSort.value !== undefined
      ? searchParams.set("sort", selectedSort.value)
      : searchParams.delete("sort");
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams, selectedSort]);

  return (
    <Listbox
      as="div"
      className="relative w-48"
      value={selectedSort}
      onChange={setSelectedSort}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selectedSort.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                className={classNames(
                  "h-5 w-5 text-gray-400 transition duration-300",
                  {
                    "rotate-180": open,
                  }
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {SORT_OPTIONS.map((sort, index) => (
                <Listbox.Option
                  key={index}
                  value={sort}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-default select-none py-2 pl-10 pr-4",
                      { "bg-amber-100 text-amber-900": active },
                      { "text-gray-900": !active }
                    )
                  }
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          { "font-medium": selected },
                          { "font-normal": !selected }
                        )}
                      >
                        {sort.name}
                      </span>
                      {selected && (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
};

export default ProductsSorter;
