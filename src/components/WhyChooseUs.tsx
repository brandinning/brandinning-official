import React from "react";
import { 
  BarChart3, 
  Users2, 
  ShieldCheck, 
  Cpu, 
  Clock, 
  Layers 
} from "lucide-react";

const REASONS = [
  {
    icon: <BarChart3 className="w-6 h-6 text-orange-400" />,
    title: "Unit-Economics & ROI Discipline",
    desc: "We don't chase vanity metrics like arbitrary impressions. Every campaign and web feature is tied to pipeline value, CAC reduction, and bottom-line revenue.",
  },
  {
    icon: <Cpu className="w-6 h-6 text-sky-400" />,
    title: "Next-Gen Engineering Stack",
    desc: "Legacy monolithic CMS setups suffer from slow speeds, plugin bloat, and security flaws. We build on Next.js, React, and Edge Vercel infrastructure.",
  },
  {
    icon: <Users2 className="w-6 h-6 text-indigo-400" />,
    title: "Dedicated Strategic Squads",
    desc: "No junior hand-offs or generic tickets. You work with senior strategists, full-stack engineers, and direct performance media buyers.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "100% IP & Data Ownership",
    desc: "All code repositories, ad accounts, creative assets, and analytics setups remain 100% owned by your company. No lock-in, ever.",
  },
  {
    icon: <Clock className="w-6 h-6 text-amber-400" />,
    title: "12+ Years Proven Track Record",
    desc: "Founded in 2012, we have navigated every Google algorithm update and ad platform shift, consistently helping brands outrank competition.",
  },
  {
    icon: <Layers className="w-6 h-6 text-pink-400" />,
    title: "Dual Presence: India & USA",
    desc: "Seamless cross-border capabilities with our Delhi NCR headquarters in Noida and our US branch in Cape Coral, Florida.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#070b16] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-orange-400 font-bold px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800/60">
            Why Leading Brands Choose Us
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Engineered for <span className="gradient-accent">Measurable Advantage</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            See how our technical rigor and performance focus separates BrandInning from conventional agencies.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {REASONS.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-2xl glass-card bg-[#0b101f]/80 border border-slate-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-white">
                {r.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
