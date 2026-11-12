import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies — Brandinning",
  description: "Official Case Studies — Brandinning page at Brandinning.",
};

export default function casestudiesPage() {
  const filePath = path.join(process.cwd(), "public", "exact-case-studies.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
        id="exact-case-studies-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
  );
}
