"use client";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const tabs = ["NGM 1.0", "NGM 2.0", "NGM 3.0", "NGM 4.0"];

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("NGM 4.0");
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Navbar />

      <section className="flex flex-col items-center text-center py-16 px-4">
        <p className="text-xs font-semibold tracking-[0.3em] text-gray-500 uppercase mb-4">
          Gallery
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-[#1e2d8f] leading-tight">
          Moments from the
        </h1>
        <div className="relative">
          <h1 className="text-4xl md:text-5xl font-bold text-[#22c55e]">
            NGM Conference
          </h1>
          <svg
            className="absolute -bottom-3 left-0 w-full"
            viewBox="0 0 300 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 8 Q75 0 150 6 Q225 12 300 4"
              stroke="#22c55e"
              strokeWidth="3"
              fill="none"
            />
          </svg>
        </div>
        <p className="mt-8 text-gray-500 text-base">
          Relive some of the best moments from the NGM Conferences
        </p>
      </section>

      <section className="flex justify-center px-4 mb-10">
        <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-[#1e2d8f] text-white"
                  : "text-gray-600 hover:text-[#1e2d8f]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 w-full mb-12">
        <div className="grid grid-cols-3 gap-3">
          {/* Row 1: large left + 2 stacked right */}
          <div className="col-span-2 row-span-2 overflow-hidden rounded-lg bg-gray-200 min-h-[300px]">
            <img src="https://picsum.photos/seed/10/800/600" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/11/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/12/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Row 2: 3 equal */}
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/13/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/14/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/15/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Row 3: large left + 2 stacked right */}
          <div className="col-span-2 row-span-2 overflow-hidden rounded-lg bg-gray-200 min-h-[300px]">
            <img src="https://picsum.photos/seed/16/800/600" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/17/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/18/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>

          {/* Row 4: 3 equal */}
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/19/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/20/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
          <div className="overflow-hidden rounded-lg bg-gray-200 aspect-[4/3]">
            <img src="https://picsum.photos/seed/21/400/300" alt="NGM moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
          </div>
        </div>
      </section>

      <section className="flex items-center justify-between max-w-6xl mx-auto px-4 w-full mb-16">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1e2d8f]"
        >
          Previous
        </button>

        <div className="flex items-center gap-2">
          {[1, 2, 3, "...", 8, 9, 10].map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && setCurrentPage(page)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-[#1e2d8f] text-white"
                  : page === "..."
                  ? "text-gray-400 cursor-default"
                  : "text-gray-600 hover:text-[#1e2d8f]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#1e2d8f]"
        >
          Next
        </button>
      </section>

      <section className="max-w-6xl mx-auto px-4 w-full mb-16">
        <div className="relative rounded-2xl bg-[#1e2d8f] overflow-hidden py-16 px-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold text-white mb-2">
            CTA Heading Text
          </h2>
          <div className="relative mb-4">
            <h2 className="text-3xl font-bold text-[#22c55e]">Here</h2>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 80 8"
              fill="none"
            >
              <path
                d="M0 5 Q20 0 40 4 Q60 8 80 3"
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-blue-200 text-sm mb-8">
            Relive some of the best moments from the NGM Conferences
          </p>
          
           <a href="#"
            className="bg-[#22c55e] text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
          >
            Buy Tickets
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}