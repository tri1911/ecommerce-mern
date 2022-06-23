export default function ProductsDisplayControl() {
  return (
    <div className="flex gap-2 ml-auto">
      <div className="border border-primary w-10 h-9 flex items-center justify-center text-white bg-primary rounded cursor-pointer">
        <i className="fas fa-th" />
      </div>
      <div className="border border-gray-300 w-10 h-9 flex items-center justify-center text-gray-600 rounded cursor-pointer">
        <i className="fas fa-list" />
      </div>
    </div>
  );
}
