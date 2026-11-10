import React from "react";
import ServicesSection from "@/components/ServicesSection";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/data";
import { CheckCircle2, Sparkles, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: `Digital & Web Engineering Services — ${BRAND.name}`,
  description: "Explore our full-funnel digital capabilities: Next.js Web Development, SEO/AEO, PPC Advertising, Social Media Growth, and Digital PR.",
};

export default function ServicesPage() {
  return (
    <div className="py-12">
      {/* Page Header */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/60 text-xs font-bold text-sky-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Solutions Matrix</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Engineering Scalable <span className="gradient-accent">Digital Moats</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          From modern Next.js edge web architecture to multi-channel customer acquisition, we build ecosystems that command industry leadership.
        </p>
      </div>

      {/* The Core Services Grid */}
      <ServicesSection />

      {/* Case Studies / Industry Focus Strip */}
      <section id="case-studies" className="py-20 border-y border-slate-800/80 bg-[#080d1a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="text-xs font-bold uppercase tracking-widest text-orange-400">
              Industry Verticals We Specialize In
            </div>
            <h2 className="text-3xl font-extrabold text-white">
              Tailored Growth Playbooks Across Sectors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Real Estate & Infrastructure",
                stat: "₹45Cr+",
                desc: "Direct lead generation for premium developments & commercial projects in Delhi NCR.",
              },
              {
                title: "E-commerce & D2C Brands",
                stat: "14.8x ROAS",
                desc: "High-volume conversion optimization on Shopify & Next.js custom storefronts.",
              },
              {
                title: "Higher Education & Coaching",
                stat: "1,500+ Leads/mo",
                desc: "Targeted student counseling and admissions pipelines (e.g. Career Makers).",
              },
              {
                title: "Health, Wellness & Salon",
                stat: "+280% Footfall",
                desc: "Local search dominance, appointment bookings, and localized social campaigns.",
              },
            ].map((v, i) => (
              <div key={i} className="p-6 rounded-2xl glass-card bg-[#0d1424] border border-slate-800">
                <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300 mb-2">
                  {v.stat}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Call to Action */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <ContactForm />
      </div>
    </div>
  );
}
