import React from "react";
import Link from "next/link";
import { Product } from "@/lib/api";
import { toBengaliNumber, formatUnitName } from "@/lib/bengali";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isUp = product.change?.dir === "up";
  const isDown = product.change?.dir === "down";
  const changePct = toBengaliNumber(product.change?.pct ?? 0);

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group bg-white rounded-xl border border-[#E1E8E1] hover:border-[#05893E]/60 p-4 transition-all duration-200 hover:shadow-md flex flex-col justify-between"
    >
      {/* Top Part: Icon, Name & Unit */}
      <div className="flex items-start gap-3">
        {/* Emoji Container */}
        <div className="w-12 h-12 rounded-xl bg-[#F0F5F0] group-hover:bg-[#E1E8E1] transition-colors flex items-center justify-center text-2xl flex-shrink-0">
          {product.image || product.categoryIcon || "📦"}
        </div>

        {/* Name & Unit */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-[#1D271F] group-hover:text-[#05893E] transition-colors truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500 mt-0.5">
            {formatUnitName(product.unit)}
          </p>
        </div>

        {/* Category Pill */}
        {product.categoryNameBn && (
          <span className="text-[11px] font-medium text-gray-500 bg-[#F0F5F0] px-2 py-0.5 rounded-full whitespace-nowrap">
            {product.categoryNameBn}
          </span>
        )}
      </div>

      {/* Bottom Part: Price & Change badge */}
      <div className="mt-4 pt-3 border-t border-[#F0F5F0] flex items-center justify-between">
        <div>
          <span className="text-xs text-gray-500 block">আজকের দাম</span>
          <span className="text-lg font-bold text-[#1D271F]">
            {toBengaliNumber(product.today)} টাকা
          </span>
        </div>

        {/* Change Badge */}
        <div
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
            isUp
              ? "bg-[#F3FBF4] text-[#1A9951]"
              : isDown
              ? "bg-[#FFF6F5] text-[#D03739]"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "—"}</span>
          <span>{changePct}%</span>
        </div>
      </div>
    </Link>
  );
}
