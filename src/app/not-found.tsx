import React from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { AlertCircle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
      <Navbar />
      <PriceTicker />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-md w-full bg-white rounded-2xl border border-[#E1E8E1] p-8 sm:p-12 shadow-sm">
          <div className="w-20 h-20 rounded-full bg-[#FFF6F5] text-[#D03739] flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-10 h-10" />
          </div>

          <span className="text-4xl font-extrabold text-[#05893E] tracking-tight block mb-2">
            ৪০৪
          </span>

          <h1 className="text-2xl font-bold text-[#1D271F] mb-3">
            পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h1>

          <p className="text-sm text-gray-500 mb-8 leading-relaxed">
            আপনি যে পেজটিতে যাওয়ার চেষ্টা করছেন তা হয়তো সরানো হয়েছে অথবা এর লিঙ্কটি সঠিক নয়।
          </p>

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-semibold text-sm transition-all shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
