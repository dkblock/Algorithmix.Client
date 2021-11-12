import { useMemo } from "react";
import { useLocation } from "react-router";
import qs from "qs";

const useQueryParams = () => {
  const { search } = useLocation();
  return useMemo(() => qs.parse(search.substring(1)), [search]);
};

export default useQueryParams;
