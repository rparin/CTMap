"use client";

import React, { useEffect, useState } from "react";

export default function Results() {
  const [message, setMessage] = useState("Server not loaded");

  useEffect(() => {
    fetch("http://localhost:8080/api/home").then((res) =>
      res.json().then((data) => {
        setMessage(data.message);
      })
    );
  }, []);

  return <div className="">{message}</div>;
}
