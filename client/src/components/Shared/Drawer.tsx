import classNames from "classnames";
import React from "react";
import { Fn } from "../../types";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: Fn<[boolean], void>;
};

export default function Drawer({ children, isOpen, setIsOpen }: Props) {
  return (
    <main
      className={classNames(
        "fixed overflow-hidden z-10 bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out",
        isOpen
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-all delay-500 opacity-0 translate-x-full"
      )}
    >
      <section
        className={classNames(
          "w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-[400ms] duration-500 ease-in-out transition-all transform",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <article
          className={classNames(
            "relative w-screen max-w-lg pb-10 flex flex-col space-y-6 overflow-y-scroll h-full"
          )}
        >
          <header className="p-4 font-bold text-lg">Shopping Cart</header>
          {children}
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => setIsOpen(false)}
      />
    </main>
  );
}
