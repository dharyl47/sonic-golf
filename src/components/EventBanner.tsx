"use client";

import Image from "next/image";

export default function EventBanner() {
  return (
    <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-b-lg shadow">
      {/* Banner Image */}
      <Image
        src="/golf_banner.png"
        alt="Event Banner"
        fill
        className="object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Transparent header */}

      {/* Banner Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-10">
        <h1 className="text-3xl md:text-5xl font-bold">Sonic Golf Open 2024</h1>
        <p className="text-lg md:text-xl">June 23, 2024 | Par 72</p>
      </div>
    </div>
  );
}
