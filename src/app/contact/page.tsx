import React from "react";
import ContactForm from "@/components/ContactForm";
import { BRAND } from "@/lib/data";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: `Contact Us & Request Proposal — ${BRAND.name}`,
  description: `Get in touch with BrandInning. Speak to our technical leadership in Noida, India (${BRAND.contact.indiaPhone}) or Cape Coral, Florida (${BRAND.contact.usaPhone}).`,
};

export default function ContactPage() {
  return (
    <div className="py-12">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-4 mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800/60 text-xs font-bold text-orange-400 uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Confidential Consultation</span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Let’s Talk <span className="gradient-accent">Results & Growth</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you need a full Next.js rebuild, organic search overhaul, or high-ROAS paid acquisition, our technical strategists are ready.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-20">
        <ContactForm />
      </div>
    </div>
  );
}
