"use client";
import { SetStateAction, useState } from "react";

export default function Search() {
  const [searchValue, setSearch] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setSearch(event.target.value);
  };

  const handleClick = () => {
    console.log(searchValue);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleClick();
    }
  };

  return (
    <>
      <input
        className="text-gray-950"
        type="text"
        id="message"
        name="message"
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
