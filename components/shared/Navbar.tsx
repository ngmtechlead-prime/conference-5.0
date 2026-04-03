"use client";

import Image from "next/image";
import React, { useState } from "react";

const navLinks = ["Speakers", "Agenda", "Competitions", "Gallery", "Contact"];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
      <span
        className={`block h-0.5 bg-[#1e3a8a] rounded transition-all duration-300 origin-center ${
          open ? "rotate-45 translate-y-[9px]" : ""
        }`}
      />
      <span
        className={`block h-0.5 bg-[#1e3a8a] rounded transition-all duration-300 ${
          open ? "opacity-0 scale-x-0" : ""
        }`}
      />
      <span
        className={`block h-0.5 bg-[#1e3a8a] rounded transition-all duration-300 origin-center ${
          open ? "-rotate-45 -translate-y-[9px]" : ""
        }`}
      />
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Image
            src="/icons/NGMLogo.svg"
            alt="NGM Logo"
            width={190}
            height={40}
          />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative px-4 py-2 text-sm font-semibold text-gray-600 tracking-wide group transition-colors duration-200 hover:text-[#1e3a8a]"
              >
                {link}
                {/* Underline animation */}
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#2563eb] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
              </a>
            ))}
          </div>

          {/* Buy Tickets Button (desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="#tickets"
              className="flex items-center gap-2 bg-[#0f1990] hover:bg-blue-950 text-white text-sm font-bold px-5 py-2.5 rounded-md transition-colors duration-200 tracking-wide shadow-md hover:shadow-lg"
            >
              Buy Tickets
              <Image
                src="/icons/rightArrow.svg"
                alt="right"
                width={16}
                height={16}
              />
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-100 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 px-3 text-sm font-semibold text-gray-600 hover:text-[#1e3a8a] hover:bg-blue-50 rounded-md transition-colors duration-150 tracking-wide"
            >
              {link}
            </a>
          ))}
          <a
            href="#tickets"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white text-sm font-bold px-5 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
          >
            Buy Tickets
            <Image
              src="/icons/rightArrow.svg"
              alt="right"
              width={12}
              height={12}
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
