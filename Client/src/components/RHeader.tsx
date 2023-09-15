import React from "react";

type rInfo = {
  hr: string;
  info: string;
};

export default function RHeader(info: rInfo) {
  return (
    <div>
      {info.info && (
        <>
          <p className="text-sky-500 font-bold text-xs border-b-2 border-solid border-x-2 border-transparent border-b-sky-600/20">
            {info.hr}
          </p>
          <p className="line-clamp-2 text-black">{info.info}</p>
        </>
      )}
    </div>
  );
}
