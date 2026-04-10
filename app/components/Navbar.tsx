"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-gray-100">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-1">
        <span className="text-2xl font-extrabold text-[#1e2d8f]">
          ✳ NGM
        </span>
        <span className="text-2xl font-extrabold text-[#22c55e]">5.0</span>
        <span className="text-xs text-[#1e2d8f] font-semibold leading-none ml-1">
          CONFERENCE
        </span>
      </Link>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex items-center gap-10 text-gray-800 font-medium">
        <li><Link href="/speakers" className="hover:text-[#1e2d8f]">Speakers</Link></li>
        <li><Link href="/agenda" className="hover:text-[#1e2d8f]">Agenda</Link></li>
        <li><Link href="/competitions" className="hover:text-[#1e2d8f]">Competitions</Link></li>
        <li><Link href="/gallery" className="hover:text-[#1e2d8f]">Gallery</Link></li>
        <li><Link href="/contact" className="hover:text-[#1e2d8f]">Contact</Link></li>
      </ul>

      {/* Buy Tickets Button */}
      <Link
        href="#"
        className="hidden md:flex items-center gap-2 bg-[#1e2d8f] text-white px-6 py-3 rounded-md font-semibold hover:bg-[#16256e] transition-colors"
      >
        Buy Tickets →
      </Link>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-[#1e2d8f] text-2xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center gap-6 py-6 z-50 md:hidden">
          <Link href="/speakers" onClick={() => setMenuOpen(false)}>Speakers</Link>
          <Link href="/agenda" onClick={() => setMenuOpen(false)}>Agenda</Link>
          <Link href="/competitions" onClick={() => setMenuOpen(false)}>Competitions</Link>
          <Link href="/gallery" onClick={() => setMenuOpen(false)}>Gallery</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <Link href="#" className="bg-[#1e2d8f] text-white px-6 py-3 rounded-md font-semibold">
            Buy Tickets {'->'}
          </Link>
        </div>
      )}
    </nav>
  );
}