import { useEffect, useRef, useState } from "react";

const MIN_VALUE = 0;
const MAX_VALUE = 10000;
const MIN_GAP = 1000;

const PriceRangeSlider = () => {
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
    <div className="__wrapper w-[400px] bg-white px-6 pt-5 pb-10 rounded-lg shadow">
      <header>
        <h2 className="text-2xl">Price Range</h2>
        <p className="mt-1 text-base">Use slider or enter min and max price</p>
      </header>
      <div className="__price-input w-full flex mt-7 mx-0 mb-9">
        <div className="__field w-full h-11 flex items-center">
          <label htmlFor="input-min" className="">
            $
          </label>
          <input
            className="w-full h-full ml-3 rounded-md outline-none border border-gray-200 text-xl text-center focus:ring-0 focus:border-primary"
            type="number"
            name="input-min"
            id="input-min"
            value={minPrice}
            readOnly
          />
        </div>
        <div className="__separator w-[130px] flex items-center justify-center text-lg">
          -
        </div>
        <div className="__field flex items-center w-full h-11">
          <label htmlFor="input-max" className="">
            $
          </label>
          <input
            className="w-full h-full ml-3 rounded-md outline-none border border-gray-200 text-xl text-center focus:ring-0 focus:border-primary"
            type="number"
            name="input-max"
            id="input-max"
            value={maxPrice}
            readOnly
          />
        </div>
      </div>
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
    </div>
  );
};

export default PriceRangeSlider;
