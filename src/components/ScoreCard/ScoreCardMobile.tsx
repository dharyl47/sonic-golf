"use client";

import React, { useState } from "react";

interface Hole {
  holeNumber: number;
  par: number;
}

interface Shot {
  type: string;
  color: string;
  gain: number;
}

export default function ScoreCardMobile({ holes }: { holes: Hole[] }) {
  const numHoles = holes.length;

  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [scores, setScores] = useState<number[]>(Array(numHoles).fill(0));
  const [penalties, setPenalties] = useState<number[]>(Array(numHoles).fill(0));
  const [fairway, setFairway] = useState<string[]>(Array(numHoles).fill(""));
  const [gir, setGIR] = useState<string[]>(Array(numHoles).fill(""));
  const [chipDown, setChipDown] = useState<string[]>(Array(numHoles).fill(""));
  const [sandDown, setSandDown] = useState<string[]>(Array(numHoles).fill(""));
  const [putts, setPutts] = useState<number[]>(Array(numHoles).fill(0));
  const [shots, setShots] = useState<Shot[][]>(
    Array(numHoles).fill(null).map(() => [])
  );
  const [popup, setPopup] = useState<{ holeIndex: number; shotIndex: number } | null>(null);

  const sgLetters = ["Dr", "Ap", "SG", "Pu", "60"];
  const sgColors = ["#F12A34", "#FA8604", "#F6C200", "#05D76E", "#00A13C"];

  const handleScoreChange = (holeIndex: number, newScore: number) => {
    const newScores = [...scores];
    newScores[holeIndex] = newScore;
    setScores(newScores);

    const newShots = [...shots];
    const currentShots = newShots[holeIndex] || [];
    if (newScore > currentShots.length) {
      newShots[holeIndex] = [
        ...currentShots,
        ...Array(newScore - currentShots.length).fill(null).map(() => ({
          type: "-",
          color: "#ccc",
          gain: 0,
        })),
      ];
    } else {
      newShots[holeIndex] = currentShots.slice(0, newScore);
    }

    setShots(newShots);
  };

  return (
    <div className="bg-[url('/golf_portrait.jpg')] bg-cover bg-center min-h-screen flex flex-col items-center justify-start p-4 space-y-6">
      {/* OUT container */}
      <ScoreTableSection
        title="OUT"
        holes={holes.slice(0, 9)}
        scores={scores}
        penalties={penalties}
        onCellClick={setActiveHole}
      />

      {/* IN container */}
      <ScoreTableSection
        title="IN"
        holes={holes.slice(9, 18)}
        scores={scores}
        penalties={penalties}
        onCellClick={setActiveHole}
      />

      {/* === Hole Editor Popup === */}
      {activeHole !== null && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
    <div className="bg-white/20 backdrop-blur-2xl border border-white/30 shadow-xl rounded-3xl p-6 w-full max-w-md text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Hole {holes[activeHole].holeNumber} (Par {holes[activeHole].par})
        </h2>
        <button
          onClick={() => setActiveHole(null)}
          className="text-white hover:text-gray-200 text-2xl"
        >
          ✕
        </button>
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <InputRow<number>
          label="Score"
          value={scores[activeHole]}
          onChange={(val) => handleScoreChange(activeHole, val)}
        />

        <InputRow<number>
          label="Penalties"
          value={penalties[activeHole]}
          onChange={(val) => {
            const copy = [...penalties];
            copy[activeHole] = val;
            setPenalties(copy);
          }}
        />

        <InputRow<string>
          label="Fairway"
          value={fairway[activeHole]}
          onChange={(val) => {
            const copy = [...fairway];
            copy[activeHole] = val;
            setFairway(copy);
          }}
          inputType="text"
        />

        <InputRow<string>
          label="GIR"
          value={gir[activeHole]}
          onChange={(val) => {
            const copy = [...gir];
            copy[activeHole] = val;
            setGIR(copy);
          }}
          inputType="text"
        />

        <InputRow<string>
          label="Chip Down"
          value={chipDown[activeHole]}
          onChange={(val) => {
            const copy = [...chipDown];
            copy[activeHole] = val;
            setChipDown(copy);
          }}
          inputType="text"
        />

        <InputRow<string>
          label="Sand Down"
          value={sandDown[activeHole]}
          onChange={(val) => {
            const copy = [...sandDown];
            copy[activeHole] = val;
            setSandDown(copy);
          }}
          inputType="text"
        />

        <InputRow<number>
          label="Putts"
          value={putts[activeHole]}
          onChange={(val) => {
            const copy = [...putts];
            copy[activeHole] = val;
            setPutts(copy);
          }}
        />

        <div className="flex flex-wrap gap-2">
          {shots[activeHole]?.map((shot, shotIndex) => (
            <button
              key={shotIndex}
              onClick={() => setPopup({ holeIndex: activeHole, shotIndex })}
              className="w-8 h-8 rounded-full text-xs font-bold text-white flex items-center justify-center border border-white/30 shadow backdrop-blur"
              style={{ backgroundColor: shot.color }}
            >
              {shot.type}
            </button>
          ))}
        </div>
      </div>
    </div>
  </div>
)}


      {/* === Strokes Gained Type popup === */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-xl p-6 w-full max-w-xs">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Select Strokes Gained
            </h3>
            <div className="space-y-3">
              {sgLetters.map((letter) => (
                <div key={letter} className="flex justify-center gap-2">
                  {sgColors.map((color) => (
                    <button
                      key={`${letter}-${color}`}
                      onClick={() => {
                        const updated = [...shots[popup.holeIndex]];
                        updated[popup.shotIndex] = { type: letter, color, gain: 0 };
                        const newShots = [...shots];
                        newShots[popup.holeIndex] = updated;
                        setShots(newShots);
                        setPopup(null);
                      }}
                      style={{ backgroundColor: color }}
                      className="w-10 h-10 rounded-full text-sm font-bold text-white flex items-center justify-center shadow hover:scale-105 transition"
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <button
              onClick={() => setPopup(null)}
              className="mt-6 w-full py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// === OUT / IN container ===
function ScoreTableSection({
  title,
  holes,
  scores,
  penalties,
  onCellClick,
}: {
  title: string;
  holes: Hole[];
  scores: number[];
  penalties: number[];
  onCellClick: (index: number) => void;
}) {
  const indexes = holes.map((h) => h.holeNumber - 1);
  const total = indexes.reduce((sum, i) => sum + (scores[i] || 0), 0);

  return (
    <div className="w-full max-w-md rounded-xl overflow-hidden shadow-md">
      {/* Header */}
      <div className="bg-[#00B795] text-white px-4 py-2 flex justify-between items-center">
        <div className="font-bold">Davao Open | Sunday Nov 13</div>
        <div className="flex items-center gap-2">76°F ☀️</div>
      </div>

      {/* Body */}
      <div className="bg-white/90 backdrop-blur p-4 space-y-2">
        <div className="flex justify-between mb-2 text-sm font-semibold">
          <span>{title} | Day 2 | Rank T3</span>
          <span>Total: {total}</span>
        </div>
        <table className="w-full text-center text-sm">
          <thead>
            <tr className="text-gray-600">
              <th>Hole</th>
              <th>Par</th>
              <th>Score</th>
              <th>To Par</th>
              <th>Pnlt</th>
            </tr>
          </thead>
          <tbody>
            {indexes.map((i) => {
              const hole = holes.find(h => h.holeNumber - 1 === i)!;
              const netStrokes = scores[i] - penalties[i];
              const toPar = netStrokes - hole.par;
              return (
                <tr key={i} onClick={() => onCellClick(i)} className="cursor-pointer hover:bg-gray-100">
                  <td>{hole.holeNumber}</td>
                  <td>{hole.par}</td>
                  <td>{scores[i] || "-"}</td>
                  <td className={toPar === 0 ? "text-gray-600" : toPar > 0 ? "text-red-600" : "text-green-600"}>
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

// === Generic Input Row ===
interface InputRowProps<T extends string | number> {
  label: string;
  value: T;
  onChange: (v: T) => void;
  inputType?: "number" | "text";
}

function InputRow<T extends string | number>({
  label,
  value,
  onChange,
  inputType = "number",
}: InputRowProps<T>) {
  return (
    <div className="flex justify-between items-center">
      <label className="font-medium text-white">{label}:</label>
      <input
        type={inputType}
        value={value ?? ""}
        className="w-24 p-2 rounded-lg text-center border border-gray-300 bg-white text-black"
        onChange={(e) =>
          onChange(
            inputType === "number"
              ? (Number(e.target.value) as T)
              : (e.target.value as T)
          )
        }
      />
    </div>
  );
}
