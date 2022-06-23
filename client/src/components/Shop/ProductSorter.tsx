import { useSearchParams } from "react-router-dom";
import { SORT_OPTIONS } from "../../types";

export default function ProductSorter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSorterChanged: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { name, value } = event.target;

    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return (
    <select
      className="w-44 text-sm text-gray-600 px-4 py-3 border-gray-300 shadow-sm rounded focus:ring-primary focus:border-primary"
      name="sort"
      value={searchParams.get("sort") ?? "default"}
      onChange={handleSorterChanged}
    >
      {Object.entries(SORT_OPTIONS).map(([key, { name }]) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </select>
  );
}
