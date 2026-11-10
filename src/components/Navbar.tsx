"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BRAND } from "@/lib/data";
import { 
  Menu, 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  Sparkles,
  ChevronDown 
} from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Bar with Offices and Phone */}
      <div className="bg-[#060a14] text-xs text-slate-400 border-b border-slate-800/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Noida, India & Cape Coral, FL (USA)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <a href={`mailto:${BRAND.contact.email}`} className="hover:text-sky-300 transition-colors">
                {BRAND.contact.email}
              </a>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>India:</span>
              <a href={`tel:${BRAND.contact.indiaPhone}`} className="hover:text-white transition-colors font-medium">
                {BRAND.contact.indiaPhone}
              </a>
            </div>
            <span className="text-slate-700">|</span>
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span>USA:</span>
              <a href={`tel:${BRAND.contact.usaPhone}`} className="hover:text-white transition-colors font-medium">
                {BRAND.contact.usaPhone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav 
        className={`w-full transition-all duration-300 ${
          isScrolled 
            ? "glass-panel bg-[#0a0f1d]/90 shadow-xl shadow-black/30 border-b border-slate-800" 
            : "bg-transparent backdrop-blur-md"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-indigo-600 to-orange-500 flex items-center justify-center font-bold text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-1">
                Brand<span className="text-sky-400">Inning</span>
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse"></span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold -mt-1">
                Digital & Web Agency
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="/" className="hover:text-sky-400 transition-colors">
              Home
            </Link>

            {/* Services Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link 
                href="/services" 
                className="flex items-center gap-1 hover:text-sky-400 transition-colors py-2"
              >
                Services <ChevronDown className="w-4 h-4 text-slate-400" />
              </Link>
              
              {servicesDropdown && (
                <div className="absolute top-full left-0 w-72 glass-panel bg-[#0b132b]/95 rounded-2xl shadow-2xl p-3 border border-slate-700/60 transition-all animate-in fade-in slide-in-from-top-2">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 py-1">
                    What We Do
                  </div>
                  {BRAND.services.map((s) => (
                    <Link
                      key={s.id}
                      href={`/services#${s.id}`}
                      className="block px-3 py-2.5 rounded-xl hover:bg-slate-800/80 transition-colors"
                    >
                      <div className="text-sm font-semibold text-white">{s.title}</div>
                      <div className="text-xs text-slate-400 line-clamp-1">{s.shortDesc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/about" className="hover:text-sky-400 transition-colors">
              About Us
            </Link>
            <Link href="/services#case-studies" className="hover:text-sky-400 transition-colors">
              Case Studies
            </Link>
            <Link href="/contact" className="hover:text-sky-400 transition-colors">
              Contact
            </Link>
          </div>

          {/* Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/contact"
              className="relative inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get Free Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0c1322] border-b border-slate-800 px-6 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white hover:text-sky-400"
            >
              Home
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white hover:text-sky-400"
            >
              Services
            </Link>
            <div className="pl-4 space-y-2 border-l border-slate-800">
              {BRAND.services.map((s) => (
                <Link
                  key={s.id}
                  href={`/services#${s.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block text-sm text-slate-400 hover:text-sky-300"
                >
                  {s.title}
                </Link>
              ))}
            </div>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white hover:text-sky-400"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white hover:text-sky-400"
            >
              Contact
            </Link>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 rounded-full shadow-lg"
              >
                Get Free Proposal
              </Link>
              <div className="text-xs text-slate-400 text-center space-y-1">
                <div>India: {BRAND.contact.indiaPhone}</div>
                <div>USA: {BRAND.contact.usaPhone}</div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
