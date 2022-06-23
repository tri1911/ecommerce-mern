import { Link } from "react-router-dom";

function CategoryItem({
  href,
  image,
  text,
}: {
  href: string;
  image: string;
  text: string;
}) {
  return (
    <a
      href={href}
      className="px-6 py-3 flex items-center hover:bg-gray-100 transition"
    >
      <img src={image} alt="" className="w-5 h-5 object-contain" />
      <span className="ml-6 text-gray-600 text-sm">{text}</span>
    </a>
  );
}

function CategoriesDropdown() {
  return (
    <div className="px-8 py-4 bg-primary flex items-center cursor-pointer group relative">
      <span className="text-white">
        <i className="fas fa-bars" />
      </span>
      <span className="ml-2 text-white capitalize">All Categories</span>
      <div className="absolute left-0 top-full w-full bg-white shadow-md py-3 invisible opacity-0 group-hover:opacity-100 group-hover:visible transition duration-300 z-50 divide-y divide-gray-300 divide-dashed">
        <CategoryItem href="#" image="images/icons/bed.svg" text="Bedroom" />
        <CategoryItem href="#" image="images/icons/sofa.svg" text="Sofa" />
        <CategoryItem href="#" image="images/icons/office.svg" text="Office" />
        <CategoryItem
          href="#"
          image="images/icons/terrace.svg"
          text="Outdoor"
        />
        <CategoryItem href="#" image="images/icons/bed-2.svg" text="Mattress" />
        <CategoryItem
          href="#"
          image="images/icons/restaurant.svg"
          text="Restaurant"
        />
      </div>
    </div>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <Link to={href} className="text-gray-200 hover:text-white transition">
      {text}
    </Link>
  );
}

// TODO: implement mobile menubar
function NavMenu() {
  return (
    <div className="flex items-center justify-between flex-grow pl-12">
      <div className="flex items-center space-x-6 text-base capitalize">
        <NavItem href="/" text="Home" />
        <NavItem href="/shop" text="Shop" />
        <NavItem href="/about" text="About us" />
        <NavItem href="/contact" text="Contact us" />
      </div>
      <a
        href="/login"
        className="ml-auto justify-self-end text-gray-200 hover:text-white transition"
      >
        Login / Register
      </a>
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
