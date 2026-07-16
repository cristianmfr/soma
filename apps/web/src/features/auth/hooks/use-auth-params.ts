import { parseAsString, useQueryStates } from "nuqs";

export function useAuthParams() {
  const [params, setParams] = useQueryStates({
    token: parseAsString,
  });

  return {
    ...params,
    setParams,
  };
}
