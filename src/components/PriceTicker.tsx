"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Product, getProducts } from "@/lib/api";
import { toBengaliNumber } from "@/lib/bengali";

export default function PriceTicker() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let mounted = true;
    getProducts()
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(() => {});
    return () => {
      mounted = false;
    };
  }, []);

  if (products.length === 0) {
    return (
      <div className="w-full bg-[#F0F5F0] border-y border-[#E1E8E1] py-2 overflow-hidden h-9">
        <div className="max-w-6xl mx-auto px-4 flex items-center text-xs text-gray-500 animate-pulse">
          বাজার দর লোড হচ্ছে...
        </div>
      </div>
    );
  }

  // Duplicate items to ensure smooth infinite marquee looping
  const displayItems = [...products, ...products];

  return (
    <div className="w-full bg-[#F0F5F0] border-y border-[#E1E8E1] py-2 overflow-hidden relative select-none">
      <div className="flex animate-marquee hover:[animation-play-state:paused]">
        {displayItems.map((p, idx) => {
          const isUp = p.change?.dir === "up";
          const isDown = p.change?.dir === "down";
          const unitBn = p.unit === "kg" ? "কেজি" : p.unit === "liter" ? "লিটার" : p.unit === "dozen" ? "ডজন" : p.unit === "piece" ? "পিস" : p.unit;

          return (
            <Link
              key={`${p.id}-${idx}`}
              href={`/product/${p.slug}`}
              className="inline-flex items-center gap-2 mx-4 text-xs whitespace-nowrap text-[#1D271F] hover:text-[#05893E] transition-colors"
            >
              <span className="text-sm">{p.image || "📦"}</span>
              <span className="font-medium">{p.nameBn}</span>
              <span className="text-gray-600 font-semibold">
                {toBengaliNumber(p.today)} টাকা/{unitBn}
              </span>
              <span
                className={`font-bold px-1.5 py-0.5 rounded text-[11px] ${
                  isUp
                    ? "text-[#1A9951] bg-[#F3FBF4]"
                    : isDown
                    ? "text-[#D03739] bg-[#FFF6F5]"
                    : "text-gray-600 bg-gray-100"
                }`}
              >
                {isUp ? "▲ " : isDown ? "▼ " : "— "}
                {toBengaliNumber(p.change?.pct || 0)}%
              </span>
              <span className="text-[#E1E8E1] ml-2">|</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
