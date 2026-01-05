import React from "react";

export default function ReviewCard({ name, text }: { name: string; text: string; }) {
  return (
    <div className="glass p-5 rounded-2xl shadow hover:shadow-lg transition">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-semibold">
          {name[0]}
        </div>
        <div>
          <div className="font-medium">{name}</div>
          <div className="text-xs text-gray-500">Verified user</div>
        </div>
      </div>
      <p className="mt-3 text-gray-700">“{text}”</p>
    </div>
  );
}
