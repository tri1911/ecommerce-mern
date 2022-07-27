import { ChevronRightIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { Category } from "../../services/category.service";
import {
  fetchCategoriesTree,
  selectAllCategories,
} from "../../slices/categories.slice";

function SingleMenuSection({
  category: { _id, name, children },
}: {
  category: Category;
}) {
  return (
    <section className="space-y-2">
      <Link
        to={`/categories/${_id}`}
        className="font-roboto text-base text-gray-800 font-medium hover:text-primary transition"
      >
        {name}
      </Link>
      <div className="space-y-2">
        {children.map(({ _id, name }) => (
          <Link
            to={`/categories/${_id}`}
            key={_id}
            className="block text-sm text-gray-600 hover:text-primary transition"
          >
            {name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function DropdownItem({
  category: { _id, name, children },
}: {
  category: Category;
}) {
  return (
    <div className="flex items-center pl-6 pr-3 py-3 hover:bg-gray-100 transition group-two">
      <img
        src={`/images/icons/bed.svg`}
        alt="category icon"
        className="w-5 h-5 object-contain"
      />
      <Link to={`/categories/${_id}`} className="ml-6 text-sm text-gray-600">
        {name}
      </Link>
      <ChevronRightIcon className="w-5 h-5 ml-auto" />
      {/* Dropdown Content */}
      <div className="__mega-menu absolute top-0 left-full w-[1000px] px-5 pb-5 pt-3 hidden group-two-hover:grid grid-cols-8 gap-5 bg-white border border-gray-300 rounded cursor-default">
        {children.map((subcategory) => (
          <SingleMenuSection key={subcategory._id} category={subcategory} />
        ))}
      </div>
    </div>
  );
}

function CategoriesMenuDropdown() {
  const categories = useSelector(selectAllCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesTree({ maxDepth: 3 }));
  }, [dispatch]);

  return (
    <div className="px-8 py-4 flex items-center bg-primary cursor-pointer group-one relative">
      <span className="text-white">
        <i className="fas fa-bars" />
      </span>
      <span className="ml-2 text-white capitalize">All Categories</span>
      {/* Dropdown Content */}
      <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-one-hover:opacity-100 group-one-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
        {categories?.map((category) => (
          <DropdownItem key={category._id} category={category} />
        ))}
      </div>
    </div>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <Link to={href} className="text-gray-200 hover:text-primary transition">
      {text}
    </Link>
  );
}

// TODO: implement mobile menubar
function NavMenu() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex items-center justify-between flex-grow pl-12">
      <div className="flex items-center space-x-6 text-base capitalize">
        <NavItem href="/" text="Home" />
        <NavItem href="/shop" text="Shop" />
        <NavItem href="/track-order" text="Track Order" />
        <NavItem href="/about" text="About us" />
        <NavItem href="/contact" text="Contact us" />
        <NavItem href="/faq" text="FAQ" />
      </div>
      {user && (
        <div className="ml-auto justify-self-end text-gray-200">
          Hello, {user.name}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  return (
    <nav className="bg-gray-800 hidden lg:block">
      <section className="container flex">
        <CategoriesMenuDropdown />
        <NavMenu />
      </section>
    </nav>
  );
}
