"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

// Generate dummy players
const generatePlayers = (count: number) =>
  Array.from({ length: count }, (_, i) => {
    const hcpBase = i % 4;
    const hcp =
      hcpBase === 0
        ? parseFloat((Math.random() * 9.9).toFixed(1)) // Class A
        : hcpBase === 1
        ? parseFloat((10 + Math.random() * 4.9).toFixed(1)) // Class B
        : hcpBase === 2
        ? parseFloat((15 + Math.random() * 4.9).toFixed(1)) // Class C
        : parseFloat((20 + Math.random() * 4.9).toFixed(1)); // Class D

    const playerClass = hcp < 10 ? "A" : hcp < 15 ? "B" : hcp < 20 ? "C" : "D";

    return {
      name: `Player ${i + 1}`,
      hcp,
      avatar: `https://i.pravatar.cc/100?img=${(i % 70) + 1}`,
      class: playerClass,
    };
  });

const allPlayers = generatePlayers(120);

// Generate teams of 2 or 4 ensuring diverse class distribution
function generateTeams(teamSize: 2 | 4) {
  const playersCopy = [...allPlayers].sort(() => Math.random() - 0.5);
  const teams: {
    id: number;
    members: typeof allPlayers;
    score: number;
    class: string;
  }[] = [];

  for (let i = 0; i <= playersCopy.length - teamSize; i += teamSize) {
    const members = playersCopy.slice(i, i + teamSize);
    const score = members.reduce(
      (acc) => acc + Math.floor(Math.random() * 10 + 1),
      0
    );

    const classCounts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
    members.forEach((m) => (classCounts[m.class] += 1));
    const majorityClass = Object.entries(classCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b
    )[0];

    teams.push({ id: i, members, score, class: majorityClass });
  }

  return teams;
}

const classes = ["A", "B", "C", "D"];

export default function LeaderboardTeams() {
  const [activeClass, setActiveClass] = useState("A");
  const [teamSize, setTeamSize] = useState<2 | 4>(2);
  const [page, setPage] = useState(0);
  const pageSize = 7;

  const allTeams = useMemo(() => generateTeams(teamSize), [teamSize]);

  const teams = allTeams
    .filter((t) => t.class === activeClass)
    .sort((a, b) => a.score - b.score);

  const startIdx = page * pageSize;
  const visibleTeams = teams.slice(startIdx, startIdx + pageSize);
  const maxPage = Math.floor((teams.length - 1) / pageSize);

  return (
    <div className="px-4 py-6">
      {/* Class and Team Size Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex gap-2 flex-wrap">
          {classes.map((cls) => (
            <button
              key={cls}
              onClick={() => {
                setActiveClass(cls);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeClass === cls
                  ? "bg-green-700 text-white"
                  : "border border-gray-400 text-gray-700"
              }`}
            >
              Class {cls}
            </button>
          ))}
        </div>

        <div className="flex gap-2 flex-wrap">
          {[2, 4].map((size) => (
            <button
              key={size}
              onClick={() => {
                setTeamSize(size as 2 | 4);
                setPage(0);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                teamSize === size
                  ? "bg-black text-white border-2 border-yellow-400"
                  : "border border-gray-400 text-gray-700"
              }`}
            >
              {size}-Player
            </button>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between text-sm font-semibold text-gray-500 px-1 mb-2">
        <span className="w-6 text-center">#</span>
        <span className="flex-1 pl-2">Team</span>
        <span className="w-10 text-center">Score</span>
      </div>

      {/* Team List */}
      {visibleTeams.map((team, idx) => (
        <div key={team.id} className="flex items-center justify-between mb-4">
          <span className="text-sm w-6 text-center">{startIdx + idx + 1}</span>

          <div className="flex-1 flex items-center gap-3 pl-2">
            <div className="relative flex -space-x-4">
              {team.members.map((p, i) => (
                <Image
                  key={i}
                  src={p.avatar}
                  alt={p.name}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white"
                  style={{ zIndex: 10 - i }}
                />
              ))}
            </div>

            <div>
              {team.members.map((p, i) => (
                <p key={i} className="text-sm font-medium leading-4">
                  {p.name}
                </p>
              ))}
            </div>
          </div>

          <div className="text-sm font-bold w-10 text-center">
            {team.score}
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
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
          onClick={() => setPage((p) => Math.min(p + 1, maxPage))}
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
