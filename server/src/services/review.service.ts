import { Types } from "mongoose";
import ReviewModel, { Review } from "@models/review.model";
import ProductModel from "@models/product.model";
import UserModel from "@models/user.model";
import { HttpException } from "@utils/custom-errors.util";

const createReview = async (payload: Review) => {
  // find the product to review on
  const foundProduct = await ProductModel.findById(payload.product);

  if (!foundProduct) {
    throw new HttpException("Product does not exist", 404);
  }

  // check whether the user already creates review for this product before
  const existingReview = await ReviewModel.findOne({
    product: payload.product,
    user: payload.user,
  });

  if (existingReview) {
    throw new HttpException(
      "User created review for this product previously",
      400
    );
  }

  // create new review
  const createdReview = await ReviewModel.create(payload);

  // update the computed property for the product as well
  const { count, average } = foundProduct.ratings;
  foundProduct.ratings.count = count + 1;
  foundProduct.ratings.average =
    (average * count + payload.rating) / (count + 1);
  await foundProduct.save();

  return createdReview;
};

const updateReview = async ({ product, user, rating, desc }: Review) => {
  const foundProduct = await ProductModel.findById(product);
  if (!foundProduct) {
    throw new HttpException("Product does not exist", 404);
  }

  const oldReview = await ReviewModel.findOne({ product, user });

  if (!oldReview) {
    throw new HttpException("Review does not exist", 404);
  }

  // each time update the review, need to update the rating average for the product as well
  const { count, average } = foundProduct.ratings;
  foundProduct.ratings.average =
    (average * count - oldReview.rating + rating) / count;
  await foundProduct.save();

  // update the review
  oldReview.rating = rating;
  oldReview.desc = desc;
  const updatedReview = await oldReview.save();

  return updatedReview;
};

const getAllReviews = async () => {
  const reviews = await ReviewModel.find({});
  return reviews;
};

// reviews sort order

export const reviewSortKeys = [
  "rating",
  "createdAt",
  "-createdAt",
  "-rating",
] as const;

type ReviewSortKey = typeof reviewSortKeys[number];

const reviewSorts: {
  [key in ReviewSortKey]: Record<string, 1 | -1>;
} = {
  createdAt: { createdAt: 1 },
  "-createdAt": { createdAt: -1 },
  rating: { rating: 1 },
  "-rating": { rating: -1 },
};

interface AggregatedProductReviews {
  reviews: Array<{
    _id: Types.ObjectId;
    rating: number;
    desc: string;
    createdAt: Date;
    user: { name: string; avatar?: string };
  }>;
  ratings: Array<{ _id: number; count: number }>;
}

const getReviewsByProduct = async ({
  productId,
  limit = 3,
  page = 1,
  sort = "-createdAt",
}: {
  productId: Types.ObjectId;
  limit?: number;
  page?: number;
  sort?: ReviewSortKey;
}) => {
  // verify product existence
  const foundProduct = await ProductModel.findById(productId);

  if (!foundProduct) {
    throw new HttpException("Product does not exist", 404);
  }

  // get product reviews along with analytical summary information using $bucket aggregate operator
  // references:
  // https://www.mongodb.com/docs/manual/reference/operator/aggregation/bucket/
  // https://mongoosejs.com/docs/api/aggregate.html#aggregate_Aggregate-facet
  const result = await ReviewModel.aggregate<AggregatedProductReviews>([
    { $match: { product: productId } },
  ]).facet({
    reviews: [
      { $sort: reviewSorts[sort] },
      { $skip: limit * (page - 1) },
      { $limit: limit },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          pipeline: [
            {
              $project: {
                _id: 0,
                avatar: 1,
                name: { $concat: ["$firstName", " ", "$lastName"] },
              },
            },
          ],
          as: "user",
        },
      },
      {
        $project: {
          rating: 1,
          desc: 1,
          createdAt: 1,
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
    ],
    ratings: [
      {
        $bucket: {
          groupBy: "$rating",
          boundaries: [1, 2, 3, 4, 5],
          output: { count: { $sum: 1 } },
        },
      },
    ],
  });

  return result[0];
};

const getReviewsByUser = async ({
  userId,
  limit = 5,
  page = 1,
}: {
  userId: Types.ObjectId | string;
  limit?: number;
  page?: number;
}) => {
  const foundUser = await UserModel.findById(userId);
  if (!foundUser) {
    throw new HttpException("User does not exist", 404);
  }

  const reviews = await ReviewModel.find({ user: userId })
    .sort({ createdAt: -1 })
    .skip(limit * (page - 1))
    .limit(limit)
    .select({ rating: 1, desc: 1, createdAt: 1 });

  return reviews;
};

export default {
  createReview,
  updateReview,
  getAllReviews,
  getReviewsByProduct,
  getReviewsByUser,
};
