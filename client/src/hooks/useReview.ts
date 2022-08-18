import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import { createReview, type CreateReviewPayload } from "slices/reviews.slice";
import { useNavigate } from "react-router-dom";

const useReview = () => {
  const [productRating, setProductRating] = useState(0);
  const [sellerRating, setSellerRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [description, setDescription] = useState("");

  const canSubmit = [
    productRating,
    sellerRating,
    deliveryRating,
    description,
  ].every(Boolean);

  const handleDescriptionChanged: React.ChangeEventHandler<HTMLTextAreaElement> =
    useCallback((e) => {
      setDescription(e.target.value);
    }, []);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCreateReview = useCallback(
    (payload: CreateReviewPayload) => async () => {
      dispatch(createReview(payload));
    },
    [dispatch]
  );

  const { status } = useAppSelector((state) => state.reviews);

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/account/reviews");
    }
  }, [navigate, status]);

  return {
    productRating,
    setProductRating,
    sellerRating,
    setSellerRating,
    deliveryRating,
    setDeliveryRating,
    description,
    handleDescriptionChanged,
    canSubmit,
    handleCreateReview,
    status,
  };
};

export default useReview;
