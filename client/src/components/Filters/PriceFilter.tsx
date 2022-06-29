import { useEffect, useRef, useState } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 10000;
const MIN_GAP = 1000;

export default function PriceFilter() {
  const [minPrice, setMinPrice] = useState(MIN_VALUE);
  const [maxPrice, setMaxPrice] = useState(MAX_VALUE);

  const rangeIndicator = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeIndicator.current) {
      rangeIndicator.current.style.left = (minPrice / MAX_VALUE) * 100 + "%";
    }
  }, [minPrice]);

  useEffect(() => {
    if (rangeIndicator.current) {
      rangeIndicator.current.style.right =
        100 - (maxPrice / MAX_VALUE) * 100 + "%";
    }
  }, [maxPrice]);

  const handlePriceRangeChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const parsedValue = parseInt(event.target.value);
    event.target.name === "range-min"
      ? setMinPrice(Math.min(maxPrice - MIN_GAP, parsedValue))
      : setMaxPrice(Math.max(minPrice + MIN_GAP, parsedValue));
  };

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
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={10}
          onChange={handlePriceRangeChanged}
        />
        <input
          className="__range-max"
          type="range"
          name="range-max"
          value={maxPrice}
          min={MIN_VALUE}
          max={MAX_VALUE}
          step={10}
          onChange={handlePriceRangeChanged}
        />
      </div>
      <p className="mt-5 font-medium text-sm text-gray-700">
        ${minPrice} - ${maxPrice}
      </p>
    </div>
  );
}
