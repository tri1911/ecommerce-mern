import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAllCategories } from "../../slices/categoriesSlice";

function CategoryItem({
  href,
  icon,
  text,
}: {
  href: string;
  icon: string;
  text: string;
}) {
  return (
    <Link
      to={href}
      className="px-6 py-3 flex items-center hover:bg-gray-100 transition"
    >
      <img src={icon} alt="" className="w-5 h-5 object-contain" />
      <span className="ml-6 text-gray-600 text-sm">{text}</span>
    </Link>
  );
}

// NOTE: should pass `categories` props here OR just get data from store? (I chose get data from store because I don't re-use this component with different `categories` set)
function CategoriesDropdown() {
  const categories = useSelector(selectAllCategories);

  // NOTE: it's better to save the icon by category's slug
  return (
    <div className="px-8 py-4 bg-primary flex items-center cursor-pointer group relative">
      <span className="text-white">
        <i className="fas fa-bars" />
      </span>
      <span className="ml-2 text-white capitalize">All Categories</span>
      <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
        {categories.map(({ slug, icon, name }) => (
          <CategoryItem
            key={slug}
            href={`/shop?category=${slug}`}
            icon={`/images/icons/${icon}.svg`}
            text={name}
          />
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
        <CategoriesDropdown />
        <NavMenu />
      </section>
    </nav>
  );
}
