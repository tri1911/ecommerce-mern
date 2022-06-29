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
      rangeIndicator.current.style.right =
        100 - (maxPrice / MAX_VALUE) * 100 + "%";
    }
  }, [minPrice, maxPrice]);

  const handlePriceRangeChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value } = event.target;
    if (name === "range-min") {
      if (parseInt(value) > maxPrice - MIN_GAP) {
        setMinPrice(maxPrice - MIN_GAP);
      } else {
        setMinPrice(parseInt(value));
      }
    } else if (name === "range-max") {
      if (parseInt(value) < minPrice + MIN_GAP) {
        setMaxPrice(minPrice + MIN_GAP);
      } else {
        setMaxPrice(parseInt(value));
      }
    }
  };

  return (
    <div className="__container flex items-center justify-center min-h-screen bg-indigo-500">
      <div className="__wrapper w-[400px] bg-white px-6 pt-5 pb-10 rounded-lg shadow">
        <header>
          <h2 className="text-2xl">Price Range</h2>
          <p className="mt-1 text-base">
            Use slider or enter min and max price
          </p>
        </header>
        <div className="__price-input w-full flex mt-7 mx-0 mb-9">
          <div className="__field w-full h-11 flex items-center">
            <label htmlFor="input-min" className="">
              Min
            </label>
            <input
              className="w-full h-full ml-3 rounded-md outline-none border border-gray-200 text-xl text-center"
              type="number"
              name="input-min"
              id="input-min"
              value="2500"
            />
          </div>
          <div className="__separator w-[130px] flex items-center justify-center text-lg">
            -
          </div>
          <div className="__field flex items-center w-full h-11">
            <label htmlFor="input-max" className="">
              Max
            </label>
            <input
              className="w-full h-full ml-3 rounded-md outline-none border border-gray-200 text-xl text-center"
              type="number"
              name="input-max"
              id="input-max"
              value="7500"
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
            onChange={handlePriceRangeChanged}
          />
          <input
            className="__range-max"
            type="range"
            name="range-max"
            value={maxPrice}
            min={MIN_VALUE}
            max={MAX_VALUE}
            onChange={handlePriceRangeChanged}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;
