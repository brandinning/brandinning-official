import fs from "fs";
import path from "path";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries — Brandinning",
  description: "Official Industries — Brandinning page at Brandinning.",
};

export default function industriesPage() {
  const filePath = path.join(process.cwd(), "public", "exact-industries.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <>
      <div 
        id="exact-industries-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
      <Script 
        src="/wp-includes/js/jquery/jquery.min.js" 
        strategy="beforeInteractive" 
      />
    </>
  );
}
