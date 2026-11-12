import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career — Brandinning",
  description: "Official Career — Brandinning page at Brandinning.",
};

export default function careerPage() {
  const filePath = path.join(process.cwd(), "public", "exact-career.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
        id="exact-career-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
  );
}
