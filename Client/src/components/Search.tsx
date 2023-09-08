import { SetStateAction, useEffect, useState } from "react";

export default function Search({
  setResult,
  filterValue,
  setLoader
}: {
  setResult: React.Dispatch<React.SetStateAction<string>>;
  filterValue: {} | null;
  setLoader: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  //API Endpoints
  const ct_search_ep = "http://localhost:8080/api/ct/studies";

  //Search Entry
  const [searchValue, setSearch] = useState("");
  const [prevValue, setPrev] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  // call ct-api to get search results on button click or enter key
  const handleClick = () => {
    if (searchValue == "") return;
    if (prevValue != searchValue) {
      callSearchAPI();
    }
    setPrev(searchValue);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  const callSearchAPI = () => {
    setLoader(true);
    fetch(ct_search_ep + "/" + searchValue + "/" + filterValue).then((res) =>
      res.json().then((data) => {
        setResult(data.searchResult);
        setLoader(false);
      })
    );
  };

  useEffect(() => {
    if (searchValue == "") return;
    callSearchAPI();
  }, [filterValue]);

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

      {/* Todo Location search: Search by address, city, state, or country */}

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}>
        Search
      </button>
    </>
  );
}
