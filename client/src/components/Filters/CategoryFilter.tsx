import { Category } from "../../types";

export function FilterItem({
  name,
  quantity,
}: {
  name: string;
  quantity: number;
}) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name}
        className="text-primary focus:ring-0 rounded-sm cursor-pointer"
      />
      <label htmlFor={name} className="text-gray-600 ml-3 cursor-pointer">
        {name}
      </label>
      <div className="ml-auto text-gray-600 text-sm">({quantity})</div>
    </div>
  );
}

function CloseFilterButton() {
  return (
    <div className="lg:hidden text-gray-400 hover:text-primary text-lg absolute right-0 top-0 cursor-pointer">
      <i className="fas fa-times" />
    </div>
  );
}

export default function CategoryFilter({ items }: { items: Category[] }) {
  return (
    <div className="relative">
      <CloseFilterButton />
      <h3 className="text-xl text-gray-800 mb-3 uppercase font-medium">
        Categories
      </h3>
      <div className="space-y-2">
        {items.map(({ name, quantity }) => (
          <FilterItem key={name} name={name} quantity={quantity} />
        ))}
      </div>
    </div>
  );
}
