import {
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export default function Search({
  setResult,
  filterValue,
  pageTokens, // is modified here
  maxPageIndex,
  currentPageIndex,
  currentPageToken,
  setLoader,
  pageSize,
}: {
  setResult: React.Dispatch<React.SetStateAction<string>>;
  filterValue: {} | null;
  pageTokens: MutableRefObject<string[]>;
  maxPageIndex: MutableRefObject<number>;
  currentPageIndex: MutableRefObject<number>;
  currentPageToken: string | null;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
  pageSize: string;
}) {
  //API Endpoints
  const ct_search_ep = "http://localhost:8080/api/ct/studies";

  //Search Entry
  const [searchValue, setSearch] = useState("");
  const [prevValue, setPrev] = useState("");
  const [prevPageSize, setPrevPageSize] = useState("1");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  // call ct-api to get search results on button click or enter key
  const handleClick = () => {
    if (searchValue == "") return;
    if (prevValue != searchValue || prevPageSize != pageSize) {
      // reset page count and clear page tokens
      currentPageIndex.current = 1;
      maxPageIndex.current = 1;
      pageTokens.current = [];

      callSearchAPI();
    }
    setPrev(searchValue);
    setPrevPageSize(pageSize);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const callSearchAPI = async () => {
    setLoader(true);
    fetch(
      `${ct_search_ep}/${searchValue}/${filterValue}/${currentPageToken}/${pageSize}`
    ).then((res) =>
      res.json().then((data) => {
        setResult(data.searchResult);
        // if there is no nextPageToken and if we are at the current max page (aka highest page user as visited)
        // this will help avoid adding to page tokens when unnecessary
        if (
          data.nextPageToken != null &&
          currentPageIndex.current + 1 > maxPageIndex.current
        ) {
          pageTokens.current?.push(data.nextPageToken);
          maxPageIndex.current = currentPageIndex.current + 1;
        }
        setLoader(false);
      })
    );
  };

  // when apply new filters, will restart at first page
  useEffect(() => {
    if (searchValue == "") return;
    currentPageIndex.current = 1;
    maxPageIndex.current = 1;
    pageTokens.current = [];
    setPrevPageSize(pageSize);

    callSearchAPI();
  }, [filterValue, pageSize]);

  // when currentPagetoken is changed, that means we are simply traversing thru pages
  useEffect(() => {
    if (searchValue == "") return;
    callSearchAPI();
  }, [currentPageToken]);

  return (
    <>
      <input
        className="text-gray-950 w-72 px-3"
        type="text"
        placeholder="Search for a condition or disease"
        onChange={handleChange}
        value={searchValue}
        onKeyDown={handleKeyDown}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}>
        Search
      </button>
    </>
  );
}
