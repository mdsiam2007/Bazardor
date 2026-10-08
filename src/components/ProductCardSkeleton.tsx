import React from "react";

export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#E1E8E1] p-4 animate-pulse flex flex-col justify-between h-[138px]">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-xl bg-gray-200 flex-shrink-0" />
        <div className="flex-1 space-y-2 py-1">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-100 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-[#F0F5F0] flex items-center justify-between">
        <div className="space-y-1">
          <div className="h-3 bg-gray-100 rounded w-12" />
          <div className="h-5 bg-gray-200 rounded w-16" />
        </div>
        <div className="h-6 bg-gray-200 rounded-full w-14" />
      </div>
    </div>
  );
}
