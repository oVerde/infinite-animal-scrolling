import { useState, useEffect } from "react";
import { useQuery } from "urql";
import { gifRetrieve } from "../queries";

export function useGifs(category, page, refreshKey) {
  const [list, setList] = useState([]);
  const [result, reexecuteQuery] = useQuery({
    query: gifRetrieve,
    variables: { category },
    pause: true,
    requestPolicy: "network-only",
  });

  const { data, fetching, error } = result;

  useEffect(() => {
    setList([]);
    reexecuteQuery();
  }, [refreshKey]);

  useEffect(() => {
    reexecuteQuery();
  }, [category, page]);

  useEffect(() => {
    if (data) {
      setList((prevList) => {
        const existingIds = new Set(prevList.map((item) => item.id));
        const newItems = data.get_random_gifs.filter(
          (item) => !existingIds.has(item.id),
        );
        return page === 0 ? newItems : [...prevList, ...newItems];
      });
    }
  }, [data]);

  return { list, fetching, error };
}
