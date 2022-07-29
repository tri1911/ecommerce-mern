import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import debounce from "lodash.debounce";

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

  // when props are changed, need to update the local state as well
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

  // TODO: extract into custom hook

  // NOTE: have to useMemo (or useCallback) to make the debounce function persistence among renders
  const debouncedUpdateMinPrice = useMemo(
    () =>
      debounce((minPrice: number) => {
        if (minPrice > priceRangeMin) {
          searchParams.set("minPrice", String(minPrice));
          setSearchParams(searchParams);
        } else if (searchParams.has("minPrice")) {
          searchParams.delete("minPrice");
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
          searchParams.set("maxPrice", String(maxPrice));
          setSearchParams(searchParams);
        } else if (searchParams.has("maxPrice")) {
          searchParams.delete("maxPrice");
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
   * Handler method(s)
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
