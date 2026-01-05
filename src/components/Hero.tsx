import React from "react";
import { motion } from "framer-motion";
import AnimatedBars from "./AnimatedBars";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const nav = useNavigate();
  return (
    <section className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center">
      <div>
        <motion.h1 initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="text-5xl md:text-6xl font-extrabold leading-tight">
          Look great every day with <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7c3aed] to-[#ec4899]">AI-powered styling</span>
        </motion.h1>

        <motion.p initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.08 }} className="mt-4 text-gray-600 max-w-xl">
          Upload your wardrobe in seconds, get outfit suggestions, plan events and chat with your personal AI stylist.
        </motion.p>

        <div className="mt-8 flex gap-3">
          <button onClick={() => nav("/tryon")} className="px-6 py-3 rounded-full bg-black text-white font-semibold shadow">Try On</button>
          <button onClick={() => nav("/wardrobe")} className="px-6 py-3 rounded-full border">My Wardrobe</button>
        </div>

        <div className="mt-8">
          <AnimatedBars />
        </div>
      </div>

      <motion.div initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.12 }} className="glass rounded-3xl p-6 shadow-lg">
        <div className="h-72 bg-gradient-to-br from-pink-50 via-white to-purple-50 rounded-xl flex items-end justify-between p-6">
          <div>
            <div className="text-sm text-gray-500">Outfit of the Day</div>
            <div className="font-semibold text-xl mt-2">Navy Blazer • White Shirt • Tan Boots</div>
          </div>
          <div className="flex gap-2">
            <div className="w-20 h-28 bg-gray-200 rounded-md" />
            <div className="w-20 h-28 bg-gray-200 rounded-md" />
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">Tap to explore similar looks</div>
      </motion.div>
    </section>
  );
}
