import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "/api/reviews";

export interface UserReview {
  _id: string;
  user: string;
  order: string;
  product: { _id: string; title: string; image: string };
  purchasedAt: string;
  productRating: number;
  sellerRating: number;
  deliveryRating: number;
  desc: string;
  createdAt: string;
}

export interface ReviewPayload {
  orderId: string;
  productId: string;
  purchasedAt: string;
  productRating: number;
  sellerRating: number;
  deliveryRating: number;
  desc: string;
}

const createReview = async ({
  token,
  ...payload
}: {
  token: string;
} & ReviewPayload) => {
  const {
    data: { createdReview },
  } = await axios.post<{ createdReview: UserReview }>(
    baseUrl,
    payload,
    generateConfig(token)
  );
  return createdReview;
};

export type UpdateReviewPayload = Omit<
  ReviewPayload,
  "orderId" | "purchasedAt"
>;

const updateReview = async ({
  token,
  ...update
}: {
  token: string;
} & UpdateReviewPayload) => {
  const {
    data: { updatedReview },
  } = await axios.put<{ updatedReview: UserReview }>(
    baseUrl,
    update,
    generateConfig(token)
  );
  return updatedReview;
};

const reviewServices = { createReview, updateReview };

export default reviewServices;
