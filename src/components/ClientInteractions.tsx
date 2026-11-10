"use client";

import { useEffect, useState } from "react";

export default function ClientInteractions() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    // ----------------------------------------------------
    // 1. NUMBER COUNTER ANIMATION ENGINE
    // ----------------------------------------------------
    const initCounters = () => {
      const elementorCounters = document.querySelectorAll(
        ".elementor-counter-number[data-to-value]"
      );
      const odometerCounters = document.querySelectorAll(
        ".odometer[data-count], [data-count]"
      );
      const allCounters = Array.from(
        new Set([...Array.from(elementorCounters), ...Array.from(odometerCounters)])
      );

      if (allCounters.length === 0) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const el = entry.target as HTMLElement;
              observer.unobserve(el);

              const target = parseFloat(
                el.getAttribute("data-to-value") || el.getAttribute("data-count") || "0"
              );
              const start = parseFloat(
                el.getAttribute("data-from-value") || "0"
              );
              const duration = parseInt(
                el.getAttribute("data-duration") || "2000",
                10
              );
              const delimiter = el.getAttribute("data-delimiter") || "";

              if (isNaN(target)) return;

              let startTime: number | null = null;
              const animateCounter = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(start + (target - start) * easeOut);

                if (delimiter === ",") {
                  el.textContent = current.toLocaleString("en-US");
                } else {
                  el.textContent = current.toString();
                }

                if (progress < 1) {
                  requestAnimationFrame(animateCounter);
                } else {
                  if (delimiter === ",") {
                    el.textContent = target.toLocaleString("en-US");
                  } else {
                    el.textContent = target.toString();
                  }
                }
              };
              requestAnimationFrame(animateCounter);
            }
          });
        },
        { threshold: 0.15 }
      );

      allCounters.forEach((c) => observer.observe(c));
    };

    // ----------------------------------------------------
    // 2. FAQ / ACCORDION TOGGLE HANDLER
    // ----------------------------------------------------
    const handleAccordionClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        ".eael-accordion-header, .elementor-tab-title"
      ) as HTMLElement | null;
      if (!target) return;

      e.preventDefault();
      const parentList = target.closest(".eael-accordion-list");
      const content = (parentList
        ? parentList.querySelector(".eael-accordion-content")
        : target.nextElementSibling) as HTMLElement | null;

      const isCurrentlyActive = target.classList.contains("active");

      // In accordion mode, close other items in the same container
      const container = target.closest(".eael-adv-accordion");
      if (container) {
        const allHeaders = container.querySelectorAll(".eael-accordion-header");
        const allContents = container.querySelectorAll(".eael-accordion-content");
        allHeaders.forEach((h) => h.classList.remove("active"));
        allContents.forEach((c) => {
          (c as HTMLElement).style.display = "none";
        });
      }

      if (!isCurrentlyActive) {
        target.classList.add("active");
        if (content) {
          content.style.display = "block";
        }
      } else {
        target.classList.remove("active");
        if (content) {
          content.style.display = "none";
        }
      }
    };

    // ----------------------------------------------------
    // 3. VIDEO LIGHTBOX POPUP HANDLER
    // ----------------------------------------------------
    const handleVideoClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest(".video_lbox") as HTMLAnchorElement | null;
      if (!link) return;

      const href = link.getAttribute("href");
      if (href && (href.includes("youtube.com") || href.includes("youtu.be"))) {
        e.preventDefault();
        // Standardize embed URL with autoplay
        let embedUrl = href;
        if (embedUrl.startsWith("//")) embedUrl = "https:" + embedUrl;
        if (!embedUrl.includes("autoplay=1")) {
          embedUrl += (embedUrl.includes("?") ? "&" : "?") + "autoplay=1";
        }
        setActiveVideo(embedUrl);
      }
    };

    // ----------------------------------------------------
    // 4. STICKY HEADER ON SCROLL
    // ----------------------------------------------------
    const handleScroll = () => {
      const headers = document.querySelectorAll(
        ".chy-header-3-area, .tx-header, header"
      );
      const isSticky = window.scrollY > 120;
      headers.forEach((h) => {
        if (isSticky) {
          h.classList.add("sticky-on", "header-sticky");
        } else {
          h.classList.remove("sticky-on", "header-sticky");
        }
      });
    };

    initCounters();
    document.addEventListener("click", handleAccordionClick);
    document.addEventListener("click", handleVideoClick);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const timer = setTimeout(initCounters, 400);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleAccordionClick);
      document.removeEventListener("click", handleVideoClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    if (activeVideo) {
      window.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeVideo]);

  return (
    <>
      {/* Lightbox Modal */}
      {activeVideo && (
        <div 
          className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-fadeIn"
          onClick={() => setActiveVideo(null)}
        >
          <div 
            className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center text-xl transition-all border border-white/20"
              aria-label="Close video"
            >
              ✕
            </button>
            <iframe
              src={activeVideo}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}
