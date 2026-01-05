import React from "react";
import { motion } from "framer-motion";

const MOCK = Array.from({ length: 6 }).map((_, i) => ({
  id: String(i + 1),
  title: ["Smart Casual", "Weekend Street", "Office Formal"][i % 3],
  image: `https://picsum.photos/seed/fashion${i + 1}/600/800`
}));

export default function TrendingGrid() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK.map((m, idx) => (
        <motion.div key={m.id} className="bg-white rounded-2xl overflow-hidden shadow-md" whileHover={{ scale: 1.03 }}>
          <div className="h-56 bg-gray-200">
            <img src={m.image} alt={m.title} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <div className="font-semibold">{m.title}</div>
            <div className="text-sm text-gray-500 mt-1">Popular among users</div>
            <div className="mt-3 flex gap-2">
              <button className="px-3 py-1 rounded-full bg-black text-white text-sm">Use this</button>
              <button className="px-3 py-1 rounded-full border text-sm">Save</button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
