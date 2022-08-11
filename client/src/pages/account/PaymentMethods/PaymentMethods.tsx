import { Link } from "react-router-dom";

function SingleMethod() {
  return (
    <div className="bg-white rounded-sm shadow-md py-4 px-3 flex justify-between flex-wrap">
      <div className="flex justify-between shrink-0 w-full md:w-fit">
        <div className="flex">
          <div className="w-14 h-14 rounded overflow-hidden">
            <img
              src="/images/payments/a-express.png"
              alt="payment thumbnail"
              className="w-full pt-1 object-contain"
            />
          </div>
          <div className="ml-3">
            <h5 className="text-base text-gray-900 font-medium">Method</h5>
            <p className="text-sm text-gray-800">American Express</p>
          </div>
        </div>
        <div className="space-y-1 md:hidden">
          <Link
            to="details"
            className="block text-xs w-full focus:outline-none hover:underline hover:text-blue-500"
          >
            Edit
          </Link>
          <button className="block text-xs w-full focus:outline-none hover:underline hover:text-blue-500">
            Delete
          </button>
        </div>
      </div>
      <div>
        <h5 className="text-base text-gray-900 font-medium">Last Four</h5>
        <p className="text-sm text-gray-800">1234</p>
      </div>
      <div>
        <h5 className="text-base text-gray-900 font-medium">Expires</h5>
        <p className="text-sm text-gray-800">01/22</p>
      </div>
      <div>
        <h5 className="text-base text-gray-900 font-medium">Default</h5>
        <p className="text-sm text-gray-800">Yes</p>
      </div>
      <div className="hidden md:flex md:items-center md:space-x-3">
        <Link
          to="details"
          className="default-btn-secondary w-full block px-3 py-2 text-sm"
        >
          Edit
        </Link>
        <button className="default-btn-secondary w-full block px-3 py-2 text-sm">
          Delete
        </button>
      </div>
    </div>
  );
}

export default function PaymentMethods() {
  return (
    <div className="space-y-6">
      <SingleMethod />
      <SingleMethod />
    </div>
  );
}
