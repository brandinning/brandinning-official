import React from "react";
import { BRAND } from "@/lib/data";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-emerald-400 font-bold px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            Client Success & ROI
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Trusted by Founders, CMOs & Growth Leaders
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BRAND.testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl glass-card bg-[#0c1322]/80 border border-slate-800 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-6 text-amber-400">
                  {[...Array(t.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-sky-500/20 mb-4" />
                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800/80">
                <div className="text-sm font-bold text-white">{t.author}</div>
                <div className="text-xs text-sky-400">{t.role}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
