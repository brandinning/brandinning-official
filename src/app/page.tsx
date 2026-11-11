import fs from "fs";
import path from "path";

export default function HomePage() {
  const bodyPath = path.join(process.cwd(), "public", "exact-body.html");
  const exactBody = fs.existsSync(bodyPath)
    ? fs.readFileSync(bodyPath, "utf8")
    : "<div className='p-8 text-center text-xl'>Loading BrandInning...</div>";

  return (
    <div 
      id="exact-body-wrapper" 
      dangerouslySetInnerHTML={{ __html: exactBody }} 
    />
  );
}
