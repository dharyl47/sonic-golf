"use client";

import { useState } from "react";
import MatchesBanner from "../../../components/MatchesBanner";
import Leaderboard from "../../../components/Leaderboard";
import LeaderboardTeams from "../../../components/LeaderboardTeams";
import MatchCard from "../../../components/MatchCard";
import PrimaryButton from "../../../components/PrimaryButton";
import ProfileSummary from "../../../components/ProfileSummary";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<"solo" | "team" | "profile">("solo");

  return (
    <main
      className="w-full max-w-none px-0 py-0 min-h-screen overflow-hidden"
      style={{ backgroundColor: "#E4DFD3" }}
    >
      {/* ✅ Matches Banner */}
      <MatchesBanner />

      {/* ✅ Tabs */}
      <div className="flex justify-around mt-6 px-4">
        <button
          onClick={() => setActiveTab("solo")}
          className={`px-8 py-2 rounded-full text-sm ${
            activeTab === "solo"
              ? "bg-green-700 text-white"
              : "border border-black text-black"
          }`}
        >
          Solo
        </button>
        <button
          onClick={() => setActiveTab("team")}
          className={`px-8 py-2 rounded-full text-sm ${
            activeTab === "team"
              ? "bg-green-700 text-white"
              : "border border-black text-black"
          }`}
        >
          TEAM
        </button>
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-8 py-2 rounded-full text-sm ${
            activeTab === "profile"
              ? "bg-green-700 text-white"
              : "border border-black text-black"
          }`}
        >
          PROFILE
        </button>
      </div>

      {/* ✅ Title */}
      <h2
        className={`${barlowCondensed.className} text-2xl font-bold mt-6 px-4`}
      >
        LIVE MATCHES
      </h2>

      {/* ✅ Content */}
      <MatchCard />

      {activeTab === "solo" && <Leaderboard />}
      {activeTab === "team" && <LeaderboardTeams />}
      {activeTab === "profile" && <ProfileSummary />}
      {/* You can add logic for profile view later */}

      <PrimaryButton
        href="/player/scorecard"
        label="Update Your Scoreboard"
      />
      <br />
    </main>
  );
}
