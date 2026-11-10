import fs from "fs";
import path from "path";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Brandinning",
  description: "Learn more about Brandinning, our story, mission, and how we turn experiences into solutions.",
};

export default function AboutUsPage() {
  const aboutPath = path.join(process.cwd(), "public", "exact-about.html");
  const exactAbout = fs.existsSync(aboutPath)
    ? fs.readFileSync(aboutPath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading About Us...</div>";

  return (
    <>
      <div 
        id="exact-about-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactAbout }} 
      />
      <Script 
        src="https://brandinning.com/wp-includes/js/jquery/jquery.min.js" 
        strategy="beforeInteractive" 
      />
    </>
  );
}
