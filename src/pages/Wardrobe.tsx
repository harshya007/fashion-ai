import React, { useEffect, useState } from "react";
import { uploadWardrobeItem, getWardrobe } from "../services/api";

interface WardrobeItem {
  id?: string;
  url: string;
}

export default function Wardrobe() {
  const [items, setItems] = useState<WardrobeItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // 🔹 Load wardrobe on page open
  useEffect(() => {
    loadWardrobe();
  }, []);

  const loadWardrobe = async () => {
    try {
      const data = await getWardrobe();
      setItems(data);
    } catch (error) {
      console.error("Failed to load wardrobe", error);
    } finally {
      setPageLoading(false);
    }
  };

  // 🔹 Upload new item
  const uploadImage = async (file: File) => {
    setLoading(true);
    try {
      const data = await uploadWardrobeItem(file);
      setItems((prev) => [...prev, data]);
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-12 px-6">
      <h1 className="text-3xl font-bold text-center mb-10">My Wardrobe</h1>

      {/* Upload Section */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl p-6 mb-12 text-center">
        <h2 className="text-lg font-semibold mb-3">Add Clothing Item</h2>

        <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-black transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
          />

          {loading ? (
            <span className="font-medium text-gray-600">Uploading...</span>
          ) : (
            <>
              <p className="font-medium">Click to upload</p>
              <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
            </>
          )}
        </label>
      </div>

      {/* Wardrobe Grid */}
      {pageLoading ? (
        <p className="text-center text-gray-500">Loading wardrobe...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500">
          Your wardrobe is empty. Start adding items ✨
        </p>
      ) : (
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-6">Your Collection</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {items.map((item, i) => (
              <div
                key={item.id || i}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={item.url}
                  alt="Wardrobe item"
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
