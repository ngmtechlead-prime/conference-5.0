"use client";

import Image from "next/image";
import React, { useState } from "react";

const inputClass =
  "w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent transition";

const labelClass = "block text-xs font-semibold text-gray-600 mb-1.5";

const sectors = [
  "Agriculture",
  "Health",
  "Education",
  "Fintech",
  "Energy",
  "Climate/Environment",
  "Social Enterprise",
];

const ages = Array.from({ length: 23 }, (_, i) => i + 18);

export default function ApplyNow() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: "",
    state: "",
    isNigerian: "",
    teamOrIndividual: "",
    sector: "",
    idea: "",
    raisedFunding: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <section id="apply" className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
        {/* Left – CTA copy (~35% width) */}
        <div className="w-full lg:w-[35%] flex-shrink-0">
          <h2 className="text-3xl sm:text-4xl font-normal text-[#1e3a8a] leading-tight mb-5">
            Ready to{" "}
            <span className="relative inline-block font-black italic text-[#16a34a]">
              Dare?
              <Image src="/icons/zap.svg" alt="zap" width={100} height={20} />
            </span>
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            Applications close May 31, 2026. The Grand Finale is October 3, 2026
            at NGM Conference 5.0. This is your moment — don&apos;t wait.
          </p>

          <div>
            <p className="text-gray-400 text-xs mb-1">Have questions?</p>
            <a
              href="mailto:info@ngmplatform.com"
              className="text-[#16a34a] font-semibold text-sm hover:underline"
            >
              info@ngmplatform.com
            </a>
          </div>
        </div>

        {/* Right – Form card (~65% width) */}
        <div className="w-full lg:w-[65%] border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Doe"
                value={form.fullName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="+234..."
                value={form.phone}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Age</label>
              <select
                name="age"
                value={form.age}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Age</option>
                {ages.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>State of Residence</label>
              <input
                type="text"
                name="state"
                placeholder="e.g. Lagos"
                value={form.state}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Are you Nigerian?</label>
              <select
                name="isNigerian"
                value={form.isNigerian}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Team or Individual?</label>
              <select
                name="teamOrIndividual"
                value={form.teamOrIndividual}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="individual">Individual</option>
                <option value="team">Team (up to 3 members)</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Innovation Sector</label>
              <select
                name="sector"
                value={form.sector}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select Sector</option>
                {sectors.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>
                One-Line Description of Your Idea{" "}
                <span className="text-gray-400 font-normal">
                  (100 words max)
                </span>
              </label>
              <textarea
                name="idea"
                placeholder="Describe your bold idea..."
                value={form.idea}
                onChange={handleChange}
                rows={4}
                maxLength={600}
                className={`${inputClass} resize-none`}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>
                Have you raised institutional funding? (VC, PE)
              </label>
              <select
                name="raisedFunding"
                value={form.raisedFunding}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select</option>
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
              <p
                className="text-gray-400 text-xs mt-1.5"
                style={{
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Note: Selecting &apos;Yes&apos; auto-disqualifies you from this
                specific challenge.
              </p>
            </div>

            <div className="sm:col-span-2 mt-1">
              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 bg-[#1e3a8a] hover:bg-[#1d4ed8] text-white font-bold text-sm px-6 py-4 rounded-lg transition-colors duration-200 tracking-wide shadow-md"
                style={{
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                Apply Now
                <Image
                  src="/icons/rightArrow.svg"
                  alt="right"
                  width={16}
                  height={16}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
