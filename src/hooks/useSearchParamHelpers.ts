import { useSearchParams } from "react-router-dom";

export const useSelectParam = (queryParam: string) => {
  const [searchParams] = useSearchParams();

  const paramValue = searchParams.get(queryParam) ?? "";
  return paramValue;
};

export const useRemoveParam = (queryParam: string) => {
  const [searchParams, setSearchParams] = useSearchParams();

  searchParams.delete(queryParam);
  return () => setSearchParams(searchParams);
};
