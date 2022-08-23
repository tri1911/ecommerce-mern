import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

/**
 * User changes price range -> local state changed -> immediate update price indicators, but reflect price range to the searchParams only after user stops change the price 1s
 * - PriceFilter includes local states to keep track the selected min & max prices.
 * - Use React ref to keep the price range indicator (progress bar) in sync with the local states.
 * - When user change the price range which triggers local state updates, to avoid calling so many api calls due to minPrice, maxPrice params changes
 * we need to delay the actual updating `searchParams` operations with lodash's `debounce` method
 */

export default function PriceFilter({
  priceRangeMin,
  priceRangeMax,
}: {
  priceRangeMin: number;
  priceRangeMax: number;
}) {
  const MIN_GAP = ((priceRangeMax - priceRangeMin) * 10) / 100;

  /**
   * Local state(s)
   */

  const [minPrice, setMinPrice] = useState(priceRangeMin);
  const [maxPrice, setMaxPrice] = useState(priceRangeMax);

  // When props are changed, need to update the local state as well.
  useEffect(() => {
    setMinPrice(priceRangeMin);
  }, [priceRangeMin]);

  useEffect(() => {
    setMaxPrice(priceRangeMax);
  }, [priceRangeMax]);

  /**
   * The price range indicator
   */

  const rangeIndicator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeIndicator.current) {
      rangeIndicator.current.style.left =
        ((minPrice - priceRangeMin) / (priceRangeMax - priceRangeMin)) * 100 +
        "%";
    }
  }, [minPrice, priceRangeMin, priceRangeMax]);

  useEffect(() => {
    if (rangeIndicator.current) {
      rangeIndicator.current.style.right =
        100 -
        ((maxPrice - priceRangeMin) / (priceRangeMax - priceRangeMin)) * 100 +
        "%";
    }
  }, [maxPrice, priceRangeMin, priceRangeMax]);

  /**
   * Update the URL Search Params
   */

  const [searchParams, setSearchParams] = useSearchParams();

  /**
   * Reflect local states to searchParams
   */

  // TODO: extract into a custom hook

  // NOTE: have to use `useMemo` (or `useCallback`) to keep the debounce function persistent among renders
  const debouncedUpdateMinPrice = useMemo(
    () =>
      debounce((minPrice: number) => {
        // If the local state `minPrice` > `priceRangeMin`, consider update the `searchParams`
        if (minPrice > priceRangeMin) {
          // Only call `setSearchParam` in either of 2 cases
          // 1 - local state `minPrice` differs from the current `minPrice` in URL search params
          // 2 - `minPrice` does not exist in URL search params yet
          const selectedMinPrice = searchParams.get("minPrice");
          if (
            selectedMinPrice === null ||
            minPrice !== parseInt(selectedMinPrice)
          ) {
            console.log("updating `minPrice` local state to searchParams...");
            searchParams.set("minPrice", String(minPrice));
            // NOTE: should reset `sort` as well?
            // Reset the `active page` as well
            searchParams.delete("page");
            setSearchParams(searchParams);
          }
        } else if (searchParams.has("minPrice")) {
          // otherwise, if the local state `minPrice` is default (equals priceRangeMin)
          // exclude it from `searchParams` (if it does exist in `searchParams`)
          console.log("excluding `minPrice` searchParams from searchParams...");
          searchParams.delete("minPrice");
          // Reset the `active page` as well
          searchParams.delete("page");
          setSearchParams(searchParams);
        }
      }, 1000),
    [searchParams, setSearchParams, priceRangeMin]
  );

  useEffect(() => {
    debouncedUpdateMinPrice(minPrice);
    // don't need to call the debounced function when the component is unmounted
    return () => {
      debouncedUpdateMinPrice.cancel();
    };
  }, [debouncedUpdateMinPrice, minPrice]);

  const debouncedUpdateMaxPrice = useMemo(
    () =>
      debounce((maxPrice: number) => {
        if (maxPrice < priceRangeMax) {
          const selectedMaxPrice = searchParams.get("maxPrice");
          if (
            selectedMaxPrice === null ||
            maxPrice !== parseInt(selectedMaxPrice)
          ) {
            console.log("updating `maxPrice` local state to searchParams...");
            searchParams.set("maxPrice", String(maxPrice));
            // Reset the `active page` as well
            searchParams.delete("page");
            setSearchParams(searchParams);
          }
        } else if (searchParams.has("maxPrice")) {
          console.log("excluding `maxPrice` searchParams from searchParams...");
          searchParams.delete("maxPrice");
          // Reset the `active page` as well
          searchParams.delete("page");
          setSearchParams(searchParams);
        }
      }, 1000),
    [searchParams, setSearchParams, priceRangeMax]
  );

  useEffect(() => {
    debouncedUpdateMaxPrice(maxPrice);
    return () => {
      debouncedUpdateMaxPrice.cancel();
    };
  }, [debouncedUpdateMaxPrice, maxPrice]);

  /**
   * Event Handler
   */

  const handlePriceRangeChanged: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const parsedValue = parseInt(event.target.value);

        event.target.name === "range-min"
          ? setMinPrice(Math.min(maxPrice - MIN_GAP, parsedValue))
          : setMaxPrice(Math.max(minPrice + MIN_GAP, parsedValue));
      },
      [MIN_GAP, minPrice, maxPrice]
    );

  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-6 uppercase font-medium">
        Price
      </h3>
      <div className="__slider relative h-2 rounded-md bg-gray-300">
        <div
          ref={rangeIndicator}
          className="__progress absolute h-full rounded-md bg-primary"
        />
      </div>
      <div className="__range-input relative">
        <input
          className="__range-min"
          type="range"
          name="range-min"
          value={minPrice}
          min={priceRangeMin}
          max={priceRangeMax}
          onChange={handlePriceRangeChanged}
        />
        <input
          className="__range-max"
          type="range"
          name="range-max"
          value={maxPrice}
          min={priceRangeMin}
          max={priceRangeMax}
          onChange={handlePriceRangeChanged}
        />
      </div>
      <p className="mt-5 font-medium text-sm text-gray-700">
        ${minPrice} - ${maxPrice}
      </p>
    </div>
  );
}
