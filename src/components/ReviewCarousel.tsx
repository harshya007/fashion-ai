import { useEffect, useState } from "react";

const reviews = [
  "🔥 Amazing! I created 20 outfits in minutes.",
  "Best AI fashion app. Period.",
  "Love how simple and clean the design is!",
  "The virtual try-on feels so real 😍",
];

export default function ReviewCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % reviews.length);
    }, 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="mt-14 flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 text-center text-gray-700 text-lg transition">
        {reviews[index]}
      </div>
    </div>
  );
}
