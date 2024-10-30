import { useState } from "react";
import { createClient, Provider } from "urql";
import LazyImage from "./components/LazyImage";
import { useCategories } from "./hook/useCategories";
import { useGifCount } from "./hook/useGifCount";
import { useInfiniteScroll } from "./hook/useInfiniteScroll";
import { useGifs } from "./hook/useGifs";
import { capitalizeFirstLetter } from "./utils";

let client = createClient({
  url: "http://localhost:8080/v1/graphql",
});

function App() {
  return (
    <Provider value={client}>
      <div style={{ margin: 24 }}>
        <SampleQuery />
      </div>
    </Provider>
  );
}

export default App;

function SampleQuery() {
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const { data: categList } = useCategories();
  const { data: countData } = useGifCount(category);
  const { list, fetching, error } = useGifs(category, page, refreshKey);

  useInfiniteScroll(() => setPage((prev) => prev + 1), fetching);

  const handleCategChange = (e) => {
    setCategory(e.target.value);
    setPage(0);
  };

  // console.log({ countData });
  // console.log(list);
  // console.log({ gifsData });
  // console.log({ gifsError });
  // console.log(category);
  // console.log(page);

  return (
    <>
      <header>
        <h1>Animal Scroller</h1>
      </header>
      <nav>
        <select
          type="text"
          className="flex p-3 text-lg"
          autoFocus={true}
          placeholder="write a category, like 'cat'"
          value={category}
          onChange={handleCategChange}
        >
          <option value="">All</option>
          {categList?.gifs_aggregate.nodes.map((item) => (
            <option key={item.category} value={item.category}>
              {capitalizeFirstLetter(item.category)}
            </option>
          ))}
        </select>
        <button
          onClick={() => {
            setPage(0);
            setRefreshKey((prev) => prev + 1);
          }}
          className="text-lg"
          title="reload"
        >
          🔁
        </button>
        <span className="text-[--palette-3]">
          {!!category && countData?.gifs_aggregate.aggregate.count}
        </span>
      </nav>
      <main>
        {list.map((gif) => (
          <LazyImage
            key={gif.id}
            alt={gif.category}
            id={gif.id}
            title={gif.id}
            src={gif.url}
          />
        ))}
      </main>
      {!!fetching && (
        <div className="mt-5 text-center">
          More {!!category ? `${category}s` : "animals"} incoming...
        </div>
      )}
      {!!error && <div>Failed to load 😿</div>}
    </>
  );
}
