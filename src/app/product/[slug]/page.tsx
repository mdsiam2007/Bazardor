"use client";

import React, { useEffect, useState, use, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import { Product, getProductByIdOrSlug } from "@/lib/api";
import { toBengaliNumber, formatUnitName } from "@/lib/bengali";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  Store,
  TrendingUp,
  TrendingDown,
  Minus,
  AlertCircle,
  ShieldAlert,
} from "lucide-react";

interface ProductDetailsProps {
  params: Promise<{ slug: string }>;
}

function ProductDetailsContent({ params }: ProductDetailsProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();

  const { data: session, isPending: sessionPending } = useSession();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // Authentication Protection Check
  useEffect(() => {
    if (!sessionPending && !session?.user) {
      toast.error("পণ্যের বিস্তারিত ও বাজার তুলনা দেখতে অনুগ্রহ করে লগইন করুন");
      router.push(`/signin?redirect=/product/${encodeURIComponent(slug)}`);
    }
  }, [session, sessionPending, router, slug]);

  useEffect(() => {
    let isMounted = true;
    getProductByIdOrSlug(slug)
      .then((data) => {
        if (isMounted) {
          setProduct(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setProduct(null);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (sessionPending || (!session?.user && loading)) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
        <Navbar />
        <PriceTicker />
        <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full border-4 border-[#05893E]/20 border-t-[#05893E] animate-spin mb-4" />
          <p className="text-gray-600 font-medium">নিরাপদ যাচাই ও তথ্য লোড হচ্ছে...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
        <Navbar />
        <PriceTicker />
        <div className="flex-1 max-w-md w-full mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FFF6F5] text-[#D03739] flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D271F] mb-2">সুরক্ষিত পেজ</h2>
          <p className="text-sm text-gray-600 mb-6">
            পণ্যের বাজারভিত্তিক বিশদ বিবরণ দেখতে আপনার অ্যাকাউন্টে লগইন করতে হবে।
          </p>
          <Link
            href={`/signin?redirect=/product/${encodeURIComponent(slug)}`}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-semibold text-sm transition-colors shadow-sm"
          >
            লগইন পেজে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!loading && !product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
        <Navbar />
        <PriceTicker />
        <div className="flex-1 max-w-lg w-full mx-auto px-4 py-20 text-center">
          <div className="w-16 h-16 rounded-full bg-[#FFF6F5] text-[#D03739] flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-[#1D271F] mb-2">পণ্যটি পাওয়া যায়নি</h2>
          <p className="text-sm text-gray-500 mb-6">
            অনুগ্রহ করে নিশ্চিত করুন যে পণ্যের নাম বা আইডিটি সঠিক আছে।
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-medium text-sm transition-colors shadow-sm"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Calculate Market Min, Max, and Avg Prices across all reported markets
  const markets = product?.markets || [];
  const minMarketPrice = markets.length > 0 ? Math.min(...markets.map((m) => m.min)) : product?.today || 0;
  const maxMarketPrice = markets.length > 0 ? Math.max(...markets.map((m) => m.max)) : product?.today || 0;
  const avgMarketPrice = markets.length > 0
    ? Math.round(markets.reduce((acc, m) => acc + (m.min + m.max) / 2, 0) / markets.length)
    : product?.today || 0;

  const priceDiff = (product?.today || 0) - (product?.yesterday || 0);
  const isUp = priceDiff > 0;
  const isDown = priceDiff < 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
      <Navbar />
      <PriceTicker />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#05893E] transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>হোম</span>
          </Link>
          <span>/</span>
          {product?.category && (
            <>
              <Link
                href={`/category/${product.category}`}
                className="hover:text-[#05893E] transition-colors"
              >
                {product.categoryNameBn || product.category}
              </Link>
              <span>/</span>
            </>
          )}
          <span className="font-semibold text-[#1D271F]">{product?.nameBn}</span>
        </div>

        {/* Top Product Summary Banner */}
        <div className="bg-white rounded-2xl border border-[#E1E8E1] p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-[#F0F5F0] border border-[#E1E8E1] flex items-center justify-center text-4xl shadow-inner">
                {product?.image || product?.categoryIcon || "📦"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">
                    {product?.nameBn}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-[#F0F5F0] text-gray-700">
                    {product?.categoryNameBn}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">
                  {formatUnitName(product?.unit)} · বাজার পর্যালোচনা ও তুলনামূলক তালিকা
                </p>
              </div>
            </div>

            {/* Today's Highlighted Price */}
            <div className="sm:text-right w-full sm:w-auto p-4 sm:p-0 rounded-xl bg-[#F0F5F0] sm:bg-transparent">
              <span className="text-xs text-gray-500 block mb-0.5">আজকের গড় খুচরা দর</span>
              <div className="text-3xl font-bold text-[#05893E]">
                {toBengaliNumber(product?.today)} <span className="text-base text-gray-600 font-medium">টাকা</span>
              </div>
              <span className="text-xs text-gray-500">প্রতি {product?.unit === "kg" ? "কেজি" : product?.unit}</span>
            </div>
          </div>

          {/* Yesterday's Price Comparison Line */}
          <div className="mt-6 pt-4 border-t border-[#F0F5F0] flex items-center gap-2 text-xs sm:text-sm">
            {isUp ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#1A9951]">
                <TrendingUp className="w-4 h-4" />
                গতকালের তুলনায় আজ দাম বেড়েছে · {toBengaliNumber(priceDiff)} টাকা
              </span>
            ) : isDown ? (
              <span className="flex items-center gap-1.5 font-semibold text-[#D03739]">
                <TrendingDown className="w-4 h-4" />
                গতকালের তুলনায় আজ দাম কমেছে · {toBengaliNumber(Math.abs(priceDiff))} টাকা
              </span>
            ) : (
              <span className="flex items-center gap-1.5 font-medium text-gray-600">
                <Minus className="w-4 h-4" />
                গতকালের তুলনায় দামে কোনো পরিবর্তন হয়নি
              </span>
            )}
          </div>
        </div>

        {/* Price History & Min/Max Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl border border-[#E1E8E1] p-4 text-center">
            <span className="text-xs text-gray-500 block">গতকালের দাম</span>
            <span className="text-xl font-bold text-[#1D271F] mt-1 block">
              {toBengaliNumber(product?.yesterday)} টাকা
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E1E8E1] p-4 text-center">
            <span className="text-xs text-gray-500 block">গত সপ্তাহে</span>
            <span className="text-xl font-bold text-[#1D271F] mt-1 block">
              {toBengaliNumber(product?.lastWeek)} টাকা
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E1E8E1] p-4 text-center">
            <span className="text-xs text-gray-500 block">সর্বনিম্ন বাজার দর</span>
            <span className="text-xl font-bold text-[#1A9951] mt-1 block">
              {toBengaliNumber(minMarketPrice)} টাকা
            </span>
          </div>

          <div className="bg-white rounded-xl border border-[#E1E8E1] p-4 text-center">
            <span className="text-xs text-gray-500 block">সর্বোচ্চ বাজার দর</span>
            <span className="text-xl font-bold text-[#D03739] mt-1 block">
              {toBengaliNumber(maxMarketPrice)} টাকা
            </span>
          </div>
        </div>

        {/* বাজারভিত্তিক আজকের দাম Table (Figma/Penpot Structure) */}
        <section className="bg-white rounded-2xl border border-[#E1E8E1] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#E1E8E1] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Store className="w-5 h-5 text-[#05893E]" />
              <h2 className="text-lg sm:text-xl font-bold text-[#1D271F]">
                বাজারভিত্তিক আজকের দাম
              </h2>
            </div>
            <span className="text-xs text-gray-500">
              মোট {toBengaliNumber(markets.length)}টি প্রধান বাজার
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#F0F5F0] border-b border-[#E1E8E1] text-[#1D271F] font-semibold text-xs">
                  <th className="py-3 px-4 sm:px-6">বাজারের নাম</th>
                  <th className="py-3 px-4 sm:px-6">বিভাগ</th>
                  <th className="py-3 px-4 sm:px-6 text-right">সর্বনিম্ন দর</th>
                  <th className="py-3 px-4 sm:px-6 text-right">সর্বোচ্চ দর</th>
                  <th className="py-3 px-4 sm:px-6 text-right">গড় দর</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0F5F0]">
                {markets.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-gray-500 text-xs">
                      বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
                    </td>
                  </tr>
                ) : (
                  markets.map((m, idx) => {
                    const avg = Math.round((m.min + m.max) / 2);
                    return (
                      <tr
                        key={`${m.market}-${idx}`}
                        className="hover:bg-[#FAFCFA] transition-colors text-xs sm:text-sm"
                      >
                        <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#1D271F]">
                          {m.market}
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-gray-600">
                          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-xs font-medium">
                            {m.division}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-[#1A9951]">
                          {toBengaliNumber(m.min)} টাকা
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right font-medium text-[#D03739]">
                          {toBengaliNumber(m.max)} টাকা
                        </td>
                        <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-[#1D271F]">
                          {toBengaliNumber(avg)} টাকা
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ProductDetailsPage({ params }: ProductDetailsProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
          <div className="w-full bg-[#FAFCFA] border-b border-[#E1E8E1] h-16 animate-pulse" />
          <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-16 flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-4 border-[#05893E]/20 border-t-[#05893E] animate-spin mb-4" />
            <p className="text-gray-600 font-medium">তথ্য লোড হচ্ছে...</p>
          </div>
        </div>
      }
    >
      <ProductDetailsContent params={params} />
    </Suspense>
  );
}
