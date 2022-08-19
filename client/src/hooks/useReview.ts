import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "hooks";
import {
  createReview,
  updateReview,
  fetchUserReviews,
} from "slices/reviews.slice";
import type {
  UserReview,
  ReviewPayload,
  UpdateReviewPayload,
} from "services/review.service";
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

export const useCreateOrUpdateReview = (existingReview?: UserReview) => {
  const [productRating, setProductRating] = useState(
    existingReview?.productRating ?? 0
  );
  const [sellerRating, setSellerRating] = useState(
    existingReview?.sellerRating ?? 0
  );
  const [deliveryRating, setDeliveryRating] = useState(
    existingReview?.deliveryRating ?? 0
  );
  const [description, setDescription] = useState(existingReview?.desc ?? "");

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
    (payload: ReviewPayload) => () => {
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

  const handleUpdateReview = useCallback(
    (update: UpdateReviewPayload) => () => {
      setLoading(true);
      dispatch(updateReview(update))
        .unwrap()
        .then((updated) => {
          console.log("updated", updated);
          navigate("/account/reviews");
        })
        .catch((err) => {
          console.log("err", err.payload.message);
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
    handleUpdateReview,
    loading,
  };
};
