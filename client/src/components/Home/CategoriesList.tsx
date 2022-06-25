import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllCategories } from "../../slices/categoriesSlice";
import { Category } from "../../types";

function CategoryItem({
  category: { slug, name, image },
}: {
  category: Category;
}) {
  return (
    <div
      className="relative group rounded-sm overflow-hidden"
      onClick={() => console.log("category clicked")}
    >
      <img className="w-full" src={image} alt={name} />
      <Link
        to={`/shop?category=${slug}`}
        className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center text-xl text-white font-roboto font-medium tracking-wide transition"
      >
        {name}
      </Link>
    </div>
  );
}

export default function CategoriesList() {
  const categories = useSelector(selectAllCategories);

  return (
    <div className="container pb-16">
      <h2 className="text-2xl md:text-3xl font-medium text-gray-800 uppercase mb-6">
        Shop by Category
      </h2>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-3">
        {!categories ? (
          <p>There is no categories.</p>
        ) : (
          categories.map((category) => (
            <CategoryItem key={category.slug} category={category} />
          ))
        )}
      </div>
    </div>
  );
}
