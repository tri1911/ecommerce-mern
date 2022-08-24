import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "hooks";
import { usePopper } from "react-popper";
import { Popover } from "@headlessui/react";
import {
  IdentificationIcon,
  GiftIcon,
  HeartIcon,
  ShoppingCartIcon,
  ArrowLeftIcon,
} from "@heroicons/react/outline";

export default function AccountIcon() {
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);
  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "bottom-end",
    modifiers: [
      { name: "arrow", options: { element: arrowElement } },
      {
        name: "offset",
        options: {
          offset: [0, 10],
        },
      },
    ],
  });

  const user = useAppSelector((state) => state.auth.user);

  return (
    <Popover>
      <Popover.Button
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        ref={setReferenceElement}
      >
        <div className="relative text-center text-gray-700 hover:text-primary transition">
          <div className="text-2xl">
            <i className="far fa-user" />
          </div>
          <div className="text-xs leading-3">Account</div>
        </div>
      </Popover.Button>
      <Popover.Panel
        className="z-10 shadow-xl rounded-md border"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        {/* PopOver Arrow */}
        <div
          className="absolute -top-[6px] w-3 h-3 invisible before:absolute before:w-3 before:h-3 before:bg-white before:visible before:rotate-45 before:border-t before:border-l"
          ref={setArrowElement}
          style={styles.arrow}
        />
        {/* PopOver Content */}
        <div className="px-4 py-3 space-y-4 bg-white rounded-md w-48">
          <h3 className="text-gray-800 font-medium">
            Hello,{" "}
            <span className="uppercase truncate">
              {user?.name ?? "unknown"}
            </span>
          </h3>
          {!user ? (
            <div className="flex space-x-2">
              <Link
                to="/register"
                className="px-3 py-2 bg-primary rounded text-white uppercase font-medium text-sm font-roboto border border-primary hover:bg-white hover:text-primary transition"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="px-3 py-2 bg-white rounded text-primary uppercase font-medium text-sm font-roboto border border-primary hover:bg-primary hover:text-white transition"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              <Popover.Button
                as={Link}
                to="/account/summary"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <IdentificationIcon className="w-5 h-5" />
                <span className="">My Account</span>
              </Popover.Button>
              <Popover.Button
                as={Link}
                to="/account/orders"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <GiftIcon className="w-5 h-5" />
                <span className="">My Order</span>
              </Popover.Button>
              <Popover.Button
                as={Link}
                to="/account/wishlist"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <HeartIcon className="w-5 h-5" />
                <span className="">My Wishlist</span>
              </Popover.Button>
              <Popover.Button
                as={Link}
                to="/cart"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <ShoppingCartIcon className="w-5 h-5" />
                <span className="">My Cart</span>
              </Popover.Button>
              <Popover.Button
                as={Link}
                to="#"
                className="flex items-center space-x-2 hover:text-primary"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span className="">Sign Out</span>
              </Popover.Button>
            </div>
          )}
        </div>
      </Popover.Panel>
    </Popover>
  );
}
