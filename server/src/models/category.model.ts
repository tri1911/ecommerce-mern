import { model, Schema, InferSchemaType, Types } from "mongoose";

/**
 * Main operations in my application
 * 1. Initially, application just fetch all categories at once to show categories menu
 * 2. Within the product list page by category, we need to fetch children categories of the currently selected category to show filter by sub-categories
 * 3. Listing all products by category
 *
 * With Operation 1 & 2, I use `Parent reference` approach to represent the tree
 * Operation 1: fetch all categories: `db.categories.find({})` -> create categories list from returned array (run only once at the beginning)
 * Operation 2: fetch sub-categories of a category: `db.categories.find({ parent: <category_id> })`
 * Note: can improve performance for operation 2, use `db.categories.createIndex({ parent: 1 })`
 *
 * For operation 3: Product has references to categories it belongs to
 * e.g. category tree is Men -> Shoes, Clothes -> Running, Soccer Shoe. Need to fetch sub-tree of `Men` category which includes both categories `Shoes` & `Clothes`
 * next, fetching desired products list with query: db.products.find({ category: { $in: <returned_category_ids> } })
 *
 * The question is how to efficiently retrieve all categories in sub-tree of a certain category? -> each category stores ancestors array or string (as absolute path) field called `ancestors`
 * Query to fetch categories in sub-tree:
 * `db.categories.find({ ancestors: "men" })` if `ancestors` is an array
 * `db.categories.find({ ancestors: /^\/men/ })` if `ancestors` is a path string
 * Note: we need 2 queries for the operation 3
 *
 * references
 * https://www.mongodb.com/docs/manual/applications/data-models-tree-structures/
 * https://stackoverflow.com/questions/14966777/most-efficient-way-to-store-nested-categories-or-hierarchical-data-in-mongo
 */

const categorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: Schema.Types.ObjectId, ref: "Category" },
  path: { type: String },
  icon: { type: String },
  image: { type: String },
});

categorySchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export type Category = InferSchemaType<typeof categorySchema> & {
  _id: Types.ObjectId;
};
export default model("Category", categorySchema);
