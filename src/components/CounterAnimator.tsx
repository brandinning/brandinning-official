"use client";

import { useEffect } from "react";

export default function CounterAnimator() {
  useEffect(() => {
    const initCounters = () => {
      // 1. Elementor Counters
      const elementorCounters = document.querySelectorAll(
        ".elementor-counter-number[data-to-value]"
      );
      
      // 2. Odometer / data-count Counters
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

                // Smooth easeOutCubic
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

    initCounters();
    const timer = setTimeout(initCounters, 400);
    return () => clearTimeout(timer);
  }, []);

  return null;
}
