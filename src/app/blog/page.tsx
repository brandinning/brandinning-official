import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — BrandInning",
  description: "Official Blog — Insights on SEO, performance marketing, and digital growth at BrandInning.",
};

export default function BlogHubPage() {
  const filePath = path.join(process.cwd(), "public", "exact-blogs.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
      id="exact-blog-wrapper" 
      dangerouslySetInnerHTML={{ __html: exactContent }} 
    />
  );
}
