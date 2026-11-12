import fs from "fs";
import path from "path";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs — Brandinning",
  description: "Official Blogs — Brandinning page at Brandinning.",
};

export default function blogsPage() {
  const filePath = path.join(process.cwd(), "public", "exact-blogs.html");
  const exactContent = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading content...</div>";

  return (
    <div 
        id="exact-blogs-wrapper" 
        dangerouslySetInnerHTML={{ __html: exactContent }} 
      />
  );
}
