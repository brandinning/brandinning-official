import fs from "fs";
import path from "path";
import Script from "next/script";

export default function HomePage() {
  const bodyPath = path.join(process.cwd(), "public", "exact-body.html");
  const exactBody = fs.existsSync(bodyPath)
    ? fs.readFileSync(bodyPath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading BrandInning...</div>";

  return (
    <>
      <div 
        id="exact-body-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactBody }} 
      />
      
      {/* Essential Core Scripts for Menu, Sliders & Interaction */}
      <Script 
        src="https://brandinning.com/wp-includes/js/jquery/jquery.min.js" 
        strategy="beforeInteractive" 
      />
      <Script 
        src="https://brandinning.com/wp-content/plugins/litespeed-cache/assets/js/webfontloader.min.js" 
        strategy="lazyOnload" 
      />
    </>
  );
}
