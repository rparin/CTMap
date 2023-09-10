import { MutableRefObject, SetStateAction, useEffect, useState } from "react";

export default function PageButton({
  buttonName,
  pageTokens,       // is only read here
  maxPageIndex,
  currentPageIndex,
  setPageToken,
  pageDiff,
}: {
  buttonName: string;
  pageTokens: MutableRefObject<string[]>;
  maxPageIndex: MutableRefObject<number>;
  currentPageIndex: MutableRefObject<number>;
  setPageToken: React.Dispatch<React.SetStateAction<string | null>>;
  pageDiff: number;
}) {
    
  const handleClick = async (
    num: number) => {
    if (num == 1) {
      currentPageIndex.current = 1;
      setPageToken(null);
      return;
    }
    if (pageTokens.current != null) {
      let newPageToken: string = pageTokens.current[num - 2];
      if (newPageToken != null) {
        setPageToken(pageTokens.current[num - 2]);
        currentPageIndex.current = num;
      }
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={currentPageIndex.current + pageDiff == 0 || currentPageIndex.current == maxPageIndex.current}
        onClick={() => handleClick(currentPageIndex.current + pageDiff)}>
        {buttonName}
      </button>
    </>
  );
}
