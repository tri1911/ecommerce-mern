import { Link } from "react-router-dom";
import classNames from "classnames";
import { useAppSelector } from "hooks";
import useWishlist from "hooks/useWishlist";
// import { selectAllWishlistItems } from "slices/wishlists.slice";

function Logo() {
  return (
    <Link to="/" className="block w-40">
      {/* <img src="/images/svg/logo.svg" alt="my logo" className="w-full" /> */}
      <img src="/images/my-logo.png" alt="my logo" className="w-full" />
    </Link>
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

function SingleIcon({
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
      {badgeValue !== undefined && badgeValue > 0 && (
        <span
          className={classNames(
            "absolute -right-0 -top-1 w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs",
            badgeRight
          )}
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

function HeaderIcons() {
  const user = useAppSelector((state) => state.auth.user);
  const cartItems = useAppSelector((state) => state.cart.data?.items);
  const { items } = useWishlist();

  /*
  const totalQuantitiesInCart = useMemo(
    () => cartItems && cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );
  */

  return (
    <div className="flex items-center space-x-4">
      <SingleIcon
        href="/account/wishlist"
        icon="far fa-heart"
        label="Wish List"
        badgeValue={items?.length}
      />
      <SingleIcon
        href="/cart"
        icon="fas fa-shopping-bag"
        label="Cart"
        badgeValue={cartItems?.length}
        badgeRight="-right-3"
      />
      <SingleIcon
        href={user ? "/account/summary" : "/login"}
        icon="far fa-user"
        label={user ? "Account" : "Login"}
      />
    </div>
  );
}

export default function Header() {
  return (
    <header className="py-4 shadow-sm bg-white">
      <section className="container flex items-center justify-between">
        <Logo />
        <SearchBar />
        <HeaderIcons />
      </section>
    </header>
  );
}
