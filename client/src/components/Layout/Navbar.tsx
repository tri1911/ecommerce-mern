import { ChevronRightIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category } from "../../services/category.service";
import {
  getAllCategories,
  selectAllCategories,
} from "../../slices/categories.slice";

function SingleMenuSection({
  category: { name, children },
}: {
  category: Category;
}) {
  return (
    <section>
      <h4 className="mb-1 text-lg text-gray-800 font-medium">{name}</h4>
      <div className="space-y-2">
        {children.map(({ name }) => (
          <Link
            to={"#"}
            key={name}
            className="block text-sm text-gray-600 hover:text-primary transition"
          >
            {name}
          </Link>
        ))}
      </div>
    </section>
  );
}

function CategoryMenuItem({
  category: { name, children },
}: {
  category: Category;
}) {
  return (
    <Link
      to={"#"}
      className="flex items-center pl-6 pr-3 py-3 hover:bg-gray-100 transition group-two"
    >
      <img
        src={"/images/icons/bed.svg"}
        alt="Category Icon"
        className="w-5 h-5 object-contain"
      />
      <span className="ml-6 text-sm text-gray-600">{name}</span>
      <ChevronRightIcon className="w-5 h-5 ml-auto" />
      <div className="__mega-menu absolute top-0 left-full w-[720px] px-5 pb-5 pt-3 hidden group-two-hover:grid grid-cols-4 bg-white border border-gray-300 rounded cursor-default">
        {children.map((cat) => (
          <SingleMenuSection key={cat.name} category={cat} />
        ))}
      </div>
    </Link>
  );
}

function CategoriesMenuDropdown() {
  const categories = useSelector(selectAllCategories);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <div className="px-8 py-4 flex items-center bg-primary cursor-pointer group-one relative">
      <span className="text-white">
        <i className="fas fa-bars" />
      </span>
      <span className="ml-2 text-white capitalize">All Categories</span>
      <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-one-hover:opacity-100 group-one-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
        {categories?.map((category) => (
          <CategoryMenuItem key={category.name} category={category} />
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
