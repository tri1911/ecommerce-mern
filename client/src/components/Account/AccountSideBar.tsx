import React from "react";
import classNames from "classnames";
import { NavLink } from "react-router-dom";

function WelcomeCard({ name }: { name: string }) {
  return (
    <div className="px-4 py-3 shadow flex items-center gap-4">
      <div className="flex-shrink-0">
        <img
          src="/images/avatar.png"
          alt="avatar"
          className="rounded-full w-14 h-14 p-1 border border-gray-200 object-cover"
        />
      </div>
      <div>
        <p className="text-gray-600">Hello, </p>
        <h4 className="text-gray-800 capitalize font-medium">{name}</h4>
      </div>
    </div>
  );
}

function LinksGroupWrapper({
  children,
  isFirstGroup = false,
}: {
  children: React.ReactNode;
  isFirstGroup?: boolean;
}) {
  return (
    <div className={classNames("space-y-1 pl-8", { "pt-4": !isFirstGroup })}>
      {children}
    </div>
  );
}

function MainLink({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: string;
}) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames(
          "relative block text-base font-medium capitalize hover:text-primary transition",
          { "text-primary": isActive }
        )
      }
    >
      <span className="absolute -left-8 top-0 text-base">
        <i className={icon} />
      </span>
      {text}
    </NavLink>
  );
}

function SubLink({ href, text }: { href: string; text: string }) {
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        classNames("block capitalize hover:text-primary transition", {
          "text-primary": isActive,
        })
      }
    >
      {text}
    </NavLink>
  );
}

export default function AccountSideBar() {
  return (
    <>
      <WelcomeCard name="Elliot Ho" />
      <div className="mt-6 bg-white text-gray-600 shadow rounded p-4 divide-y divide-gray-200 space-y-4">
        <LinksGroupWrapper isFirstGroup>
          <MainLink
            href="/account"
            text="Manage Account"
            icon="far fa-address-card"
          />
          <SubLink href="/account/profile" text="Profile Information" />
          <SubLink href="/account/address" text="Manage Address" />
          <SubLink href="/account/password" text="Change Password" />
        </LinksGroupWrapper>
        <LinksGroupWrapper>
          <MainLink
            href="/account/order"
            text="My Order History"
            icon="fas fa-gift"
          />
          <SubLink href="/account/order-return" text="My Returns" />
          <SubLink href="/account/order-cancel" text="My Cancellations" />
          <SubLink href="/account/reviews" text="My Reviews" />
        </LinksGroupWrapper>
        <LinksGroupWrapper>
          <MainLink
            href="/account/payment-method"
            text="Payment methods"
            icon="far fa-credit-card"
          />
          <SubLink href="/account/voucher" text="Voucher" />
        </LinksGroupWrapper>
        <LinksGroupWrapper>
          <MainLink
            href="/account/wishlist"
            text="My Wishlist"
            icon="far fa-heart"
          />
        </LinksGroupWrapper>
        <LinksGroupWrapper>
          <MainLink
            href="/account/logout"
            text="Log Out"
            icon="fas fa-sign-out-alt"
          />
        </LinksGroupWrapper>
      </div>
    </>
  );
}
