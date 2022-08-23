import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import usePagination from "hooks/usePagination";

const PageItem = ({
  page,
  active,
  onClick,
}: {
  page: number;
  active: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  // Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
  const activeStyle =
    "z-10 relative inline-flex items-center px-4 py-2 text-sm font-medium border bg-primary text-white border-primary";
  const defaultStyle =
    "relative inline-flex items-center px-4 py-2 bg-white text-gray-500 text-sm font-medium border border-gray-300 hover:bg-gray-50";

  return (
    <button
      aria-current={active && "page"}
      className={active ? activeStyle : defaultStyle}
      onClick={onClick}
    >
      {page}
    </button>
  );
};

const Pagination = ({
  total,
  pageSize,
}: {
  total: number;
  pageSize: number;
}) => {
  const pages = Math.ceil(total / pageSize);
  const { currentPage, onPageChanged, indices } = usePagination({
    pages,
  });

  if (pages <= 1) {
    return null;
  }

  return (
    <div className="__pagination-wrapper bg-white py-3 flex items-center justify-between">
      <div className="__mobile-pagination flex-1 flex justify-between sm:hidden">
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-white"
          onClick={() => onPageChanged(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-white"
          onClick={() => onPageChanged(currentPage + 1)}
          disabled={currentPage === pages}
        >
          Next
        </button>
      </div>
      <div className="__main-pagination hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div className="__current-page-description">
          <p className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {pageSize * (currentPage - 1) + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {currentPage < pages ? pageSize * currentPage : total}
            </span>{" "}
            of <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div className="__page-controls">
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            {/* Previous Page Control Button */}
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-white"
              onClick={() => onPageChanged(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Page Item Buttons */}
            {indices.map((page, idx) => {
              return page === "..." ? (
                <span
                  key={idx}
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"
                >
                  {page}
                </span>
              ) : (
                <PageItem
                  key={idx}
                  page={page}
                  active={page === currentPage}
                  onClick={() => onPageChanged(page)}
                />
              );
            })}
            {/* Next Page Control Button */}
            <button
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-300 disabled:bg-white"
              onClick={() => onPageChanged(currentPage + 1)}
              disabled={currentPage === pages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
