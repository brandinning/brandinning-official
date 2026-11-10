import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { 
  Sparkles, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowUpRight, 
  ShieldCheck, 
  Globe 
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050811] text-slate-400 border-t border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800/80">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-orange-500 flex items-center justify-center font-bold text-white shadow-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Brand<span className="text-sky-400">Inning</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {BRAND.description}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>ISO & Quality Compliant Digital Solutions • Established {BRAND.foundedYear}</span>
            </div>
          </div>

          {/* Quick Services Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Core Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              {BRAND.services.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="hover:text-sky-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-sky-400 transition-colors">
                  About BrandInning
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-sky-400 transition-colors">
                  All Solutions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  Case Studies & Results
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sky-400 transition-colors">
                  Get Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Global Locations & Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Offices & Contact
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">India HQ:</strong>
                  {BRAND.contact.indiaAddress}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <Globe className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white block">USA Office:</strong>
                  {BRAND.contact.usaAddress}
                </span>
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <Mail className="w-4 h-4 text-sky-400" />
                <a href={`mailto:${BRAND.contact.email}`} className="text-white hover:underline">
                  {BRAND.contact.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All rights reserved. Powered by Next.js & Vercel.
          </div>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-slate-300">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-slate-300">Terms of Service</Link>
            <Link href="/contact" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
