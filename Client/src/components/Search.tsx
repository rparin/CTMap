"use client";
import { SetStateAction, useState } from "react";

export default function Search() {
  //API Endpoints
  const ct_search_ep = "http://localhost:8080/api/ct/studies";

  //Search Entry
  const [searchValue, setSearch] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  // call ct-api to get search results on button click or enter key
  const handleClick = async () => {
    fetch(ct_search_ep + "/" + searchValue).then((res) =>
      res.json().then((data) => {
        console.log(data.searchResult);
      })
    );
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

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
