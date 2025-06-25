"use client";

import Image from "next/image";

interface Hole {
  holeNumber: number;
  par: number;
}

const player = {
  name: "Romeo Sonico",
  hcp: 12.3,
  age: 36,
  avatar: "https://i.pravatar.cc/100?img=13",
  rank: "T3",
  score: 72,
};

const team = {
  name: "Eagle Strikers",
  rank: "2nd",
  score: 141,
  members: [
    "https://i.pravatar.cc/100?img=1",
    "https://i.pravatar.cc/100?img=2",
    "https://i.pravatar.cc/100?img=3",
    "https://i.pravatar.cc/100?img=4",
  ],
};

const holes: Hole[] = Array.from({ length: 18 }, (_, i) => ({
  holeNumber: i + 1,
  par: i < 9 ? 4 : 5,
}));

const scores = Array.from({ length: 18 }, () => Math.floor(Math.random() * 3) + 3);
const penalties = Array.from({ length: 18 }, () => Math.floor(Math.random() * 2));

export default function PlayerProfile() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 space-y-6">
      {/* User Info Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-6 text-center">
        <div className="flex justify-center mb-3">
          <Image
            src={player.avatar}
            width={80}
            height={80}
            alt={player.name}
            className="rounded-full border-4 border-white shadow-lg"
          />
        </div>
        <h2 className="text-xl font-bold text-black">{player.name}</h2>
        <p className="text-sm text-black/90 mt-1">Rank: {player.rank}</p>
        <p className="text-sm text-black/90">Score: {player.score}</p>
        <p className="text-sm text-black/90">HCP: {player.hcp} | Age: {player.age}</p>
      </div>

      {/* Team Info Card */}
      <div className="w-full max-w-md rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 shadow-lg p-6">
        <h3 className="text-lg font-semibold text-black text-center mb-3">
          Team: {team.name}
        </h3>
        <div className="flex justify-center mb-2 -space-x-4">
          {team.members.map((avatar, i) => (
            <Image
              key={i}
              src={avatar}
              width={40}
              height={40}
              alt={`Team Member ${i + 1}`}
              className="rounded-full border-2 border-white z-10"
              style={{ zIndex: 10 - i }}
            />
          ))}
        </div>
        <div className="text-sm text-black text-center">
          <p>Team Rank: <span className="font-semibold">{team.rank}</span></p>
          <p>Team Score: <span className="font-semibold">{team.score}</span></p>
        </div>
      </div>

      {/* OUT Scorecard */}
      <ScoreTableSection
        title="OUT"
        holes={holes.slice(0, 9)}
        scores={scores}
        penalties={penalties}
      />

      {/* IN Scorecard */}
      <ScoreTableSection
        title="IN"
        holes={holes.slice(9)}
        scores={scores}
        penalties={penalties}
      />
    </div>
  );
}

// === Scorecard Table Section ===
function ScoreTableSection({
  title,
  holes,
  scores,
  penalties,
}: {
  title: string;
  holes: Hole[];
  scores: number[];
  penalties: number[];
}) {
  const indexes = holes.map((h) => h.holeNumber - 1);
  const total = indexes.reduce((sum, i) => sum + (scores[i] || 0), 0);

  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden shadow-md bg-white/30 backdrop-blur-xl border border-white/30">
      {/* Header */}
      <div className="bg-green-700/90 text-white px-4 py-2 flex justify-between items-center">
        <div className="font-bold">Davao Open | Sunday Nov 13</div>
        <div className="flex items-center gap-2">76°F ☀️</div>
      </div>

      {/* Body */}
      <div className="p-4 space-y-2 text-black">
        <div className="flex justify-between mb-2 text-sm font-semibold">
          <span>{title} | Day 2</span>
          <span>Total: {total}</span>
        </div>
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="text-black/80">
              <th>Hole</th>
              <th>Par</th>
              <th>Score</th>
              <th>To Par</th>
              <th>Pnlt</th>
            </tr>
          </thead>
          <tbody>
            {indexes.map((i) => {
              const hole = holes.find((h) => h.holeNumber - 1 === i)!;
              const netStrokes = scores[i] - penalties[i];
              const toPar = netStrokes - hole.par;
              return (
                <tr key={i} className="hover:bg-white/10">
                  <td>{hole.holeNumber}</td>
                  <td>{hole.par}</td>
                  <td>{scores[i] || "-"}</td>
                  <td
                    className={
                      toPar === 0
                        ? "text-black/80"
                        : toPar > 0
                        ? "text-red-400"
                        : "text-green-400"
                    }
                  >
                    {toPar >= 0 ? `+${toPar}` : toPar}
                  </td>
                  <td>{penalties[i] || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
