"use client";

import Link from "next/link";

interface PrimaryButtonProps {
  href: string;
  label: string;
}

export default function PrimaryButton({ href, label }: PrimaryButtonProps) {
  return (
    <Link
      href={href}
      className="block w-[90%] mx-auto bg-green-700 text-white text-center py-2 rounded-4xl text-lg font-semibold shadow-md transition duration-200 hover:bg-green-800"
    >
      {label}
    </Link>
  );
}
