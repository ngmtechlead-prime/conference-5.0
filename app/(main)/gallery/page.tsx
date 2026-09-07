"use client";
import { useState } from "react";
import Image from "next/image";

const tabs = ["NGM 1.0", "NGM 2.0", "NGM 3.0", "NGM 4.0"];

const conferenceImages = [
  "/gallery/conference/DSC08143-scaled.webp",
  "/gallery/conference/DSC08147-scaled.webp",
  "/gallery/conference/DSC08151-scaled.webp",
  "/gallery/conference/DSC08169-scaled.webp",
  "/gallery/conference/DSC08171-scaled.webp",
  "/gallery/conference/DSC08173-scaled.webp",
  "/gallery/conference/DSC08178-scaled.webp",
  "/gallery/conference/DSC08179-scaled.webp",
  "/gallery/conference/DSC08184-scaled.webp",
  "/gallery/conference/DSC08207-scaled.webp",
  "/gallery/conference/DSC08209-scaled.webp",
  "/gallery/conference/DSC08210-scaled.webp",
  "/gallery/conference/DSC08232-scaled.webp",
  "/gallery/conference/DSC08238-scaled.webp",
  "/gallery/conference/DSC08272-scaled.webp",
  "/gallery/conference/DSC08280-scaled.webp",
  "/gallery/conference/DSC08289-scaled.webp",
  "/gallery/conference/DSC08294-scaled.webp",
  "/gallery/conference/DSC08312-scaled.webp",
  "/gallery/conference/DSC08323-scaled.webp",
  "/gallery/conference/DSC08326-scaled.webp",
];

const imagesByTab: Record<string, string[]> = {
  "NGM 4.0": conferenceImages,
  "NGM 1.0": conferenceImages,
  "NGM 2.0": conferenceImages,
  "NGM 3.0": conferenceImages,
};

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("NGM 4.0");

  const images = imagesByTab[activeTab] ?? [];

  return (
    <div className="flex flex-col min-h-screen font-sans">
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

      <section className="max-w-6xl mx-auto px-4 w-full mb-16">
        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400">
            <p className="text-lg font-medium">No photos yet</p>
            <p className="text-sm mt-1">Check back after the event!</p>
          </div>
        ) : (
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3">
            {images.map((src, index) => (
              <div
                key={src}
                className="break-inside-avoid mb-3 overflow-hidden rounded-lg bg-gray-100"
              >
                <Image
                  src={src}
                  alt={`NGM Conference moment ${index + 1}`}
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-6xl mx-auto px-4 w-full mb-16">
        <div className="relative rounded-2xl bg-[#1e2d8f] overflow-hidden py-16 px-8 flex flex-col items-center text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-blue-300 uppercase mb-4">
            NGM Conference 5.0
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2">
            Be part of the next chapter
          </h2>
          <div className="relative mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#22c55e]">
              Join Us Live
            </h2>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 120 8"
              fill="none"
            >
              <path
                d="M0 5 Q30 0 60 4 Q90 8 120 3"
                stroke="#22c55e"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
          <p className="text-blue-200 text-sm mb-8 max-w-sm mt-2">
            Inspired by what you saw? Experience it in person at the NGM
            Conference 5.0.
          </p>
          <a
            href="https://bitooqoh.com/explore/ngm-conference-5.0"
            target="_blank"
            rel="noreferrer noopener"
            className="bg-[#22c55e] text-white px-8 py-3 rounded-md font-semibold hover:bg-green-600 transition-colors"
          >
            Get Your Ticket
          </a>
        </div>
      </section>
    </div>
  );
}
