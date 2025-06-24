"use client";

import Header from "./Header";
import Image from "next/image";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function MatchesBanner() {
  return (
    <div className="relative w-full h-[280px] overflow-hidden rounded-b-2xl">
      {/* ✅ Banner image */}
      <Image
        src="/golf_portrait.jpg"
        alt="Golf Portrait Banner"
        width={800}
        height={400}
        className="object-cover w-full h-full"
      />

      {/* ✅ Subtle dark overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* ✅ Transparent header inside */}
      <Header transparent />

      {/* ✅ Overlay content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className={`${barlowCondensed.className} text-4xl font-bold`}>
          LIVE MATCH
        </h1>
        <button className="mt-4 bg-black/70 text-white px-6 py-2 rounded-full text-sm">
          STANDINGS
        </button>
      </div>
    </div>
  );
}
