"use client";

import React, { useState } from "react";
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck 
} from "lucide-react";
import { BRAND } from "@/lib/data";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "Web Engineering & Design",
    budget: "$2,000 - $5,000",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Failed to submit. Please try again or call us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("An unexpected network error occurred. Please try again.");
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      
      {/* Left Info Column */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <div className="inline-block text-xs uppercase tracking-widest text-orange-400 font-bold px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800/60 mb-4">
            Start Your Transformation
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Let’s Engineer Your Next <span className="gradient-accent">Growth Phase</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-base mt-4 leading-relaxed">
            Fill out the form to request a confidential growth proposal or schedule an audit call with our technical leadership.
          </p>
        </div>

        {/* Direct Contacts */}
        <div className="space-y-4 pt-4 border-t border-slate-800/80">
          <div className="flex items-start gap-3 p-4 rounded-xl glass-panel bg-slate-900/60 border border-slate-800">
            <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block mb-0.5">India Global HQ</span>
              <span className="text-slate-400">{BRAND.contact.indiaAddress}</span>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 rounded-xl glass-panel bg-slate-900/60 border border-slate-800">
            <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-white block mb-0.5">USA Branch Office</span>
              <span className="text-slate-400">{BRAND.contact.usaAddress}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a 
              href={`tel:${BRAND.contact.indiaPhone}`}
              className="flex items-center gap-2.5 p-3.5 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-sky-500 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block">India Call</span>
                <span className="font-semibold">{BRAND.contact.indiaPhone}</span>
              </div>
            </a>

            <a 
              href={`tel:${BRAND.contact.usaPhone}`}
              className="flex items-center gap-2.5 p-3.5 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-orange-500 transition-colors"
            >
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <div>
                <span className="text-[10px] text-slate-500 block">USA Call</span>
                <span className="font-semibold">{BRAND.contact.usaPhone}</span>
              </div>
            </a>
          </div>

          <a 
            href={`mailto:${BRAND.contact.email}`}
            className="flex items-center gap-2.5 p-3.5 rounded-xl glass-panel bg-slate-900/60 border border-slate-800 text-xs text-slate-300 hover:text-white hover:border-sky-500 transition-colors"
          >
            <Mail className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <span className="text-[10px] text-slate-500 block">Official Inquiries</span>
              <span className="font-semibold">{BRAND.contact.email}</span>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 text-sky-400" />
          <span>Strict NDA guaranteed. We never sell or share your contact data.</span>
        </div>
      </div>

      {/* Right Form Card */}
      <div className="lg:col-span-7">
        <div className="glass-card rounded-3xl p-8 sm:p-10 border border-slate-800 bg-[#0d1424]/90 shadow-2xl relative">
          
          {status === "success" ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white">Proposal Request Received!</h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
                Thank you for reaching out to BrandInning. Our senior technical strategist will review your inquiry and contact you within 24 hours.
              </p>
              <button
                onClick={() => {
                  setStatus("idle");
                  setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    company: "",
                    service: "Web Engineering & Design",
                    budget: "$2,000 - $5,000",
                    message: "",
                  });
                }}
                className="mt-6 inline-flex px-6 py-2.5 text-xs font-bold text-sky-400 border border-sky-500/40 rounded-full hover:bg-sky-500/10 transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 99536 33395"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Company / Website URL
                  </label>
                  <input
                    type="text"
                    placeholder="yourbrand.com"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Primary Service Needed
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                  >
                    {BRAND.services.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Full Integrated Retainer">Full Integrated Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                    Estimated Monthly Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-sky-500 transition-all"
                  >
                    <option value="Under $2,000">Under $2,000 (₹1.5 Lakhs)</option>
                    <option value="$2,000 - $5,000">$2,000 - $5,000 (₹1.5 - ₹4 Lakhs)</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000 (₹4 - ₹8 Lakhs)</option>
                    <option value="$10,000+">$10,000+ (₹8 Lakhs+)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Project Brief & Current Challenges
                </label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your objectives, current conversion rates, or timeline..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 transition-all"
                />
              </div>

              {status === "error" && (
                <div className="flex items-center gap-2 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full text-base font-bold text-white bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 shadow-xl shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Transmitting Proposal Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Request Strategy Proposal</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          )}

        </div>
      </div>

    </div>
  );
}
