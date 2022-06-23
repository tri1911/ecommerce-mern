// TODO: change to dynamically render options
export default function ProductSorter() {
  return (
    <select className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary">
      <option>Default sorting</option>
      <option>Price low-high</option>
      <option>Price high-low</option>
      <option>Latest product</option>
    </select>
  );
}
