import React from "react";
import { motion } from "framer-motion";

export default function AnimatedBars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-end gap-2 justify-start md:justify-center">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="w-2 rounded-full"
          style={{ background: `linear-gradient(180deg,var(--accent-from),var(--accent-to))`, height: `${18 + i * 8}px` }}
          animate={{ scaleY: [1, 2.2, 1] }}
          transition={{ repeat: Infinity, duration: 1.1 + i * 0.12, delay: i * 0.08 }}
        />
      ))}
    </div>
  );
}
