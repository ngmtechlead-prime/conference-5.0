import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 pt-12 pb-6 px-6 md:px-16">
      <div className="max-w-6xl mx-auto">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row gap-12 mb-12">
          {/* Logo + Description + Socials */}
          <div className="flex-1 max-w-xs">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-extrabold text-[#1e2d8f]">✳ NGM</span>
              <span className="text-2xl font-extrabold text-[#22c55e]">5.0</span>
              <span className="text-xs text-[#1e2d8f] font-semibold ml-1">CONFERENCE</span>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              The premier convergence of next-generation thinkers, builders, and creators.
            </p>
            {/* Social Icons */}
            <div className="flex gap-4 text-[#1e2d8f]">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="hover:opacity-70 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          <div className="flex flex-1 flex-wrap gap-10">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Conference</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="/speakers" className="hover:text-[#1e2d8f]">Speakers</Link></li>
                <li><Link href="/agenda" className="hover:text-[#1e2d8f]">Agenda</Link></li>
                <li><Link href="/gallery" className="hover:text-[#1e2d8f]">Gallery</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Competitions</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-[#1e2d8f]">SME Pitch Competition</Link></li>
                <li><Link href="#" className="hover:text-[#1e2d8f]">NGM X Dr Kola Adesina Competition</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Get Involved</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-[#1e2d8f]">Become a Sponsor</Link></li>
                <li><Link href="#" className="hover:text-[#1e2d8f]">Shop Merchandise</Link></li>
                <li><Link href="#" className="hover:text-[#1e2d8f]">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-gray-800 mb-4">Support</h4>
              <ul className="flex flex-col gap-3 text-sm text-gray-600">
                <li><Link href="/contact" className="hover:text-[#1e2d8f]">Contact</Link></li>
                <li><Link href="#" className="hover:text-[#1e2d8f]">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-[#1e2d8f]">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
          <p>© 2026 Nasir Giwa Mentorship. All Rights Reserved</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-[#1e2d8f]">Privacy</Link>
            <Link href="#" className="hover:text-[#1e2d8f]">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}