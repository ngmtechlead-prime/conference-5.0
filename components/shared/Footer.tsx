import Image from "next/image";
import Link from "next/link";
import React from "react";

const navColumns = [
  {
    heading: "CONFERENCE",
    links: [
      { label: "Speakers", href: "/speakers" },
      { label: "Agenda", href: "/agenda" },
      { label: "Gallery", href: "/gallery" },
    ],
  },
  {
    heading: "COMPETITIONS",
    links: [
      { label: "SME Pitch Competition", href: "/competitions/sme-pitch" },
      {
        label: "NGM X Dr Kola Adesina Competition",
        href: "/competitions/dare-nigeria",
      },
    ],
  },
  {
    heading: "GET INVOLVED",
    links: [
      { label: "Become a Sponsor", href: "#" },
      { label: "Shop Merchandise", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    heading: "SUPPORT",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 pt-24">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="flex-shrink-0 flex flex-col gap-5 lg:w-56">
            <div className="flex items-center gap-4">
              <Link
                href="https://ngmplatform.com"
                target="_blank"
                rel="noreferrer noopenner"
              >
                <Image
                  src="/icons/ngm-logo-white.png"
                  alt="NGM Logo"
                  width={70}
                  height={70}
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
            <p className="text-gray-500 text-sm leading-relaxed">
              The premier convergence of next-generation thinkers, builders, and
              creators.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                {
                  icon: (
                    <Image
                      src="/icons/linkedin.svg"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                    />
                  ),
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/ngm-platform/",
                },
                {
                  icon: (
                    <Image
                      src="/icons/instagram.svg"
                      alt="Instagram"
                      width={24}
                      height={24}
                    />
                  ),
                  label: "Instagram",
                  href: "https://www.instagram.com/ngm.platform?igsh=MTJ3aWtocXlyZHFmdA==",
                },
                {
                  icon: (
                    <Image
                      src="/icons/twitter.svg"
                      alt="Twitter"
                      width={24}
                      height={24}
                    />
                  ),
                  label: "Twitter",
                  href: "https://x.com/NGM_Platform",
                },
                {
                  icon: (
                    <Image
                      src="/icons/facebook.svg"
                      alt="Facebook"
                      width={24}
                      height={24}
                    />
                  ),
                  label: "Facebook",
                  href: "https://www.facebook.com/share/14bg9cLvBbo/",
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 hover:text-[#0F1990] transition-colors duration-150"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {navColumns.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <p className="text-xs font-black text-gray-800 tracking-widest uppercase">
                  {col.heading}
                </p>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-500 text-sm hover:text-[#0F1990] transition-colors duration-150 leading-snug"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pb-12">
        <div className="max-w-7xl mx-auto border-t border-gray-100 pt-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-xs">
            &copy; 2026 Nasir Giwa Mentorship. All Rights Reserved
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 text-xs hover:text-[#0F1990] transition-colors duration-150"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
