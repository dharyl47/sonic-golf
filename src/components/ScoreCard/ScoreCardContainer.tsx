"use client";

import { useState, useEffect, useRef } from "react";

export function useScoreCard(numHoles: number) {
  const initialized = useRef(false);

  const [scores, setScores] = useState<number[]>([]);
  const [penalties, setPenalties] = useState<number[]>([]);
  const [fairway, setFairway] = useState<string[]>([]);
  const [gir, setGIR] = useState<string[]>([]);
  const [chipDown, setChipDown] = useState<string[]>([]);
  const [sandDown, setSandDown] = useState<string[]>([]);
  const [putts, setPutts] = useState<number[]>([]);
  const [shots, setShots] = useState<{ type: string; color: string; gain: number }[][]>([]);
  const [popup, setPopup] = useState<{ holeIndex: number; shotIndex: number } | null>(null);

  useEffect(() => {
    if (!initialized.current) {
      setScores(Array(numHoles).fill(0));
      setPenalties(Array(numHoles).fill(0));
      setFairway(Array(numHoles).fill(""));
      setGIR(Array(numHoles).fill(""));
      setChipDown(Array(numHoles).fill(""));
      setSandDown(Array(numHoles).fill(""));
      setPutts(Array(numHoles).fill(0));
      setShots(Array(numHoles).fill(null).map(() => []));
      initialized.current = true;
    }
  }, [numHoles]);

  const sgLetters = ['Dr', 'Ap', 'SG', 'Pu', '60'];
  const sgColors = ['#F12A34', '#FA8604', '#F6C200', '#05D76E', '#00A13C'];

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

  return {
    scores, setScores,
    penalties, setPenalties,
    fairway, setFairway,
    gir, setGIR,
    chipDown, setChipDown,
    sandDown, setSandDown,
    putts, setPutts,
    sgLetters, sgColors,
    popup, setPopup,
    shots, setShots,
    handleScoreChange
  };
}
