import Hero from "../components/Hero";
import AnimatedBars from "../components/AnimatedBars";
import ReviewCard from "../components/ReviewCard";
import TrendingGrid from "../components/TrendingGrid";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="space-y-28">
      <Hero />

      <section className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="w-full lg:w-1/2">
            <h3 className="text-2xl font-semibold mb-3">Why FashionAI?</h3>
            <p className="text-gray-600">
              Beautiful outfit suggestions, personal stylist chat, wardrobe organization,
              and daily outfit picks — powered by AI. Designed to help you look and feel your best.
            </p>

            <div className="mt-6">
              <AnimatedBars count={6} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="w-full lg:w-1/2 glass p-6 rounded-2xl shadow"
          >
            <h4 className="font-semibold mb-2">Outfit of the Day</h4>
            <div className="flex gap-4 items-center">
              <div className="w-28 h-36 bg-gray-200 rounded-lg" />
              <div className="flex-1">
                <div className="font-semibold">Navy Blazer • White Shirt</div>
                <div className="text-sm text-gray-500 mt-1">Smart, effortless, and cool.</div>
                <div className="mt-4 inline-flex gap-2">
                  <button className="px-4 py-2 rounded-full bg-black text-white">Use this</button>
                  <button className="px-4 py-2 rounded-full border">Save</button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4">
        <h3 className="text-2xl font-semibold mb-6">What users say</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <ReviewCard name="Aarav" text="Saved me 10 minutes every morning — love the outfit suggestions!" />
          <ReviewCard name="Isha" text="Feels like having a stylist in my pocket. Highly recommend." />
          <ReviewCard name="Rohan" text="So addictive — I check outfits daily. UI is gorgeous." />
        </div>
      </section>

      {/* Trending */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-semibold">Trending outfits</h3>
          <a className="text-sm text-gray-600 hover:underline cursor-pointer">See all</a>
        </div>
        <TrendingGrid />
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 text-center py-12">
        <motion.h4 initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.4 }} className="text-3xl font-extrabold mb-4">
          Ready to level up your style?
        </motion.h4>
        <p className="text-gray-600 mb-6">Start your free trial — upload an item and get an outfit suggestion in seconds.</p>
        <div className="flex justify-center gap-4">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7c3aed] to-[#ec4899] text-white font-semibold shadow-lg">Get Started</button>
          <button className="px-6 py-3 rounded-full border">Learn more</button>
        </div>
      </section>
    </div>
  );
}
