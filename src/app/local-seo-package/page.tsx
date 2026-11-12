import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Local SEO Package — Brandinning",
  description: "Official Local SEO Package — Brandinning page at Brandinning.",
};

export default function localseopackagePage() {
  const filePath = path.join(process.cwd(), "public", "exact-local-seo-package.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
        id="exact-local-seo-package-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
  );
}
