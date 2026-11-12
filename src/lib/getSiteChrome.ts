import fs from "fs";
import path from "path";

let cachedChrome: { headerHtml: string; footerHtml: string } | null = null;

export function getSiteChrome() {
  if (cachedChrome) {
    return cachedChrome;
  }

  const filePath = path.join(process.cwd(), "public", "exact-blogs.html");
  if (!fs.existsSync(filePath)) {
    return {
      headerHtml: "<header class='p-4'><a href='/'>BrandInning</a></header>",
      footerHtml: "<footer class='p-4 text-center'>© 2026 BrandInning</footer>",
    };
  }

  const html = fs.readFileSync(filePath, "utf8");

  const footerStartTag = '<div data-elementor-type="wp-post" data-elementor-id="477" class="elementor elementor-477" data-elementor-post-type="tf-footer">';
  const footerPos = html.indexOf(footerStartTag);

  const headerStyleEnd = html.indexOf('</style>', html.indexOf('brandinning-header-css')) + 8;
  const sectionEnd = html.indexOf('</section>', headerStyleEnd) + 10;
  const headerEndPos = sectionEnd + 6; // includes closing </div>

  const headerHtml = html.substring(0, headerEndPos);
  const footerHtml = html.substring(footerPos);

  cachedChrome = { headerHtml, footerHtml };
  return cachedChrome;
}
