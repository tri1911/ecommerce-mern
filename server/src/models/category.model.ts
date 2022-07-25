import { model, Schema, Types, Model } from "mongoose";
import { HttpException } from "@utils/custom-errors.util";
import logger from "@utils/logger.util";

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

const pathSeparator = "#";

export interface ICategory {
  name: string;
  parentId?: Types.ObjectId;
  path?: string;
  children?: ICategory[];
}

interface CategoryModel extends Model<ICategory> {
  getImmediateChildren(id: string): Promise<ICategory[]>;
  getAllChildren(id: string): Promise<Types.ObjectId[]>;
  getChildrenTree(args: {
    id?: string;
    maxDepth?: number;
  }): Promise<ICategory[]>;
}

const categorySchema = new Schema<ICategory, CategoryModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    parentId: {
      index: true,
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    path: { index: true, type: String },
    children: [],
  },
  {
    methods: {
      getParent() {
        return model("Category").findOne({ parentId: this.parentId });
      },
      getAncestors() {
        let ancestorIds = Array<string>();
        if (this.path) {
          ancestorIds = this.path.split(pathSeparator);
          ancestorIds.pop();
        }
        return model("Category").find({ _id: { $in: ancestorIds } });
      },
      getImmediateChildren() {
        return model("Category").find({ parentId: this._id });
      },
      getAllChildren() {
        if (this.path) {
          return model("Category").find(
            {
              path: new RegExp(`^${this.path}[${pathSeparator}]`),
            },
            { _id: 1 }
          );
        }
        return null;
      },
    },
  }
);

/**
 * Mongoose schema pre-save hook to generate/update the path if necessary
 * Before saving the category document into database, we check whether updating the path field is required
 * Specifically, if the document is new, generating the path field by concatenating its _id to the parent's path
 */
categorySchema.pre("save", async function (next) {
  const parentChanged = this.isModified("parentId");
  const pathUpdateRequired = this.isNew || parentChanged;

  const updateChildrenPaths = async (
    pathToReplace: string,
    replacementPath: string
  ) => {
    const children = await model<ICategory, CategoryModel>("Category").find({
      path: new RegExp(`^${pathToReplace}[${pathSeparator}]`),
    });
    children.forEach(async (child) => {
      child.path =
        replacementPath + child.path?.substring(pathToReplace.length);
      await child.save();
    });
  };

  if (pathUpdateRequired) {
    const oldPath = this.path;

    if (this.parentId) {
      try {
        const parentDoc = await this.collection.findOne({ _id: this.parentId });
        if (parentDoc) {
          const newPath = `${
            parentDoc.path
          }${pathSeparator}${this._id.toString()}`;
          this.path = newPath;
          // update all children's paths as well if the current node's parentId is changed
          if (parentChanged && oldPath) {
            await updateChildrenPaths(oldPath, newPath);
          }
        } else {
          logger.error(
            `The parent node with id of ${this.parentId} is not found`
          );
        }
      } catch (error) {
        logger.error(error);
        if (error instanceof Error) {
          next(error);
        }
      }
    } else {
      const newPath = this._id.toString();
      this.path = newPath;

      if (parentChanged && oldPath) {
        await updateChildrenPaths(oldPath, newPath);
      }
    }
  }

  next();
});

// TODO: implement the pre-remove hook to remove or re-parent children

categorySchema.set("toJSON", {
  transform(_document, returnedObject) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

/**
 * get the hierarchical tree of all descendants under a category
 * @param {string} id the root category id
 * @return {Array<ICategory>} hierarchical array of all descendants
 */
categorySchema.static(
  "getChildrenTree",
  async function getChildrenTree({
    id,
    maxDepth,
  }: {
    id?: string;
    maxDepth?: number;
  }) {
    let filter = {};

    // if id is undefined, get the tree including all nodes, otherwise, build tree under the root category id
    if (id) {
      const root = await this.findById(id);
      if (root) {
        filter = { path: new RegExp(`^${root.path}[${pathSeparator}]`) };
      } else {
        throw new HttpException(`Category with id of ${id} is not found`, 404);
      }
    }

    // sorting is crucial to build the tree properly
    let categories = await this.find(filter, {
      name: 1,
      parentId: 1,
      children: 1,
    })
      .sort({ path: 1 })
      .lean();
    // get rid of unnecessary nodes
    if (maxDepth) {
      categories = categories.filter(({ path }) => {
        const level = path ? path.split(pathSeparator).length : 1;
        return level <= maxDepth;
      });
    }

    // build tree from the returned list
    const result = Array<ICategory>();
    // hash table to map the parent id to its index in `categories` array [parentId : node index]
    const parentsMap: { [parentId: string]: number } = {};

    for (let index = 0; index < categories.length; index++) {
      const current = categories[index];
      const parentId = current.parentId?.toString();
      if (parentId && parentsMap[parentId] !== undefined) {
        const parentIndex = parentsMap[parentId];
        categories[parentIndex].children?.push(current);
      } else {
        result.push(current);
      }
      parentsMap[current._id.toString()] = index;
    }
    return result;
  }
);

export default model<ICategory, CategoryModel>("Category", categorySchema);
