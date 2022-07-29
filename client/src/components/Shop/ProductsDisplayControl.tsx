import classNames from "classnames";
import { ViewGridIcon } from "@heroicons/react/solid";
import { ShopDisplayMode } from "../../types";

// NOTE: use either font-awesome or heroicons
const ProductsDisplayControl = ({
  displayMode,
  setDisplayMode,
}: {
  displayMode: ShopDisplayMode;
  setDisplayMode: (mode: "grid" | "list") => void;
}) => (
  <div className="flex gap-2 ml-auto">
    <div
      className={classNames(
        "flex items-center justify-center w-10 h-9 p-1 border border-primary rounded cursor-pointer",
        displayMode === "grid"
          ? "bg-primary text-white"
          : "bg-transparent text-primary"
      )}
      onClick={() => setDisplayMode("grid")}
    >
      <ViewGridIcon className="w-5 h-5" />
    </div>
    <div
      className={classNames(
        "flex items-center justify-center w-10 h-9 p-1 border border-primary rounded cursor-pointer",
        displayMode === "list"
          ? "bg-primary text-white"
          : "bg-transparent text-primary"
      )}
      onClick={() => setDisplayMode("list")}
    >
      {/* <ViewListIcon className="w-5 h-5" /> */}
      <i className="fas fa-list" />
    </div>
  </div>
);

export default ProductsDisplayControl;
