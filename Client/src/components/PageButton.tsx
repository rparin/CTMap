import { SetStateAction, useEffect, useState } from "react";

export default function PageButton({
  buttonName,
  pageToken,
}: {
  buttonName: string;
  pageToken: string;
}) {
    
  useEffect(() => {

  });

  return (
    <>
      <button
        className="bg-blue-500 m-1 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {buttonName}
      </button>
    </>
  );
}
