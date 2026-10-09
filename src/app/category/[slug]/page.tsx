"use client";

import React, { useEffect, useState, use, Suspense } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { Product, Category, getProducts, getCategoryBySlug } from "@/lib/api";
import { toBengaliNumber } from "@/lib/bengali";
import { ChevronDown, ArrowLeft, AlertCircle } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

function CategoryContent({ params }: CategoryPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState<"default" | "price-asc" | "price-desc">("default");
  const [sortOpen, setSortOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getCategoryBySlug(slug),
      getProducts(slug),
    ])
      .then(([catData, prodData]) => {
        if (!isMounted) return;
        setCategory(catData);
        // Filter in case API returns all products when category doesn't match
        const filtered = Array.isArray(prodData)
          ? prodData.filter((p) => p.category === slug)
          : [];
        setProducts(filtered);
      })
      .catch(() => {
        if (!isMounted) return;
        setCategory(null);
        setProducts([]);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  // C1: Sort numeric values correctly
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.today - b.today;
    }
    if (sortOption === "price-desc") {
      return b.today - a.today;
    }
    return 0; // default order
  });

  const sortLabels = {
    default: "ডিফল্ট",
    "price-asc": "দাম: কম থেকে বেশি",
    "price-desc": "দাম: বেশি থেকে কম",
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
      <Navbar />
      <PriceTicker />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
        {/* Breadcrumb & Back Link */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-[#05893E] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>সকল পণ্য / হোম</span>
          </Link>
        </div>

        {loading ? (
          <div className="space-y-6">
            <div className="h-10 bg-gray-200 rounded w-64 animate-pulse" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : !category && products.length === 0 ? (
          /* Empty / Invalid state */
          <div className="text-center py-16 bg-white rounded-2xl border border-[#E1E8E1] p-8 max-w-lg mx-auto my-8">
            <div className="w-16 h-16 rounded-full bg-[#FFF6F5] text-[#D03739] flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-[#1D271F] mb-2">
              ক্যাটাগরি পাওয়া যায়নি
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              আপনার অনুরোধকৃত ক্যাটাগরিটি খুঁজে পাওয়া যায়নি অথবা এতে কোনো পণ্য যুক্ত নেই।
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-[#05893E] hover:bg-[#047F39] text-white font-medium text-sm transition-colors shadow-sm"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <div>
            {/* Category Header & Sort Control */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[#E1E8E1]">
              <div className="flex items-center gap-3">
                <span className="text-4xl p-2 bg-[#F0F5F0] rounded-2xl border border-[#E1E8E1]">
                  {category?.icon || "📦"}
                </span>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-[#1D271F]">
                    {category?.nameBn || slug}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                    মোট <span className="font-solaiman font-bold">{toBengaliNumber(products.length)}</span>টি পণ্যের আজকের দাম ও পরিবর্তন
                  </p>
                </div>
              </div>

              {/* Challenge C1: Sort dropdown */}
              <div className="relative self-start sm:self-auto">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-medium">সাজান:</span>
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#E1E8E1] bg-white hover:bg-[#F0F5F0] text-xs font-semibold text-[#1D271F] transition-colors"
                  >
                    <span>{sortLabels[sortOption]}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${sortOpen ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#E1E8E1] py-1 z-30 animate-in fade-in zoom-in-95 duration-150">
                    {(["default", "price-asc", "price-desc"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortOption(opt);
                          setSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-xs transition-colors flex items-center justify-between ${
                          sortOption === opt
                            ? "bg-[#F0F5F0] text-[#05893E] font-bold"
                            : "text-[#1D271F] hover:bg-gray-50 font-medium"
                        }`}
                      >
                        <span>{sortLabels[opt]}</span>
                        {sortOption === opt && <span className="text-[#05893E]">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl border border-[#E1E8E1] p-6">
                <p className="text-gray-500">এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য পাওয়া যায়নি।</p>
                <div className="mt-4">
                  <Link
                    href="/"
                    className="inline-flex px-4 py-2 rounded-lg bg-[#05893E] text-white text-xs font-medium hover:bg-[#047F39]"
                  >
                    হোম পেজে ফিরে যান
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedProducts.map((product) => (
                  <ProductCard key={product.id || product.slug} product={product} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
          <div className="w-full bg-[#FAFCFA] border-b border-[#E1E8E1] h-16 animate-pulse" />
          <div className="flex-1 max-w-6xl w-full mx-auto px-4 py-8">
            <div className="h-10 bg-gray-200 rounded w-64 animate-pulse mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <CategoryContent params={params} />
    </Suspense>
  );
}
