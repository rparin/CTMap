import React from "react";

type pInfo = {
  title: string;
  details: string;
};

export default function MPopup(info: pInfo) {
  return (
    <div>
      <h3>{info.title}</h3>
      <p>{info.details}</p>
    </div>
  );
}
