import fs from "fs";
import path from "path";
import Script from "next/script";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Brandinning",
  description: "Get in touch with Brandinning for digital marketing, SEO, web development and performance advertising solutions.",
};

export default function ContactPage() {
  const contactPath = path.join(process.cwd(), "public", "exact-contact.html");
  const exactContact = fs.existsSync(contactPath)
    ? fs.readFileSync(contactPath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading Contact...</div>";

  return (
    <>
      <div 
        id="exact-contact-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContact }} 
      />
      <Script 
        src="/wp-includes/js/jquery/jquery.min.js" 
        strategy="beforeInteractive" 
      />
    </>
  );
}
