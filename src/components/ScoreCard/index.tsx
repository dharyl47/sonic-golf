"use client";

import { useEffect, useState } from "react";
import ScoreCardDesktop from "./ScoreCardDesktop";
import ScoreCardMobile from "./ScoreCardMobile";

interface Hole {
  holeNumber: number;
  par: number;
}

interface Props {
  holes: Hole[];
}

export default function ScoreCard({ holes }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkWidth();
    setMounted(true);
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!mounted) return null;

  return isMobile ? (
    <ScoreCardMobile holes={holes} />
  ) : (
    <ScoreCardDesktop holes={holes} />
  );
}
