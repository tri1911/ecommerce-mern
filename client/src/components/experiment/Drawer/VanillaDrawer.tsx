import cn from "classnames";
import { useState } from "react";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="bg-black bg-opacity-20 rounded-md px-4 py-2 text-sm text-white font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Open Drawer
      </button>

      <main
        className={cn(
          "fixed inset-0 z-10 overflow-hidden bg-gray-900/25 transform ease-in-out",
          isOpen
            ? "transition-opacity opacity-100 duration-500 translate-x-0"
            : "transition-all delay-500 opacity-0 translate-x-full"
        )}
      >
        <section
          className={cn(
            "absolute right-0 w-screen max-w-lg bg-white h-full shadow-xl delay-[400ms] duration-500 ease-in-out transition-all transform",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <article
            className={cn(
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
    </div>
  );
}
