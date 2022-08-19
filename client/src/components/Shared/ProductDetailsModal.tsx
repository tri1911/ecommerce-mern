import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import ProductImage from "pages/products/ProductDetailsPage/ProductImage";
import ProductContent from "pages/products/ProductDetailsPage/ProductContent";
import { Fn } from "types";
import type { Product } from "services/product.service";

export default function ProductDetailsModal({
  product,
  isQuickViewOpen,
  closeQuickView,
}: {
  product: Product;
  isQuickViewOpen: boolean;
  closeQuickView: Fn<[], void>;
}) {
  return (
    <Transition appear show={isQuickViewOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeQuickView}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-50"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl translate-all relative">
                <section className="container pt-4 grid lg:grid-cols-2 gap-6">
                  <ProductImage />
                  <ProductContent product={product} />
                </section>

                <button
                  className="absolute top-2 right-2 text-primary hover:text-primary/75 transition"
                  onClick={closeQuickView}
                >
                  <XCircleIcon className="w-7 h-7" />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
