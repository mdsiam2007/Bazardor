"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { User, Mail, Edit3, LogOut, ShieldCheck } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("প্রোফাইল দেখতে অনুগ্রহ করে প্রথমে লগইন করুন");
      router.push("/signin?redirect=/profile");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      router.push("/");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
        <Navbar />
        <PriceTicker />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-[#05893E]/20 border-t-[#05893E] animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
      <Navbar />
      <PriceTicker />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-6 sm:p-10 shadow-sm">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-[#E1E8E1] gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-[#05893E]/10 text-[#05893E] flex items-center justify-center font-bold text-2xl border border-[#05893E]/20 shadow-sm overflow-hidden">
                {session.user.image ? (
                  <img
                    src={session.user.image}
                    alt={session.user.name || "User"}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  session.user.name ? session.user.name.charAt(0).toUpperCase() : "U"
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1D271F] flex items-center gap-2">
                  <span>{session.user.name}</span>
                  <ShieldCheck className="w-5 h-5 text-[#05893E]" />
                </h1>
                <p className="text-xs sm:text-sm text-gray-500">{session.user.email}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {/* Challenge C3: Update button */}
              <Link
                href="/profile/edit"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white text-xs font-semibold shadow-sm transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>তথ্য পরিবর্তন করুন</span>
              </Link>

              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E1E8E1] hover:bg-[#FFF6F5] text-[#D03739] text-xs font-semibold transition-all cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>সাইন আউট</span>
              </button>
            </div>
          </div>

          {/* Account Details */}
          <div className="mt-8 space-y-6">
            <h2 className="text-lg font-bold text-[#1D271F]">অ্যাকাউন্টের তথ্য</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-[#F0F5F0] border border-[#E1E8E1]">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <User className="w-4 h-4 text-[#05893E]" />
                  <span>ব্যবহারকারীর পুরো নাম</span>
                </div>
                <p className="text-base font-bold text-[#1D271F]">{session.user.name}</p>
              </div>

              <div className="p-4 rounded-xl bg-[#F0F5F0] border border-[#E1E8E1]">
                <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                  <Mail className="w-4 h-4 text-[#05893E]" />
                  <span>রেজিস্টার্ড ইমেইল</span>
                </div>
                <p className="text-base font-bold text-[#1D271F] truncate">{session.user.email}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-dashed border-[#E1E8E1] bg-[#FAFCFA] flex items-center justify-between text-xs text-gray-500">
              <span>অ্যাকাউন্ট ভেরিফিকেশন স্ট্যাটাস</span>
              <span className="font-semibold text-[#1A9951] bg-[#F3FBF4] px-2.5 py-1 rounded-full">
                সক্রিয় সদস্য
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
