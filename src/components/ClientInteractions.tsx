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

    // ----------------------------------------------------
    // 5. MOBILE DRAWER & NAVIGATION ACCORDION ENGINE
    // ----------------------------------------------------
    const initMobileMenu = () => {
      // 1. Inject dropdown toggle buttons for items with dropdown-menu if not present
      const dropdownLis = document.querySelectorAll<HTMLElement>(
        ".mobile-main-navigation li.dropdown"
      );
      dropdownLis.forEach((li) => {
        const subMenu = li.querySelector<HTMLElement>(":scope > .dropdown-menu");
        if (subMenu && !li.querySelector(":scope > .dropdown-btn")) {
          const btn = document.createElement("div");
          btn.className = "dropdown-btn";
          btn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
          btn.setAttribute("role", "button");
          btn.setAttribute("aria-label", "Toggle Submenu");
          li.appendChild(btn);
        }
      });
    };

    const handleMobileClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // A. Open/Toggle drawer via hamburger button
      const openBtn = target.closest("#menuToggle, .chy-menu-btn-1") as HTMLElement | null;
      if (openBtn) {
        e.preventDefault();
        const menu = document.querySelector(".fullpage-menu");
        if (menu) {
          const isOpen = menu.classList.contains("brandinning-open") || menu.classList.contains("egma-open");
          if (isOpen) {
            menu.classList.remove("brandinning-open", "egma-open");
            document.body.style.overflow = "";
            document.documentElement.classList.remove("brandinning-menu-open");
          } else {
            menu.classList.add("brandinning-open", "egma-open");
            document.body.style.overflow = "hidden";
            document.documentElement.classList.add("brandinning-menu-open");
          }
        }
        return;
      }

      // B. Close drawer via close icon
      const closeBtn = target.closest("#menuToggle2, .fullpage-menu-close") as HTMLElement | null;
      if (closeBtn) {
        e.preventDefault();
        const menu = document.querySelector(".fullpage-menu");
        if (menu) {
          menu.classList.remove("brandinning-open", "egma-open");
          document.body.style.overflow = "";
          document.documentElement.classList.remove("brandinning-menu-open");
        }
        return;
      }

      // C. Click on backdrop overlay (outside .fullpage-menu-inner)
      const fullpageMenu = target.closest(".fullpage-menu") as HTMLElement | null;
      if (fullpageMenu && (fullpageMenu.classList.contains("brandinning-open") || fullpageMenu.classList.contains("egma-open"))) {
        const insideInner = target.closest(".fullpage-menu-inner");
        if (!insideInner) {
          fullpageMenu.classList.remove("brandinning-open", "egma-open");
          document.body.style.overflow = "";
          document.documentElement.classList.remove("brandinning-menu-open");
          return;
        }
      }

      // D. Dropdown caret or header toggle inside mobile nav
      const dropdownBtn = target.closest(".mobile-main-navigation .dropdown-btn") as HTMLElement | null;
      const dropdownLink = target.closest(
        ".mobile-main-navigation li.dropdown > a"
      ) as HTMLAnchorElement | null;

      let parentLi: HTMLElement | null = null;
      let isAnchorClick = false;

      if (dropdownBtn) {
        parentLi = dropdownBtn.closest("li.dropdown");
      } else if (dropdownLink) {
        const href = dropdownLink.getAttribute("href");
        if (!href || href === "#" || href.startsWith("javascript:")) {
          e.preventDefault();
          parentLi = dropdownLink.closest("li.dropdown");
          isAnchorClick = true;
        }
      }

      if (parentLi) {
        const subMenu = parentLi.querySelector<HTMLElement>(":scope > .dropdown-menu");
        const btn = parentLi.querySelector<HTMLElement>(":scope > .dropdown-btn");
        if (subMenu) {
          const isCurrentlyOpen =
            subMenu.style.display === "block" ||
            subMenu.classList.contains("show");
          if (isCurrentlyOpen) {
            subMenu.style.display = "none";
            subMenu.classList.remove("show");
            if (btn) btn.classList.remove("toggle-open");
          } else {
            subMenu.style.display = "block";
            subMenu.classList.add("show");
            if (btn) btn.classList.add("toggle-open");
          }
        }
        return;
      }

      // E. Closing drawer on regular navigation link click
      const navLink = target.closest(
        "#m-main-nav a[href]:not([href='#']):not([href^='javascript:'])"
      );
      if (navLink) {
        const menu = document.querySelector(".fullpage-menu");
        if (menu) {
          menu.classList.remove("brandinning-open", "egma-open");
          document.body.style.overflow = "";
          document.documentElement.classList.remove("brandinning-menu-open");
        }
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 992) {
        const menu = document.querySelector(".fullpage-menu");
        if (menu && (menu.classList.contains("brandinning-open") || menu.classList.contains("egma-open"))) {
          menu.classList.remove("brandinning-open", "egma-open");
          document.body.style.overflow = "";
          document.documentElement.classList.remove("brandinning-menu-open");
        }
      }
    };

    initCounters();
    initMobileMenu();
    document.addEventListener("click", handleAccordionClick);
    document.addEventListener("click", handleVideoClick);
    document.addEventListener("click", handleMobileClick);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });

    const timer = setTimeout(() => {
      initCounters();
      initMobileMenu();
    }, 400);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleAccordionClick);
      document.removeEventListener("click", handleVideoClick);
      document.removeEventListener("click", handleMobileClick);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
