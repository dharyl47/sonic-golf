"use client";

import MatchesBanner from "../../../components/MatchesBanner";
import Leaderboard from "../../../components/Leaderboard";
import MatchCard from "../../../components/MatchCard";
import PrimaryButton from "../../../components/PrimaryButton";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MatchesPage() {
  return (
    <main
      className="w-full max-w-none px-0 py-0 min-h-screen overflow-hidden"
      style={{ backgroundColor: "#E4DFD3" }}
    >
      {/* ✅ Matches Banner */}
      <MatchesBanner />

      {/* ✅ Tabs (stub) */}
      <div className="flex justify-around mt-6 px-4">
        <button className="px-8 py-2 rounded-full bg-green-700 text-white text-sm">
          MATCHES
        </button>
        <button className="px-8 py-2 rounded-full border border-black text-sm">
          TEAM
        </button>
        <button className="px-8 py-2 rounded-full border border-black text-sm">
          PROFILE
        </button>
      </div>

      {/* ✅ Upcoming Matches title */}
      <h2
        className={`${barlowCondensed.className} text-2xl font-bold mt-6 px-4`}
      >
        LIVE MATCHES
      </h2>

      {/* Placeholder for future matches list */}
      <MatchCard />
      <Leaderboard />
      <PrimaryButton href="/player/scorecard" label="Update Your Scoreboard" />
      <br/>
    </main>
  );
}
