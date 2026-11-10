import React from "react";
import { BRAND } from "@/lib/data";

export default function StatsSection() {
  return (
    <section className="py-12 border-y border-slate-800/80 bg-[#080d1a]/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {BRAND.stats.map((stat, i) => (
            <div key={i} className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
