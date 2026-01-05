import React, { useState } from "react";
import { tryOn } from "../services/api";

export default function TryOn() {
  const [person, setPerson] = useState<File | null>(null);
  const [cloth, setCloth] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateTryOn = async () => {
    if (!person || !cloth) return alert("Please upload both images!");
    setLoading(true);

    try {
      const res = await tryOn(person, cloth);
      setResult(res);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Virtual Try-On</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Person Upload Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">Upload Your Photo</h2>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && setPerson(e.target.files[0])}
            />
            <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition">
              {person ? (
                <img
                  src={URL.createObjectURL(person)}
                  alt="Person"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span>Click to Upload</span>
              )}
            </div>
          </label>
        </div>

        {/* Clothing Upload Card */}
        <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-lg font-semibold mb-4">Upload Clothing Item</h2>
          <label className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && setCloth(e.target.files[0])}
            />
            <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 hover:bg-gray-200 transition">
              {cloth ? (
                <img
                  src={URL.createObjectURL(cloth)}
                  alt="Cloth"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span>Click to Upload</span>
              )}
            </div>
          </label>
        </div>
      </div>

      <button
        onClick={generateTryOn}
        className={`mt-8 px-8 py-3 bg-black text-white font-semibold rounded-full shadow-lg hover:bg-gray-900 transition-colors duration-300 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Try-On"}
      </button>

      {result && (
        <div className="mt-12 w-full max-w-2xl flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Your Try-On Result</h2>
          <img
            src={result}
            alt="Try-On Result"
            className="rounded-2xl shadow-2xl w-full object-cover"
          />
        </div>
      )}
    </div>
  );
}
