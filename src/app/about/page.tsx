import React from "react";
import { BRAND } from "@/lib/data";
import StatsSection from "@/components/StatsSection";
import ContactForm from "@/components/ContactForm";
import { MapPin, Globe, Award, ShieldCheck, Sparkles, Building2 } from "lucide-react";

export const metadata = {
  title: `About Us — ${BRAND.name}`,
  description: `Learn about BrandInning's journey since ${BRAND.foundedYear}, our technical leadership, and our offices in Noida, India & Cape Coral, Florida.`,
};

export default function AboutPage() {
  return (
    <div className="py-12">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/60 border border-sky-800/60 text-xs font-bold text-sky-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Story & Mission</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Pioneering Digital Growth <br />
          <span className="gradient-accent">Since {BRAND.foundedYear}</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Founded with a clear mandate: bridge the gap between technical web engineering and ruthless commercial performance marketing.
        </p>
      </div>

      {/* Metrics */}
      <StatsSection />

      {/* Story & Philosophy */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Why BrandInning Exists
            </h2>
            <p>
              Too many businesses are held back by fragmented agencies: web developers who don’t understand conversion rate optimization, and ad agencies that don’t understand technical site architecture or code performance.
            </p>
            <p>
              At BrandInning, our cross-disciplinary teams unify modern React & Next.js web application architecture with algorithmic search intelligence (SEO & AEO) and performance acquisition.
            </p>
            <p>
              We measure our success not by hours logged, but by the tangible commercial enterprise value we create for our clients across India, the United States, and international markets.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-white mb-1">500+</div>
                <div className="text-xs text-slate-400">Campaigns & Projects Executed</div>
              </div>
              <div className="p-4 rounded-xl glass-panel bg-slate-900 border border-slate-800">
                <div className="text-xl font-bold text-emerald-400 mb-1">100%</div>
                <div className="text-xs text-slate-400">White-Hat & Sustainable Growth</div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-8 rounded-3xl glass-card bg-[#0d1424] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-sky-950/80 border border-sky-800/80 flex items-center justify-center text-sky-400">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Dual Global Presence</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Operating out of our primary technical development center in Noida (Delhi NCR, India) and our regional presence in Cape Coral (Florida, USA), we offer round-the-clock responsiveness and global standard execution.
              </p>
            </div>

            <div className="p-8 rounded-3xl glass-card bg-[#0d1424] border border-slate-800 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-orange-950/80 border border-orange-800/80 flex items-center justify-center text-orange-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">Full IP Protection & Independence</h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                We believe in total transparency. All codebase assets, Git repositories, domain records, and analytics setups are directly owned by your organization with zero vendor lock-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices Section */}
      <section className="py-16 bg-[#070b16] border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">Our Strategic Offices</h2>
            <p className="text-sm text-slate-400 mt-2">Where code and performance campaigns are engineered</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 rounded-2xl glass-card bg-[#0b101f] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
                <MapPin className="w-4 h-4" />
                <span>Noida Headquarters (India)</span>
              </div>
              <div className="text-white font-semibold text-base">{BRAND.contact.indiaAddress}</div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Phone: <span className="text-white">{BRAND.contact.indiaPhone}</span>
              </div>
            </div>

            <div className="p-8 rounded-2xl glass-card bg-[#0b101f] border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-bold text-sm">
                <Globe className="w-4 h-4" />
                <span>Cape Coral Branch (USA)</span>
              </div>
              <div className="text-white font-semibold text-base">{BRAND.contact.usaAddress}</div>
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                Phone: <span className="text-white">{BRAND.contact.usaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form CTA */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        <ContactForm />
      </div>
    </div>
  );
}
