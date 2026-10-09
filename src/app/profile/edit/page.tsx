"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { useSession, authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { ArrowLeft, User, Loader2, CheckCircle2 } from "lucide-react";

interface UserData {
  name?: string | null;
  email?: string | null;
  image?: string | null;
}

function EditForm({ user }: { user: UserData }) {
  const router = useRouter();
  const [name, setName] = useState(user.name || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("নামের ঘরটি খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    try {
      // Challenge C3: Update Information using Better Auth updateUser
      const res = await authClient.updateUser({
        name: name.trim(),
      });

      if (res.error) {
        toast.error(res.error.message || "তথ্য আপডেট করা সম্ভব হয়নি");
      } else {
        toast.success("প্রোফাইলের তথ্য সফলভাবে আপডেট করা হয়েছে!");
        router.push("/profile");
        router.refresh();
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "তথ্য আপডেট করতে সমস্যা হয়েছে";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-5">
      {/* Current Avatar Display */}
      <div className="flex items-center gap-3.5 pb-2">
        <div className="w-14 h-14 rounded-full bg-[#05893E]/10 text-[#05893E] flex items-center justify-center font-bold text-xl border border-[#05893E]/20 shadow-sm overflow-hidden shrink-0">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-full h-full object-cover rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            user.name ? user.name.charAt(0).toUpperCase() : "U"
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#1D271F]">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#1D271F] mb-1.5">
          আপনার নাম (Name)
        </label>
        <div className="relative">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="আপনার পূর্ণ নাম লিখুন"
            required
            className="w-full px-3.5 py-2.5 pl-10 text-sm rounded-xl border border-[#E1E8E1] focus:border-[#05893E] focus:outline-none focus:ring-2 focus:ring-[#05893E]/20 transition-all text-[#1D271F]"
          />
          <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
        </div>
      </div>

      {/* Read-only Email display */}
      <div>
        <label className="block text-xs font-semibold text-gray-400 mb-1.5">
          ইমেইল (পরিবর্তনযোগ্য নয়)
        </label>
        <input
          type="email"
          value={user.email || ""}
          disabled
          className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-[#E1E8E1] bg-gray-50 text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 px-4 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-semibold text-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-6"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>তথ্য আপডেট হচ্ছে...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span>তথ্য আপডেট করুন</span>
          </>
        )}
      </button>
    </form>
  );
}

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("অনুগ্রহ করে প্রথমে লগইন করুন");
      router.push("/signin?redirect=/profile/edit");
    }
  }, [session, isPending, router]);

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

      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#05893E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>প্রোফাইলে ফিরে যান</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-6 sm:p-8 shadow-sm">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-[#1D271F]">
              তথ্য পরিবর্তন করুন
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              আপনার অ্যাকাউন্টের নাম সংশোধন বা হালনাগাদ করুন
            </p>
          </div>

          <EditForm user={session.user} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
