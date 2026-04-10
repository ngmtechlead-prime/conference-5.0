"use client";

import Image from "next/image";
import React, { useState } from "react";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  business: string;
  year: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "Winning the SME Pitch Competition was a turning point for my business. The funding helped us expand to three new states, and the mentorship was invaluable.",
    name: "Adebayo Ogunleye",
    business: "AgriTech Solutions",
    year: "2024 Winner",
    image: "/gallery/testimonial-1.png",
  },
  {
    id: 2,
    quote:
      "The connections I made through this program opened doors I never thought possible. We&apos;ve since secured additional funding from investors we met at the competition.",
    name: "Fatima Ibrahim",
    business: "EduPlatform NG",
    year: "2023 Winner",
    image: "/gallery/testimonial-2.png",
  },
  {
    id: 3,
    quote:
      "Beyond the prize money, the business training and exposure transformed how we approach growth. Our revenue has tripled since winning.",
    name: "Chukwuemeka Nwosu",
    business: "CleanEnergy Co",
    year: "2024 Runner-up",
    image: "/gallery/testimonial-3.png",
  },
];

export default function PastWinners() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="w-full bg-[#f8fafc] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-10 font-epilogue">
        {/* Heading */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#0F1990] leading-tight mb-3">
            Hear from our past{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Winners
              <Image
                src="/icons/zapWin.svg"
                alt="Winners"
                width={120}
                height={100}
                className="absolute left-0 bottom-[-8px]"
              />
            </span>
          </h2>
        </div>

        {/* Testimonials */}
        <div className="w-full flex flex-col lg:flex-row gap-6 items-stretch">
          {/* Main Testimonial */}
          <div className="flex-1 bg-[#0F1990] rounded-2xl p-8 text-white flex flex-col justify-between">
            <div>
              <svg
                className="w-10 h-10 text-[#16a34a] mb-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="text-lg leading-relaxed mb-6">
                {testimonials[activeIndex].quote}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-white/20 overflow-hidden">
                <Image
                  src={testimonials[activeIndex].image}
                  alt={testimonials[activeIndex].name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-bold">{testimonials[activeIndex].name}</p>
                <p className="text-blue-200 text-sm">
                  {testimonials[activeIndex].business}
                </p>
                <p className="text-[#16a34a] text-sm font-semibold">
                  {testimonials[activeIndex].year}
                </p>
              </div>
            </div>
          </div>

          {/* Testimonial Thumbnails */}
          <div className="flex lg:flex-col gap-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                onClick={() => setActiveIndex(index)}
                className={`relative w-24 h-24 lg:w-32 lg:h-32 rounded-xl overflow-hidden transition-all duration-200 ${
                  activeIndex === index
                    ? "ring-4 ring-[#16a34a] scale-105"
                    : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Arrows */}
        <div className="flex gap-4">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 rounded-full border-2 border-[#0F1990] flex items-center justify-center hover:bg-[#0F1990] hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 rounded-full border-2 border-[#0F1990] flex items-center justify-center hover:bg-[#0F1990] hover:text-white transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
