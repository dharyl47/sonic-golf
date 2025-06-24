"use client";

import Image from "next/image";

export default function MatchCard() {
  return (
    <div className="px-4 mt-4">
      <p className="text-gray-600">Play by Aug 20</p>
      <div className="w-full h-[200px] rounded-2xl mt-2 overflow-hidden relative">
        <Image
          src="/active_match.png"
          alt="Active Match"
          width={800}
          height={500}
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur px-4 py-2 rounded-xl text-sm">
          <p>Aug 15 • 09:00</p>
          <p>Davao City Event Golf Competition - Kadayawan</p>
        </div>
      </div>
    </div>
  );
}
