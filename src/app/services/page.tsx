import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Choicy Services — Brandinning",
  description: "Explore our digital marketing, web development, SEO, and branding services at Brandinning.",
};

export default function ServicesPage() {
  const servicesPath = path.join(process.cwd(), "public", "exact-services.html");
  const exactServices = fs.existsSync(servicesPath)
    ? fs.readFileSync(servicesPath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading Services...</div>";

  return (
    <div 
        id="exact-services-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactServices }} 
      />
  );
}
