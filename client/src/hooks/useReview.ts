import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  createReview,
  fetchUserReviews,
  type CreateReviewPayload,
} from "slices/reviews.slice";
import { useNavigate } from "react-router-dom";

export const useFetchUserReviews = () => {
  const { status: fetchUserReviewsStatus } = useAppSelector(
    (state) => state.reviews
  );

  const dispatch = useAppDispatch();

  const getAllUserReviews = useCallback(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

  return { getAllUserReviews, fetchUserReviewsStatus };
};

export const useCreateReview = () => {
  const [productRating, setProductRating] = useState(0);
  const [sellerRating, setSellerRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [description, setDescription] = useState("");

  // track the review creation process
  const [loading, setLoading] = useState(false);

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
    (payload: CreateReviewPayload) => () => {
      setLoading(true);
      dispatch(createReview(payload))
        .unwrap()
        .then((originalPromiseResult) => {
          console.log("originalPromiseResult", originalPromiseResult);
          navigate("/account/reviews");
        })
        .catch((rejectedValueOrSerializedError) => {
          console.log(rejectedValueOrSerializedError.payload.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [dispatch, navigate]
  );

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
    loading,
  };
};
