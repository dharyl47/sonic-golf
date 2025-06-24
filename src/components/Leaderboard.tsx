"use client";

import Image from "next/image";
import { useState } from "react";

// Generate 30 dummy players
const players = Array.from({ length: 30 }, (_, i) => ({
  name: `Player ${i + 1}`,
  hcp: (15 + Math.random() * 5).toFixed(1),
  score: Math.floor(Math.random() * 10) + 1,
  avatar: `https://i.pravatar.cc/100?img=${i + 10}`,
}));

export default function Leaderboard() {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const startIdx = page * pageSize;
  const endIdx = startIdx + pageSize;
  const visiblePlayers = players.slice(startIdx, endIdx);

  const maxPage = Math.floor(players.length / pageSize);

  return (
    <div className="px-4 py-6">
      <h3 className="font-bold mb-4">PLAYERS</h3>

      {visiblePlayers.map((player, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between mb-3"
        >
          <div className="flex items-center gap-3">
            <Image
              src={player.avatar}
              alt={player.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold">{player.name}</p>
              <p className="text-xs text-gray-500">HCP: {player.hcp}</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold">
            {player.score}
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={`px-4 py-2 rounded-full ${page === 0 ? "bg-gray-300 text-gray-500" : "bg-green-700 text-white"} text-sm`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}
          disabled={page >= maxPage}
          className={`px-4 py-2 rounded-full ${page >= maxPage ? "bg-gray-300 text-gray-500" : "bg-green-700 text-white"} text-sm`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
