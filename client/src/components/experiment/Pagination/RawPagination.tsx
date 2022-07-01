import { ArrowRightIcon } from "@heroicons/react/solid";
import cn from "classnames";

function PaginationItem({ page, active }: { page: number; active?: boolean }) {
  return (
    <div
      className={cn(
        {
          "w-8 h-8 mx-1 text-base leading-8 text-white text-center cursor-pointer border bg-primary border-primary transition":
            active,
        },
        {
          "w-8 h-8 mx-2 text-base leading-8 text-gray-700 text-center cursor-pointer border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition":
            !active,
        }
      )}
    >
      {page}
    </div>
  );
}

export default function RawPagination() {
  return (
    <div className="flex items-center justify-center mt-6">
      <PaginationItem page={1} active />
      <PaginationItem page={2} />
      <PaginationItem page={3} />
      <div className="flex items-center justify-center w-8 h-8 mx-2 text-base leading-8 text-gray-700 cursor-pointer border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition">
        <ArrowRightIcon className=" w-4 h-4" />
      </div>
    </div>
  );
}
