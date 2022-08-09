import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useFilterRadioHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRadioChanged: React.ChangeEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        const { name, value } = event.target;
        searchParams.set(name, value);
        setSearchParams(searchParams);
      },
      [searchParams, setSearchParams]
    );

  return handleRadioChanged;
};
