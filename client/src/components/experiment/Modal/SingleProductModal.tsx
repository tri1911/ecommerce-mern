// import { Dialog, Transition } from "@headlessui/react";
// import { XCircleIcon } from "@heroicons/react/solid";
// import { Fragment, useState } from "react";
// import { products } from "../../../data/products";
// import ProductContent from "../../../pages/SingleProductPage/ProductContent";
// import ProductImage from "../../../pages/SingleProductPage/ProductImage";

// export default function SingleProductModal() {
//   const [isOpen, setIsOpen] = useState(false);

//   function closeModal() {
//     setIsOpen(false);
//   }

//   function openModal() {
//     setIsOpen(true);
//   }

//   const product = products[0];

//   return (
//     <>
//       <div className="fixed inset-0 flex items-center justify-center">
//         <button
//           type="button"
//           onClick={openModal}
//           className="bg-black bg-opacity-20 rounded-md px-4 py-2 text-sm text-white font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
//         >
//           Quick View
//         </button>

//         <Transition appear show={isOpen} as={Fragment}>
//           <Dialog as="div" className="relative z-10" onClose={closeModal}>
//             <Transition.Child
//               as={Fragment}
//               enter="ease-out duration-300"
//               enterFrom="opacity-0"
//               enterTo="opacity-100"
//               leave="ease-in duration-200"
//               leaveFrom="opacity-100"
//               leaveTo="opacity-0"
//             >
//               <div className="fixed inset-0 bg-black/25" />
//             </Transition.Child>

//             <div className="fixed inset-0 overflow-y-auto">
//               <div className="flex min-h-full items-center justify-center p-4 text-center">
//                 <Transition.Child
//                   as={Fragment}
//                   enter="ease-out duration-300"
//                   enterFrom="opacity-0 scale-50"
//                   enterTo="opacity-100 scale-100"
//                   leave="ease-in duration-200"
//                   leaveFrom="opacity-100 scale-100"
//                   leaveTo="opacity-0 scale-95"
//                 >
//                   <Dialog.Panel className="w-full max-w-5xl transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl translate-all relative">
//                     <section className="container pt-4 grid lg:grid-cols-2 gap-6">
//                       <ProductImage />
//                       <ProductContent product={product} />
//                     </section>

//                     <button
//                       className="absolute top-2 right-2 text-primary hover:text-primary/75 transition"
//                       onClick={closeModal}
//                     >
//                       <XCircleIcon className="w-7 h-7" />
//                     </button>
//                   </Dialog.Panel>
//                 </Transition.Child>
//               </div>
//             </div>
//           </Dialog>
//         </Transition>
//       </div>
//     </>
//   );
// }

export default function SingleProductModal() {
  return null;
}
