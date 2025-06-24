"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Barlow_Condensed } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "700"],
});

interface CarouselProps {
  banners: string[];
}

export default function Carousel({ banners }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // For swipe
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      nextSlide();
    } else if (diff < -50) {
      prevSlide();
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - 1 < 0 ? banners.length - 1 : prev - 1
    );
  };

  return (
    <div className="w-full mt-6">
      <h2 className={`${barlowCondensed.className} text-2xl font-bold mb-4 px-4`}>
        Upcoming Events
      </h2>

      <div
        className="relative w-full h-[320px] mt-8 mb-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
          {banners.map((src, idx) => {
          const position = idx - currentIndex;

          const isLeft =
            position === -1 ||
            (position === banners.length - 1 && currentIndex === 0);
          const isRight =
            position === 1 ||
            (position === -(banners.length - 1) &&
              currentIndex === banners.length - 1);

          let translateX = 0;
          let scale = 1;

          if (position === 0) {
            translateX = 0;
            scale = 1.15;
          } else if (isLeft) {
            translateX = -20; // ~3% peek left
            scale = 0.85;
          } else if (isRight) {
            translateX = 20; // ~3% peek right
            scale = 0.85;
          } else {
            translateX = 0;
            scale = 0;
          }

          return (
            <Link
              href="/player/scorecard"
              key={idx}
              className="absolute left-1/2 top-0 w-[80%] h-full transition-all duration-500"
              style={{
                transform: `translateX(-50%) translateX(${translateX}%) scale(${scale})`,
                zIndex: position === 0 ? 30 : 20,
                opacity: scale === 0 ? 0 : 1,
              }}
            >
              <Image
                src={src}
                alt={`Banner ${idx}`}
                width={800}
                height={600}
                className="rounded-2xl object-cover w-full h-full shadow-xl"
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
