export default function PriceFilter() {
  return (
    <div className="pt-4">
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Price
      </h3>
      <div className="mt-4 flex items-center">
        <input
          type="number"
          className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
          placeholder="Min Price"
        />
        <span className="mx-3 text-gray-500">-</span>
        <input
          type="number"
          className="w-full border-gray-300 focus:ring-0 focus:border-primary px-3 py-1 text-gray-600 text-sm shadow-sm rounded"
          placeholder="Max Price"
        />
      </div>
    </div>
  );
}
