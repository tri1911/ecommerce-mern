import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

// util function to generate a range of string numbers [from, to]
const getRange = (first: number, last: number) => {
  return Array.from({ length: last - first + 1 }, (_, index) => first + index);
};

const usePagination = ({
  pages,
  siblingsCount = 1,
}: {
  pages: number;
  siblingsCount?: number;
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.has("page")
    ? Number(searchParams.get("page"))
    : 1;

  const onPageChanged = (newPage: number) => {
    searchParams.set("page", String(newPage));
    setSearchParams(searchParams);
  };

  const indices = useMemo(() => {
    const firstPage = 1;
    const lastPage = pages;

    // max # of items to render = first + last + current + 2 * siblingCount + 2 * dots
    const maxItems = 5 + 2 * siblingsCount;

    let result = Array<number | "...">();

    // if the total pages is small, then just render [1...totalPages]
    if (pages <= maxItems) {
      result = getRange(firstPage, lastPage);
    } else {
      // compute limit indices of the middle part
      const middleFirst = Math.max(currentPage - siblingsCount, firstPage);
      const middleLast = Math.min(currentPage + siblingsCount, lastPage);
      // determine whether should present dots
      // e.g. only show the dots on the left-side if there exists "more" than one item between `middleFirst` and `first` items
      const showLeftDots = middleFirst > 3; // 1...[4, `5`, 6]
      const showRightDots = middleLast < pages - 2; // [4, `5`, 6]...9

      if (!showLeftDots && showRightDots) {
        result = [...getRange(1, 3 + 2 * siblingsCount), "...", lastPage];
      } else if (showLeftDots && !showRightDots) {
        result = [
          firstPage,
          "...",
          ...getRange(lastPage - (3 + 2 * siblingsCount) + 1, lastPage),
        ];
      } else {
        result = [
          firstPage,
          "...",
          ...getRange(middleFirst, middleLast),
          "...",
          lastPage,
        ];
      }
    }

    return result;
  }, [currentPage, pages, siblingsCount]);

  return { currentPage, onPageChanged, indices };
};

export default usePagination;
