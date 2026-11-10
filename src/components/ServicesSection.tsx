import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { 
  Code2, 
  TrendingUp, 
  Target, 
  Share2, 
  Megaphone, 
  ArrowRight, 
  Check 
} from "lucide-react";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-6 h-6 text-sky-400" />,
  TrendingUp: <TrendingUp className="w-6 h-6 text-emerald-400" />,
  Target: <Target className="w-6 h-6 text-orange-400" />,
  Share2: <Share2 className="w-6 h-6 text-indigo-400" />,
  Megaphone: <Megaphone className="w-6 h-6 text-amber-400" />,
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-block text-xs uppercase tracking-widest text-sky-400 font-bold px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/60">
            Full-Funnel Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Integrated Solutions Built for <span className="text-sky-400">Scale</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg">
            We don’t do fragmented tactics. We align development, organic search, and performance acquisition into one unified growth engine.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BRAND.services.map((service) => (
            <div
              key={service.id}
              id={service.id}
              className="glass-card rounded-2xl p-8 flex flex-col justify-between border border-slate-800 bg-[#0d1424]/70 hover:border-sky-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                    {ICON_MAP[service.icon] || <Code2 className="w-6 h-6 text-sky-400" />}
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700/60">
                    {service.badge}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">
                  {service.shortDesc}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-800/80 mb-8">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-white bg-slate-800/80 hover:bg-sky-600 transition-colors border border-slate-700/80 hover:border-sky-500"
                >
                  <span>Request Proposal for This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
