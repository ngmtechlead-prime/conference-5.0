"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Wrapper from "./Wrapper";
import Link from "next/link";

const navLinks = [
  { name: "Speakers", href: "/speakers" },
  { name: "Agenda", href: "/agenda" },
  {
    name: "Competitions",
    hasDropdown: true,
    dropdownItems: [
      {
        name: "NGM X Kola Adesina Competition",
        href: "/competitions/dare-nigeria",
      },
      { name: "SME Pitch Competition", href: "/competitions/sme-pitch" },
      { name: "Case Study Competition", href: "/competitions/case-study" },
    ],
  },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="w-6 h-5 flex flex-col justify-between cursor-pointer">
      <span
        className={`block h-0.5 bg-[#0F1990] rounded transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-[9px]" : ""}`}
      />
      <span
        className={`block h-0.5 bg-[#0F1990] rounded transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`}
      />
      <span
        className={`block h-0.5 bg-[#0F1990] rounded transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-[9px]" : ""}`}
      />
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`w-full h-[88px] py-4 bg-white border-gray-100 sticky top-0 z-50 transition-shadow duration-300 ${scrolled ? "shadow-sm" : "shadow-none"}`}
    >
      <Wrapper className="h-full flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <Link
              href="https://ngmplatform.com"
              target="_blank"
              rel="noreferrer noopenner"
            >
              <Image
                src="/icons/ngm-logo-white.png"
                alt="NGM Logo"
                width={60}
                height={60}
              />
            </Link>
            <div className="h-8 w-px bg-gray-300" />
            {/* Logo */}
            <Link href="/">
              <Image
                src="/icons/NGMLogo.svg"
                alt="NGM Logo"
                width={190}
                height={40}
              />
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div ref={dropdownRef} className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => {
                  if (link.hasDropdown) setOpenDropdown(link.name);
                }}
                onMouseLeave={() => {
                  if (link.hasDropdown) setOpenDropdown(null);
                }}
              >
                <a
                  href={link.hasDropdown ? undefined : link.href}
                  onClick={() => {
                    if (link.hasDropdown) {
                      setOpenDropdown(
                        openDropdown === link.name ? null : link.name,
                      );
                    }
                  }}
                  className="relative px-4 py-2 text-[16px] font-medium font-epilogue leading-5 text-[#4a5565] tracking-[-0.03em] transition-colors duration-200 hover:text-[#0DA04C] flex items-center gap-1 cursor-pointer"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <Image
                      src="/icons/down.svg"
                      alt="dropdown"
                      width={14}
                      height={14}
                      className={`transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`}
                    />
                  )}
                </a>

                {/* Desktop Dropdown */}
                {link.hasDropdown && link.dropdownItems && (
                  <div
                    className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden transition-all duration-200 ${openDropdown === link.name ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
                  >
                    {link.dropdownItems.map((item, i) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setOpenDropdown(null)}
                        className={`flex items-center px-4 py-3.5 text-sm font-medium font-epilogue text-gray-700 hover:text-[#0DA04C] transition-colors duration-150 ${i !== link.dropdownItems!.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buy Tickets Button (desktop) */}
          <div className="hidden md:flex items-center">
            <a
              href="https://bitooqoh.com/explore/ngm-conference-5.0"
              target="_blank"
              rel="noreferrer noopenner"
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
            className="md:hidden p-2 rounded focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </Wrapper>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="bg-white border-t border-gray-100 px-4 pb-4 pt-2 flex flex-col gap-1">
          {navLinks.map((link) => (
            <div key={link.name}>
              <a
                href={link.hasDropdown ? undefined : link.href}
                onClick={() => {
                  if (link.hasDropdown) {
                    setOpenDropdown(
                      openDropdown === link.name ? null : link.name,
                    );
                  } else {
                    setMenuOpen(false);
                  }
                }}
                className="py-2.5 px-3 text-sm font-semibold text-gray-600 hover:text-[#0F1990] hover:bg-blue-50 rounded-md transition-colors duration-150 tracking-wide flex items-center justify-between cursor-pointer"
              >
                {link.name}
                {link.hasDropdown && (
                  <Image
                    src="/icons/down.svg"
                    alt="dropdown"
                    width={14}
                    height={14}
                    className={`transition-transform duration-200 ${openDropdown === link.name ? "rotate-180" : ""}`}
                  />
                )}
              </a>

              {/* Mobile Dropdown Items */}
              {link.hasDropdown && link.dropdownItems && (
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === link.name ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="mx-3 mb-1 rounded-xl border border-gray-100 overflow-hidden bg-gray-50">
                    {link.dropdownItems.map((item, i) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                        className={`flex items-center px-4 py-3.5 text-sm font-medium font-epilogue text-gray-700 hover:text-[#0DA04C] transition-colors duration-150 ${i !== link.dropdownItems!.length - 1 ? "border-b border-gray-100" : ""}`}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <a
            href="#tickets"
            onClick={() => setMenuOpen(false)}
            className="mt-2 flex items-center justify-center gap-2 bg-[#0F1990] hover:bg-[#1d4ed8] text-white text-sm font-bold px-5 py-3 rounded-md transition-colors duration-200 tracking-wide shadow-md"
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
