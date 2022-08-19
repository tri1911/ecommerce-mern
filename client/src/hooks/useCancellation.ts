import { useAppDispatch, useAppSelector } from "hooks";
import { useCallback } from "react";
import { getCancellations } from "slices/cancellations.slice";

const useCancellation = () => {
  const { status, error } = useAppSelector((state) => state.cancellations);

  const dispatch = useAppDispatch();

  const fetchAllCancellations = useCallback(() => {
    dispatch(getCancellations());
  }, [dispatch]);

  return { status, error, fetchAllCancellations };
};

export default useCancellation;
