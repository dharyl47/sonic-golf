'use client';

import { useState } from 'react';

interface Hole {
  holeNumber: number;
  par: number;
}

interface ScoreCardProps {
  holes: Hole[];
}

export default function ScoreCard({ holes }: ScoreCardProps) {
  const numHoles = holes.length;

  const [scores, setScores] = useState<number[]>(Array(numHoles).fill(0));
  const [penalties, setPenalties] = useState<number[]>(Array(numHoles).fill(0));
  const [fairway, setFairway] = useState<string[]>(Array(numHoles).fill(''));
  const [gir, setGIR] = useState<string[]>(Array(numHoles).fill(''));
  const [chipDown, setChipDown] = useState<string[]>(Array(numHoles).fill(''));
  const [sandDown, setSandDown] = useState<string[]>(Array(numHoles).fill(''));
  const [putts, setPutts] = useState<number[]>(Array(numHoles).fill(0));

  const sgLetters = ['Dr', 'Ap', 'SG', 'Pu', '60'];
  const sgColors = ['#F12A34', '#FA8604', '#F6C200', '#05D76E', '#00A13C'];

  const [popup, setPopup] = useState<{
    holeIndex: number;
    shotIndex: number;
  } | null>(null);

  const [shots, setShots] = useState<{ type: string; color: string; gain: number }[][]>(
    Array(numHoles).fill(null).map(() => [])
  );

  const maxShots = Math.max(...scores, 0);

  const handleScoreChange = (holeIndex: number, newScore: number) => {
    const newScores = [...scores];
    newScores[holeIndex] = newScore;
    setScores(newScores);

    const newShots = [...shots];
    const currentShots = newShots[holeIndex] || [];
    if (newScore > currentShots.length) {
      newShots[holeIndex] = [
        ...currentShots,
        ...Array(newScore - currentShots.length).fill(null).map(() => ({ type: '-', color: '#ccc', gain: 0 }))
      ];
    } else {
      newShots[holeIndex] = currentShots.slice(0, newScore);
    }

    setShots(newShots);
  };

  const sum = (arr: number[]) => arr.reduce((a, b) => a + (b || 0), 0);
  const getOutInTotal = (arr: number[]) => {
    const out = sum(arr.slice(0, 9));
    const inn = sum(arr.slice(9, 18));
    return { out, inn, total: out + inn };
  };

  const parList = holes.map(h => h.par);
  const parSums = getOutInTotal(parList);
  const penaltySums = getOutInTotal(penalties);
  const puttSums = getOutInTotal(putts);

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-center bg-white text-black">
        <thead>
          <tr className="bg-gradient-to-b from-gray-800 to-gray-700 text-white shadow-inner">
            <th className="p-3 text-right border-r border-gray-600 min-w-[160px]">Row</th>
            {holes.slice(0, 9).map(h => (
              <th key={h.holeNumber} className="p-3 border-r border-gray-600">{h.holeNumber}</th>
            ))}
            <th className="p-3 border-r border-gray-600">Out</th>
            {holes.slice(9, 18).map(h => (
              <th key={h.holeNumber} className="p-3 border-r border-gray-600">{h.holeNumber}</th>
            ))}
            <th className="p-3 border-r border-gray-600">In</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {/* Par */}
          <tr className="border-b">
            <td className="text-right p-2 font-semibold min-w-[160px]">Par</td>
            {parList.slice(0, 9).map((p, i) => <td key={i} className="p-2">{p}</td>)}
            <td className="p-2">{parSums.out}</td>
            {parList.slice(9, 18).map((p, i) => <td key={i} className="p-2">{p}</td>)}
            <td className="p-2">{parSums.inn}</td>
            <td className="p-2">{parSums.total}</td>
          </tr>

          {/* Score */}
          <tr className="border-b">
            <td className="text-right p-2 font-semibold min-w-[160px]">Score</td>
            {scores.map((val, i) => (
              <td key={i} className="p-1">
                <input
                  type="number"
                  value={val || ''}
                  onChange={e => handleScoreChange(i, Number(e.target.value))}
                  className="w-12 p-1 border text-center"
                />
              </td>
            ))}
          </tr>

          {/* Penalties */}
          {renderInputRow('Penalties', penalties, setPenalties, penaltySums)}

          {/* Fairway */}
          {renderTextRow('Fairway', fairway, setFairway)}

          {/* GIR */}
          {renderTextRow('GIR', gir, setGIR)}

          {/* Chip & Down */}
          {renderTextRow('Chip & Down', chipDown, setChipDown)}

          {/* Sand & Down */}
          {renderTextRow('Sand & Down', sandDown, setSandDown)}

          {/* Putts */}
          {renderInputRow('Putts', putts, setPutts, puttSums)}

          {/* Strokes Gained Guide */}
          {scores.some(s => s > 0) && (
            <tr className="border-b bg-gray-50">
              <td className="text-right p-2 font-semibold">Strokes Gained</td>
              <td colSpan={holes.length + 4} className="p-2">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-xs mr-2">Poor</span>
                  {['bg-red-500', 'bg-orange-400', 'bg-yellow-400', 'bg-green-400', 'bg-green-600'].map((color, i) => (
                    <span
                      key={i}
                      className={`w-4 h-4 rounded-full ${color}`}
                    ></span>
                  ))}
                  <span className="text-xs ml-2">Excellent</span>
                </div>
              </td>
            </tr>
          )}

          {/* Strokes Gained rows */}
          {Array.from({ length: maxShots }).map((_, shotIndex) => {
            const rowShots = shots.map(holeShots => holeShots[shotIndex]);

            const setRowShots = (newRow: ({ type: string; color: string; gain: number } | undefined)[]) => {
              const newShots = [...shots];
              newRow.forEach((s, holeIdx) => {
                if (s) {
                  const h = [...newShots[holeIdx]];
                  h[shotIndex] = s;
                  newShots[holeIdx] = h;
                }
              });
              setShots(newShots);
            };

            return renderStrokesGainedRow(rowShots, setRowShots, shotIndex);
          })}
        </tbody>
      </table>

      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xs relative">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Select Strokes Gained
            </h3>
            <div className="space-y-3">
              {sgLetters.map(letter => (
                <div key={letter} className="flex items-center justify-center space-x-2">
                  {sgColors.map(color => (
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
                      className="w-10 h-10 rounded-full text-sm font-bold text-white flex items-center justify-center shadow hover:scale-105 transition-transform duration-200"
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

  // Helpers
  function renderInputRow(
    label: string,
    data: number[],
    setter: (v: number[]) => void,
    sums: { out: number; inn: number; total: number }
  ) {
    return (
      <tr className="border-b">
        <td className="text-right p-2 font-semibold min-w-[160px]">{label}</td>
        {data.slice(0, 9).map((val, i) => (
          <td key={i} className="p-1">
            <input
              type="number"
              value={val || ''}
              onChange={e => {
                const copy = [...data];
                copy[i] = Number(e.target.value);
                setter(copy);
              }}
              className="w-14 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="0"
            />
          </td>
        ))}
        <td className="p-2 font-semibold">{sums.out}</td>
        {data.slice(9, 18).map((val, i) => (
          <td key={i + 9} className="p-1">
            <input
              type="number"
              value={val || ''}
              onChange={e => {
                const copy = [...data];
                copy[i + 9] = Number(e.target.value);
                setter(copy);
              }}
              className="w-14 px-2 py-1 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              placeholder="0"
            />
          </td>
        ))}
        <td className="p-2 font-semibold">{sums.inn}</td>
        <td className="p-2 font-semibold">{sums.total}</td>
      </tr>
    );
  }

  function renderTextRow(
    label: string,
    data: string[],
    setter: (v: string[]) => void
  ) {
    return (
      <tr className="border-b">
        <td className="text-right p-2 font-semibold">{label}</td>
        {data.slice(0, 9).map((val, i) => (
          <td key={`${label}-${i}`} className="p-1">
            <input
              type="text"
              value={val}
              onChange={e => {
                const copy = [...data];
                copy[i] = e.target.value;
                setter(copy);
              }}
              className="w-12 p-1 border text-center"
            />
          </td>
        ))}
        <td className="p-2">-</td>
        {data.slice(9, 18).map((val, i) => (
          <td key={`${label}-${i + 9}`} className="p-1">
            <input
              type="text"
              value={val}
              onChange={e => {
                const copy = [...data];
                copy[i + 9] = e.target.value;
                setter(copy);
              }}
              className="w-12 p-1 border text-center"
            />
          </td>
        ))}
        <td className="p-2">-</td>
        <td className="p-2">-</td>
      </tr>
    );
  }

  function renderStrokesGainedRow(
    rowShots: ({ type: string; color: string; gain: number } | undefined)[],
    setRowShots: (v: ({ type: string; color: string; gain: number } | undefined)[]) => void,
    shotIndex: number
  ) {
    return (
      <tr className="border-b">
        <td></td>
        {rowShots.slice(0, 9).map((shot, i) => (
          <td key={i} className="p-1 text-center">
            {shot && (
              <button
                onClick={() => setPopup({ holeIndex: i, shotIndex })}
                className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center border mx-auto"
                style={{ backgroundColor: shot.color }}
              >
                {shot.type}
              </button>
            )}
          </td>
        ))}
        <td className="text-center">-</td>
        {rowShots.slice(9, 18).map((shot, i) => (
          <td key={i + 9} className="p-1 text-center">
            {shot && (
              <button
                onClick={() => setPopup({ holeIndex: i + 9, shotIndex })}
                className="w-6 h-6 rounded-full text-xs font-bold text-white flex items-center justify-center border mx-auto"
                style={{ backgroundColor: shot.color }}
              >
                {shot.type}
              </button>
            )}
          </td>
        ))}
        <td className="text-center">-</td>
        <td className="text-center">-</td>
      </tr>
    );
  }
}
