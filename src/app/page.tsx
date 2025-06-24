"use client";

import Header from "../components/Header";
import Greeting from "../components/Greeting";
import Carousel from "../components/Carousel";
import PrimaryButton from "../components/PrimaryButton";

const banners = [
  "/home_banner_1.jpg",
  "/home_banner_2.jpg",
  "/home_banner_3.jpg",
];

export default function Home() {
  return (
    <main
      className="w-full max-w-none px-0 py-4 min-h-screen overflow-hidden"
      style={{ backgroundColor: "#E4DFD3" }}
    >
      {/* ✅ Header */}
      <Header />

      {/* ✅ Greeting */}
      <Greeting />

      {/* ✅ Carousel */}
      <Carousel banners={banners} />
      <PrimaryButton href="/player/matches" label="View Matches" />
    </main>
  );
}
