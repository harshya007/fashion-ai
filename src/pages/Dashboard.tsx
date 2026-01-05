import { useEffect, useState } from "react";
import { getWardrobeMock } from "../services/api";

export default function Dashboard(){
  const [count, setCount] = useState(0);
  useEffect(()=>{ getWardrobeMock().then(d=>setCount(d.length)); }, []);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Wardrobe Items</div>
          <div className="text-3xl font-bold">{count}</div>
        </div>
        <div className="glass p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Outfits Saved</div>
          <div className="text-3xl font-bold">12</div>
        </div>
        <div className="glass p-6 rounded-2xl shadow">
          <div className="text-sm text-gray-500">Daily Suggestions</div>
          <div className="text-3xl font-bold">1</div>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Trending Outfits</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length:6}).map((_,i)=>(
            <div key={i} className="bg-white rounded-2xl p-4 shadow">
              <div className="h-40 bg-gray-200 rounded-md mb-3" />
              <div className="font-semibold">Outfit {i+1}</div>
              <div className="text-sm text-gray-500 mt-1">Popular among users</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
