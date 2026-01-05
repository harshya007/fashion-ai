import React, { useState } from "react";
import { API_URL } from "../api";

export default function Recommend() {
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");
  const [items, setItems] = useState<string[]>([]);
  const [result, setResult] = useState("");

  const getSuggestions = async () => {
    const res = await fetch(`${API_URL}/api/recommend`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items, occasion, weather }),
    });

    const data = await res.json();
    setResult(data.recommendations);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-3">Outfit Suggestions</h1>

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Occasion (party, office, date...)"
        value={occasion}
        onChange={(e) => setOccasion(e.target.value)}
      />

      <input
        className="border p-2 mb-2 w-full"
        placeholder="Weather (cold, hot, rainy...)"
        value={weather}
        onChange={(e) => setWeather(e.target.value)}
      />

      <button
        onClick={getSuggestions}
        className="bg-black text-white p-2 rounded-lg"
      >
        Get Outfit Suggestions
      </button>

      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}
