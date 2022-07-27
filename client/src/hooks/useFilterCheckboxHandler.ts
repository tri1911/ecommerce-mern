import { useSearchParams } from "react-router-dom";

const useFilterCheckboxHandler = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // make the filter checkbox to be additive (clicking on `cat1` and then `cat2` adds both)
  const handleCheckboxChanged: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    const { name, value, checked } = event.target;

    if (checked) {
      searchParams.append(name, value);
      setSearchParams(searchParams);
    } else {
      // de-select
      const newParams = new URLSearchParams(
        Array.from(searchParams).filter(([k, v]) => k !== name || v !== value)
      );
      setSearchParams(newParams);
    }
  };

  return handleCheckboxChanged;
};

export default useFilterCheckboxHandler;
