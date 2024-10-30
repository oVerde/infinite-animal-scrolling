import { useQuery } from "urql";
import { countQuery } from "../queries";

export function useGifCount(category) {
  const [result] = useQuery({
    query: countQuery,
    variables: { category },
  });
  return result;
}
