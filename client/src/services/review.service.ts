import axios from "axios";
import { generateConfig } from "utils/generate-auth-config.util";

const baseUrl = "http://localhost:3001/api/reviews";

export interface UserReview {
  _id: string;
  user: string;
  order: string;
  product: { _id: string; title: string; image: string };
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
  } = await axios.post<{ createdReview: UserReview }>(
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
