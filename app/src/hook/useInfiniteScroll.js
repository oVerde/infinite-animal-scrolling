import { useEffect } from "react";
import { debounce } from "../utils";

export function useInfiniteScroll(callback, fetching) {
  useEffect(() => {
    const handleScroll = debounce(() => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 200 && !fetching) {
        callback();
      }
    }, 100);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [callback, fetching]);
}
