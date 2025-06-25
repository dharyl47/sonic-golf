"use client";

import Image from "next/image";
import { useState } from "react";

// Generate 80 dummy players for richer class distribution
const players = Array.from({ length: 80 }, (_, i) => {
  const hcpBase = i % 4; // Ensure class spread
  const hcp =
    hcpBase === 0
      ? parseFloat((Math.random() * 9.9).toFixed(1))        // Class A: <10
      : hcpBase === 1
      ? parseFloat((10 + Math.random() * 4.9).toFixed(1))   // Class B: 10–14.9
      : hcpBase === 2
      ? parseFloat((15 + Math.random() * 4.9).toFixed(1))   // Class C: 15–19.9
      : parseFloat((20 + Math.random() * 4.9).toFixed(1));  // Class D: 20+

  const playerClass =
    hcp < 10 ? "A" : hcp < 15 ? "B" : hcp < 20 ? "C" : "D";

  return {
    name: `Player ${i + 1}`,
    hcp,
    score: Math.floor(Math.random() * 10) + 1,
    avatar: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
    class: playerClass,
  };
});

const classes = ["A", "B", "C", "D"];

export default function LeaderboardByClass() {
  const [activeClass, setActiveClass] = useState("A");
  const [page, setPage] = useState(0);
  const pageSize = 7;

  const filtered = players
    .filter((p) => p.class === activeClass)
    .sort((a, b) => a.score - b.score);

  const startIdx = page * pageSize;
  const visiblePlayers = filtered.slice(startIdx, startIdx + pageSize);
  const maxPage = Math.floor((filtered.length - 1) / pageSize);

  return (
    <div className="px-4 py-6">
      {/* Class Tabs */}
      <div className="flex justify-around mb-4">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setActiveClass(cls);
              setPage(0);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              activeClass === cls
                ? "bg-green-700 text-white"
                : "border border-gray-400 text-gray-700"
            }`}
          >
            Class {cls}
          </button>
        ))}
      </div>

      {/* Title */}
      <h3 className="font-bold mb-4">Leaderboards – Class {activeClass}</h3>

      {/* Labels */}
      <div className="flex justify-between text-sm font-semibold text-gray-500 px-1 mb-2">
        <span className="w-6 text-center">#</span>
        <span className="flex-1 pl-2">Player</span>
        <span className="w-10 text-center">Score</span>
      </div>

      {/* Player List */}
      {visiblePlayers.map((player, idx) => (
        <div key={idx} className="flex items-center justify-between mb-3">
          <span className="text-sm w-6 text-center">{startIdx + idx + 1}</span>

          <div className="flex items-center gap-3 flex-1 pl-2">
            <Image
              src={player.avatar}
              alt={player.name}
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-sm">{player.name}</p>
              <p className="text-xs text-gray-500">HCP: {player.hcp}</p>
            </div>
          </div>

          <div className="text-sm font-bold w-10 text-center">
            {player.score}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0}
          className={`px-4 py-2 rounded-full text-sm ${
            page === 0
              ? "bg-gray-300 text-gray-500"
              : "bg-green-700 text-white"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, maxPage))}
          disabled={page >= maxPage}
          className={`px-4 py-2 rounded-full text-sm ${
            page >= maxPage
              ? "bg-gray-300 text-gray-500"
              : "bg-green-700 text-white"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
