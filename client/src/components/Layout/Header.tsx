import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectAllCartItems } from "../../slices/cartSlice";

function Logo() {
  return (
    <a href="/" className="block w-32">
      <img src="/images/svg/logo.svg" alt="my logo" className="w-full" />
    </a>
  );
}

function SearchBar() {
  return (
    <div className="w-full lg:max-w-lg xl:max-w-xl hidden lg:flex relative">
      <span className="absolute left-4 top-3 text-lg text-gray-400">
        <i className="fas fa-search" />
      </span>
      <input
        type="text"
        className="w-full border border-r-0 border-primary rounded-l-md pl-12 py-3 pr-3 focus:ring-primary focus:border-primary"
        placeholder="Search Products"
      />
      <button
        type="button"
        className="border border-primary rounded-r-md px-8 bg-primary text-white font-medium hover:bg-transparent hover:text-primary transition"
      >
        Search
      </button>
    </div>
  );
}

function SingleNavIcon({
  href,
  icon,
  label,
  badgeValue,
  badgeRight,
}: {
  href: string;
  icon: string;
  label: string;
  badgeValue?: number;
  badgeRight?: string;
}) {
  return (
    <Link
      to={href}
      className="block text-center text-gray-700 hover:text-primary transition relative"
    >
      {badgeValue !== undefined && (
        <span
          className={`absolute -right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs ${badgeRight}`}
        >
          {badgeValue}
        </span>
      )}
      <div className="text-2xl">
        <i className={icon} />
      </div>
      <div className="text-xs leading-3">{label}</div>
    </Link>
  );
}

function NavIcons() {
  const allCartItems = useAppSelector(selectAllCartItems);

  const computeTotalQuantities = useMemo(
    () => allCartItems.reduce((sum, item) => sum + item.quantity, 0),
    [allCartItems]
  );

  return (
    <div className="flex items-center space-x-4">
      <SingleNavIcon
        href="/account/wishlist"
        icon="far fa-heart"
        label="Wish List"
        badgeValue={5}
      />
      <SingleNavIcon
        href="/cart"
        icon="fas fa-shopping-bag"
        label="Cart"
        badgeValue={computeTotalQuantities}
        badgeRight="-right-3"
      />
      <SingleNavIcon
        href="/account/manage"
        icon="far fa-user"
        label="Account"
      />
    </div>
  );
}

export default function Header() {
  return (
    <header className="py-4 shadow-sm bg-pink-100 lg:bg-white">
      <section className="container flex items-center justify-between">
        <Logo />
        <SearchBar />
        <NavIcons />
      </section>
    </header>
  );
}
