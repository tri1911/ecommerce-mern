import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState, AppDispatch } from "./store";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilterCheckboxHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // make the filter checkbox to be additive (clicking `cat1` and then `cat2` adds both categories to the search params) instead of replacing the brand
  const handleBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value, checked } = event.target;

    if (checked) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
      // navigate(`/shop?${searchParams.toString()}`);
    } else {
      const newParams = new URLSearchParams(
        Array.from(searchParams).filter(([k, v]) => k !== name || v !== value)
      );
      setSearchParams(newParams);
      // navigate(`/shop?${newParams.toString()}`);
    }
  };

  return handleBoxChecked;
};
