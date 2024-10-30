import { useQuery } from "urql";
import { categoriesCmp } from "../queries";

export function useCategories() {
  const [result] = useQuery({ query: categoriesCmp });
  return result;
}
