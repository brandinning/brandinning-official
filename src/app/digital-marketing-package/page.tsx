import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing Package — Brandinning",
  description: "Official Digital Marketing Package — Brandinning page at Brandinning.",
};

export default function digitalmarketingpackagePage() {
  const filePath = path.join(process.cwd(), "public", "exact-digital-marketing-package.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
        id="exact-digital-marketing-package-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
  );
}
