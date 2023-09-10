import { MutableRefObject, SetStateAction, useEffect, useState } from "react";

export default function PageButton({
  buttonName,
  maxPageIndex,
  currentPageIndex,
  setPageToken,
  pageDiff,
}: {
  buttonName: string;
  maxPageIndex: MutableRefObject<number>;
  currentPageIndex: MutableRefObject<number>;
  setPageToken: React.Dispatch<React.SetStateAction<string | null>>;
  pageDiff: number;
}) {
    
  const handleClick = async (
    num: number,
    url: string) => {
    if (num == 1) {
      currentPageIndex.current = 1;
      setPageToken(null);
      return;
    }
    if (typeof caches === 'undefined') return false;
    const cacheName: string = "page" + num;

    const cacheStorage = await caches.open(cacheName);
    const cachedResponse = await cacheStorage.match(url);

    if (!cachedResponse || !cachedResponse.ok) {
      console.log("page" + num + " from cache does not exist!");
    }
    
    if (cachedResponse && cachedResponse.ok) {
      return cachedResponse.json().then((item) => {
        setPageToken(item);
        currentPageIndex.current = currentPageIndex.current + pageDiff;
      });
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        disabled={currentPageIndex.current + pageDiff == 0 || currentPageIndex.current == maxPageIndex.current}
        onClick={() => handleClick(currentPageIndex.current + pageDiff, "http://localhost:3000")}>
        {buttonName}
      </button>
    </>
  );
}
