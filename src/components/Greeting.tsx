"use client";

import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Greeting() {
  return (
    <>
      <div className={`${barlowCondensed.className} text-4xl font-bold mb-1 px-4`}>
        Hello <br /> Romeo Sonico!
      </div>
      <p className="text-sm text-gray-600 mb-4 px-4">
        🏌️‍♂️ Davao City, Philippines
      </p>
    </>
  );
}
