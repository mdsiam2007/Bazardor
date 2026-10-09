import React, { Suspense } from "react";
import Navbar from "@/components/Navbar";
import PriceTicker from "@/components/PriceTicker";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import Footer from "@/components/Footer";
import { getProducts, Product } from "@/lib/api";
import { ArrowUpRight, ArrowDownRight, Layers } from "lucide-react";

async function ProductsSections() {
  let products: Product[] = [];
  try {
    products = await getProducts();
  } catch {
    // Graceful error fallback
    products = [];
  }

  // Risers: dir === 'up', sorted by pct descending, top 6
  const risers = products
    .filter((p) => p.change?.dir === "up")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  // Fallers: dir === 'down', sorted by pct descending, top 6
  const fallers = products
    .filter((p) => p.change?.dir === "down")
    .sort((a, b) => (b.change?.pct || 0) - (a.change?.pct || 0))
    .slice(0, 6);

  return (
    <div className="space-y-12 py-10">
      {/* Section A: আজ দাম বেড়েছে ▲ */}
      {risers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#F3FBF4] text-[#1A9951] flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F] flex items-center gap-2">
                  <span>আজ দাম বেড়েছে</span>
                  <span className="text-[#1A9951] text-lg font-bold">▲</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  যেসব পণ্যের দাম আজকের বাজারে ঊর্ধ্বমুখী (শীর্ষ ৬টি)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section B: আজ দাম কমেছে ▼ */}
      {fallers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#FFF6F5] text-[#D03739] flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F] flex items-center gap-2">
                  <span>আজ দাম কমেছে</span>
                  <span className="text-[#D03739] text-lg font-bold">▼</span>
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  যেসব পণ্যের দাম আজকের বাজারে কমেছে (শীর্ষ ৬টি)
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Section C: সব পণ্য */}
      <section id="সব-পণ্য" className="scroll-mt-24 pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#F0F5F0] text-[#05893E] flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D271F]">
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                বাজারের সকল নিত্যপ্রয়োজনীয় পণ্যের হালনাগাদ তালিকা ও বিস্তারিত দর
              </p>
            </div>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-[#E1E8E1] p-6">
            <p className="text-gray-500">বর্তমানে কোনো পণ্য পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
            {products.map((product) => (
              <ProductCard key={product.id || product.slug} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function LoadingSkeletons() {
  return (
    <div className="space-y-12 py-10">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFCFA]">
      <Navbar />
      <PriceTicker />
      <HeroBanner />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4">
        <Suspense fallback={<LoadingSkeletons />}>
          <ProductsSections />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
