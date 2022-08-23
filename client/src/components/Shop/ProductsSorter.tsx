import { Fragment } from "react";
import classNames from "classnames";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { useSearchParams } from "react-router-dom";

const SORT_ORDERS = {
  default: "Default Sorting",
  "-ratings.average": "Best Rating",
  "-createdAt": "Newest",
  price: "Price: Low to High",
  "-price": "Price: High to Low",
};

type SortOrder = keyof typeof SORT_ORDERS;

const ProductsSorter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedSort = searchParams.get("sort") || "default";

  const handleSortChanged = (newSort: SortOrder) => {
    // Reset the `active page` when changing `sort`
    searchParams.delete("page");

    if (newSort === "default") {
      searchParams.delete("sort");
    } else {
      searchParams.set("sort", newSort);
    }
    setSearchParams(searchParams);
  };

  return (
    <Listbox
      as="div"
      className="relative w-48"
      value={selectedSort}
      onChange={handleSortChanged}
    >
      {({ open }) => (
        <>
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            {/* Button Label */}
            <span className="block truncate">
              {SORT_ORDERS[selectedSort as SortOrder]}
            </span>
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
          {/* Sort Order Options */}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-10 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {Object.entries(SORT_ORDERS).map(([sort, name]) => (
                <Listbox.Option
                  key={sort}
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
                        {name}
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
