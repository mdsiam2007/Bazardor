import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-[#E1E8E1] mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left Brand & Motto */}
          <div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="text-xl">🛒</span>
              <span className="text-lg font-bold text-[#05893E]">বাজার দর</span>
            </div>
            <p className="text-sm font-medium text-[#1D271F]">
              বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
            </p>
          </div>

          {/* Right Disclaimer */}
          <div className="max-w-md">
            <p className="text-xs text-gray-500 italic">
              সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
            </p>
          </div>
        </div>

        {/* Bottom Sub-footer */}
        <div className="mt-8 pt-4 border-t border-[#F0F5F0] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2">
          <p>© ২০২৬ বাজার দর (BazarDor). সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-gray-600 transition-colors">
              হোম
            </Link>
            <Link href="/signin" className="hover:text-gray-600 transition-colors">
              লগইন
            </Link>
            <Link href="/signup" className="hover:text-gray-600 transition-colors">
              রেজিস্ট্রেশন
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
