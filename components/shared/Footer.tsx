import Image from "next/image";
import React from "react";

const navColumns = [
  {
    heading: "CONFERENCE",
    links: ["Speakers", "Agenda", "Gallery"],
  },
  {
    heading: "COMPETITIONS",
    links: ["SME Pitch Competition", "NGM X Dr Kola Adesina Competition"],
  },
  {
    heading: "GET INVOLVED",
    links: ["Become a Sponsor", "Shop Merchandise", "Pricing"],
  },
  {
    heading: "SUPPORT",
    links: ["Contact", "Privacy Policy", "Terms & Conditions"],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100">
      {/* Main footer body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          {/* Brand column */}
          <div className="flex-shrink-0 flex flex-col gap-5 lg:w-56">
            <Image
              src="/icons/NGMLogo.svg"
              alt="NGM Logo"
              width={190}
              height={40}
            />
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
                  href: "#",
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
                  href: "#",
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
                  href: "#",
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
                  href: "#",
                },
              ].map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-gray-400 hover:text-[#1e3a8a] transition-colors duration-150"
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
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-500 text-sm hover:text-[#1e3a8a] transition-colors duration-150 leading-snug"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-400 text-xs">
            © 2026 Nasir Giwa Mentorship. All Rights Reserved
          </p>
          <div className="flex items-center gap-5">
            {["Privacy", "Terms"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-500 text-xs hover:text-[#1e3a8a] transition-colors duration-150"
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
