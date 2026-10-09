"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { Category, getCategories } from "@/lib/api";
import { getBengaliDate } from "@/lib/bengali";
import toast from "react-hot-toast";
import { ChevronDown, User, LogOut, Edit3 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [categories, setCategories] = useState<Category[]>([]);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [todayDate] = useState(() => getBengaliDate());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    getCategories()
      .then((cats) => {
        if (mounted && Array.isArray(cats)) {
          setCategories(cats);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("সফলভাবে সাইন আউট হয়েছে!");
      setUserMenuOpen(false);
      router.push("/");
    } catch {
      toast.error("সাইন আউট ব্যর্থ হয়েছে");
    }
  };

  return (
    <header className="w-full bg-[#FAFCFA] border-b border-[#E1E8E1] sticky top-0 z-40">
      {/* Top Main Navbar Row */}
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand Logo & Live Bengali Date */}
        <Link href="/" className="flex flex-col group">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <span className="text-2xl font-bold tracking-tight text-[#05893E] group-hover:text-[#047F39] transition-colors">
              বাজার দর
            </span>
          </div>
          <span className="text-xs text-gray-500 font-medium pl-8">
            {todayDate || "আজকের বাজার দর"}
          </span>
        </Link>

        {/* Right Auth Controls */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E1E8E1] bg-white hover:bg-[#F0F5F0] transition-colors text-sm font-medium text-[#1D271F]"
              >
                <div className="w-7 h-7 rounded-full bg-[#05893E]/10 text-[#05893E] flex items-center justify-center font-bold text-xs overflow-hidden">
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
                <span className="max-w-[120px] truncate">{session.user.name || "প্রোফাইল"}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {/* User Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-[#E1E8E1] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-[#E1E8E1] flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#05893E]/10 text-[#05893E] flex items-center justify-center font-bold text-xs overflow-hidden shrink-0">
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
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-500">লগইন করা আছেন</p>
                      <p className="text-sm font-semibold text-[#1D271F] truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#1D271F] hover:bg-[#F0F5F0] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#05893E]" />
                    <span>আমার প্রোফাইল</span>
                  </Link>

                  <Link
                    href="/profile/edit"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#1D271F] hover:bg-[#F0F5F0] transition-colors"
                  >
                    <Edit3 className="w-4 h-4 text-[#05893E]" />
                    <span>তথ্য পরিবর্তন করুন</span>
                  </Link>

                  <div className="border-t border-[#E1E8E1] my-1" />

                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#D03739] hover:bg-[#FFF6F5] transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>সাইন আউট</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/signin"
                className="px-4 py-2 text-sm font-medium text-[#1D271F] hover:text-[#05893E] hover:bg-[#F0F5F0] rounded-lg transition-colors"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 text-sm font-semibold text-white bg-[#05893E] hover:bg-[#047F39] rounded-lg shadow-sm transition-colors"
              >
                সাইন আপ
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Second Row: Category Pills Scroll Bar */}
      <div className="w-full border-t border-[#E1E8E1] bg-white">
        <div className="max-w-6xl mx-auto px-4 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-2 min-w-max">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                pathname === "/"
                  ? "bg-[#05893E] text-white shadow-sm"
                  : "bg-[#F0F5F0] text-[#1D271F] hover:bg-[#E1E8E1]"
              }`}
            >
              সব পণ্য
            </Link>

            {categories.map((c) => {
              const isActive = pathname === `/category/${c.slug}`;
              return (
                <Link
                  key={c.id || c.slug}
                  href={`/category/${c.slug}`}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#05893E] text-white shadow-sm"
                      : "bg-[#F0F5F0] text-[#1D271F] hover:bg-[#E1E8E1]"
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}
