"use client";

import React from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function HeroBanner() {
  const scrollToProducts = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("সব-পণ্য");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="w-full bg-[#FAFCFA] py-8 sm:py-12 border-b border-[#E1E8E1]">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Content Column */}
        <div className="flex-1 max-w-xl text-left">
          {/* Eyebrow Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F5F0] border border-[#E1E8E1] text-xs font-semibold text-[#05893E] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1A9951] animate-ping" />
            আজকের বাজারের দাম এক নজরে
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D271F] leading-tight mb-4">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-gray-600 mb-8 leading-relaxed">
            প্রতিদিনের বাজার দর জানুন সবার আগে। সঠিক ও নির্ভুল তথ্য নিয়ে আমরা আছি আপনার পাশে।
          </p>

          {/* CTA Button */}
          <div>
            <a
              href="#সব-পণ্য"
              onClick={scrollToProducts}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-semibold text-base shadow-sm hover:shadow transition-all group cursor-pointer"
            >
              <span>সব পণ্য দেখুন</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>

        {/* Right Hero Image */}
        <div className="flex-1 flex justify-center md:justify-end relative w-full max-w-md md:max-w-none">
          <div className="relative w-full aspect-[4/3] max-w-[420px] rounded-2xl overflow-hidden shadow-sm border border-[#E1E8E1] bg-white flex items-center justify-center p-4">
            <Image
              src="/images/bazar-hero.png"
              alt="বাজার দর হিরো ব্যানার"
              width={420}
              height={315}
              priority
              className="object-contain w-full h-auto max-h-[300px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
