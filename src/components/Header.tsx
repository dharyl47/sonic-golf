"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className={`${
        transparent
          ? "absolute top-0 left-0 right-0 z-50 text-white"
          : "relative mb-6"
      } px-4 mt-2`}
    >
      <div className="flex items-center justify-between">
        {/* Hamburger */}
        <button
          className="text-3xl font-bold"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Profile Avatar */}
        <div
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <Image
            src="/main_avatar.jpg"
            alt="Profile"
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      {/* Hamburger Menu */}
      {menuOpen && (
        <div className={`absolute top-14 left-4 bg-white shadow-xl rounded-lg w-48 p-4 z-50 text-black`}>
          <Link
            href="/"
            className={`block px-4 py-2 rounded ${
              pathname === "/" ? "bg-green-700 text-white" : "hover:bg-gray-100"
            }`}
          >
            Homepage
          </Link>
          <Link
            href="/matches"
            className={`block px-4 py-2 rounded ${
              pathname === "/matches" ? "bg-green-700 text-white" : "hover:bg-gray-100"
            }`}
          >
            Matches
          </Link>
          <Link
            href="/player/scorecard"
            className={`block px-4 py-2 rounded ${
              pathname === "/player/scorecard"
                ? "bg-green-700 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            View Scorecard
          </Link>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            About Us
          </button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Contact Us
          </button>
        </div>
      )}

      {/* Profile Dropdown */}
      {profileOpen && (
        <div className="absolute top-14 right-4 bg-white shadow-xl rounded-lg w-40 p-4 z-50 text-black">
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            View Profile
          </button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Settings
          </button>
          <button className="block w-full text-left px-4 py-2 rounded hover:bg-gray-100">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
