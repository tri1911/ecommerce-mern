import { ArrowNarrowRightIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

function CategoryItem({ category }: { category: string }) {
  return (
    <div className="relative group rounded-sm overflow-hidden">
      <img
        className="w-full"
        src={`/images/categories/${category}.jpeg`}
        alt={category}
      />
      <Link
        to="#"
        className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center transition rounded-sm"
      >
        <div className="flex items-center font-roboto text-xl text-white font-medium tracking-wide capitalize">
          <h2>{category}</h2>
          <span className="opacity-0 group-hover:opacity-100 group-hover:ml-2 ease-in duration-300">
            <ArrowNarrowRightIcon className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </div>
  );
}

const categories = [
  "shoes",
  "books",
  "mobiles",
  "computers",
  "keyboards",
  "headphones",
];

export default function CategoriesList() {
  return (
    <div className="container pb-16">
      <h2 className="text-2xl md:text-3xl font-medium text-primary uppercase mb-6">
        Featured Categories
      </h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
        {categories ? (
          categories.map((category) => (
            <CategoryItem key={category} category={category} />
          ))
        ) : (
          <p>There is no featured categories.</p>
        )}
      </div>
    </div>
  );
}
