"use client";

import { useState } from "react";
import { SearchItem } from "../const/Interfaces";

export default function Home() {
  const [userdata, setUserdata] = useState<object>({
    hotelid: 0,
    distance: 0,
    price: 0,
    rating: 0,
  });
  const [postData, setPostData] = useState<SearchItem[] | null>(null);

  const handleSearch = async () => {
    console.log(userdata);
    const res = await fetch("/api/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    }).then((x) => x.json());
    console.log(res);
  };

  const handleTrigger = async () => {
    const res = await fetch("/api/trigger").then((x) => x.json());
    console.log(res);
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-3">
      <h1 className="text-4xl">Search Alternative Hotels for Misstourist</h1>
      <textarea
        className="w-full h-64 p-4 border border-gray-300 rounded text-black"
        placeholder="Enter your search query"
        value={JSON.stringify(userdata, null, 2)}
        onChange={(e) => {
          setUserdata(JSON.parse(e.target.value));
        }}
      ></textarea>
      <button
        className="w-full py-2 bg-blue-500 text-white rounded"
        onClick={handleSearch}
      >
        Search (POST request)
      </button>

      <button
        className="mt-8 w-full py-2 bg-green-800 text-white rounded"
        onClick={handleTrigger}
      >
        Manual Trigger
      </button>
    </main>
  );
}
