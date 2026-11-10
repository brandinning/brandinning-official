import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  ShieldCheck, 
  Zap 
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32">
      {/* Background Decorative Glow Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-sky-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Eyebrow Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-sky-500/30 text-xs font-semibold text-sky-300">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span>Premier Growth & Next.js Web Engineering Agency</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Turn Your Brand Into an <br />
            <span className="gradient-accent">Unstoppable Engine</span> of Growth.
          </h1>

          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto font-normal">
            We build blazing-fast modern web applications, scale revenue through high-ROI performance marketing, and dominate organic search with cutting-edge SEO & AEO.
          </p>

          {/* Call to Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 rounded-full shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.03] transition-all"
            >
              <span>Schedule Free Strategy Audit</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-200 glass-panel rounded-full hover:bg-slate-800/80 hover:text-white transition-all border border-slate-700/60"
            >
              <span>Explore Our Services</span>
            </Link>
          </div>

          {/* Quick Micro-Proofs */}
          <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>100% Core Web Vitals Pass Rate</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Transparent Real-Time Dashboards</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Enterprise Vercel & Cloud Scalability</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
