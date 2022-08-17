import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/reviews";

export interface Review {
  _id: string;
  user: string;
  order: string;
  product: string;
  purchasedAt: string;
  rating: number;
  desc: string;
  createdAt: string;
}

const createReview = async ({
  token,
  order,
  purchasedAt,
  product,
  rating,
  desc,
}: {
  token: string;
  order: string;
  purchasedAt: string;
  product: string;
  rating: number;
  desc: string;
}) => {
  const {
    data: { createdReview },
  } = await axios.post<{ createdReview: Review }>(
    `${baseUrl}/${product}`,
    {
      order,
      purchasedAt,
      rating,
      desc,
    },
    generateConfig(token)
  );
  return createdReview;
};

const reviewServices = { createReview };

export default reviewServices;
