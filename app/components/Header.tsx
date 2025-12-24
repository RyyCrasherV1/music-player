"use client";
import { FaHeadphones } from "react-icons/fa";

export default function Header() {
  return (
    <header className="p-4 bg-gray-900 text-white flex items-center gap-2">
      <FaHeadphones size={24} />
      <h1 className="text-xl font-bold">Himig Play</h1>
    </header>
  );
}
