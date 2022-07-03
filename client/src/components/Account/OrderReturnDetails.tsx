import { Link } from "react-router-dom";

export default function OrderReturnDetails() {
  return (
    <div className="shadow rounded px-6 pt-5 pb-7">
      <h4 className="text-lg leading-6 font-medium mb-6">Return Request</h4>
      <div className="flex items-center">
        <div className="mr-12">
          <h5 className="text-base font-medium text-gray-800 mb-1">Sold by</h5>
          <p className="text-sm text-primary">Apple</p>
        </div>
        <div>
          <h5 className="text-base font-medium text-gray-800 mb-1">
            Order Number
          </h5>
          <p className="text-sm text-gray-700">789ER4S324</p>
        </div>
      </div>
      <div className="__order-details flex items-center flex-wrap mt-6">
        <div className="__image w-16 h-16 overflow-hidden">
          <img
            src="/images/products/headphone-3.png"
            alt="product thumbnail"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="w-[calc(100%-64px)] pl-4 md:w-56">
          <h5 className="text-base font-medium mb-1">
            Sound Intone I65 Earphone
          </h5>
          <p className="text-sm">No Warranty Available</p>
        </div>
        <div className="mt-4 ml-0 md:mt-0 md:ml-auto">
          <h5 className="text-base font-medium mb-1">Price</h5>
          <p className="text-sm">$50</p>
        </div>
        <div className="mt-4 ml-auto text-center md:mt-0">
          <h5 className="text-base font-medium mb-1">Quantity</h5>
          <p className="text-sm">1</p>
        </div>
        <div className="ml-auto mt-4 md:mt-0">
          <p className="text-sm mb-1">
            Select A Reason <span className="text-primary text-xs">*</span>
          </p>
          <select className="w-44 h-9 leading-9 border border-gray-200 rounded p-4">
            <option>Select A Reason</option>
            <option>De-active</option>
            <option>Not as advertised</option>
            <option>Wrong/Fake item</option>
            <option>Missing accessories</option>
            <option>Wrong size</option>
            <option>Damaged</option>
          </select>
        </div>
      </div>
      <div className="__return-details mt-8">
        <div className="__payment-method mb-6">
          <h5 className="text-base font-medium mb-2">Payment Method</h5>
          <div className="flex items-center mb-1">
            <input
              type="radio"
              name="payment-method"
              id="payment-method"
              className="border border-primary text-primary focus:ring-0"
            />
            <label
              htmlFor="payment-method"
              className="inline-block pl-2 text-base leading-6 cursor-pointer"
            >
              Refund By Credit Card
            </label>
          </div>
          <p className="text-sm text-gray-800 mb-0 ml-6">
            Money will be return your Credit Card That you used for purchased{" "}
          </p>
        </div>
        <div>
          <h5 className="text-base font-medium mb-2">Select Shipment Option</h5>
          <div className="flex items-center mb-1">
            <input
              type="radio"
              name="courier-pickup"
              id="courier-pickup"
              className="border border-primary text-primary focus:ring-0"
            />
            <label
              htmlFor="courier-pickup"
              className="inline-block pl-2 text-base leading-6 cursor-pointer"
            >
              Courier Pick Up
            </label>
          </div>
          <div className="flex items-center mb-1">
            <input
              type="radio"
              name="drop-off"
              id="drop-off"
              value=""
              className="border border-primary text-primary focus:ring-0"
            />
            <label
              htmlFor="drop-off"
              className="inline-block pl-2 text-base leading-6 cursor-pointer"
            >
              Drop Off
            </label>
          </div>
        </div>
        <div className="__additional-info mt-6 mb-4">
          <label htmlFor="additional-info" className="block mb-2 text-gray-800">
            Additional Information (optional)
          </label>
          <textarea
            name="additional-info"
            id="additional-info"
            placeholder="Example: wrong size"
            className="w-full rounded-sm border border-gray-200 px-3 py-2 placeholder:text-sm focus:outline-none focus:ring-primary/75"
          />
        </div>
        <div className="my-6 flex items-start">
          <input
            type="checkbox"
            name="agreement"
            id="payment-method"
            className="text-primary border border-primary translate-y-1 rounded-sm focus:outline-none focus:ring-offset-2 focus:ring-primary"
          />
          <label
            htmlFor="agreement"
            className="inline-block pl-3 text-base leading-6 cursor-pointer"
          >
            I have Read and accepted the{" "}
            <Link to="#" className="text-primary">
              Return Policy
            </Link>{" "}
            of Apple
          </label>
        </div>
        <div className="w-full">
          <button type="submit" className="default-btn w-fit px-6 py-2 text-sm">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
