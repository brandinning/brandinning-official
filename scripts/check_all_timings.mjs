import puppeteer from "puppeteer-core";

const CHROME_PATH = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

const routes = [
  "/",
  "/about-us",
  "/services",
  "/contact",
  "/case-studies",
  "/portfolio",
  "/career",
  "/blog",
  "/blog/how-to-optimize-your-website-for-ai-search-engines",
  "/industries",
  "/packages",
  "/seo-package",
  "/local-seo-package",
  "/digital-marketing-package"
];

async function checkAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  console.log("=== All Routes Navigation Timings (window.load) ===\n");
  console.log(
    "Route".padEnd(30) +
    "DOM Loaded".padEnd(14) +
    "Full Load (Window)".padEnd(20) +
    "Status"
  );
  console.log("-".repeat(75));

  for (const route of routes) {
    const page = await browser.newPage();
    try {
      await page.goto(`http://localhost:3001${route}`, { waitUntil: "load", timeout: 10000 });
      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0] || {};
        return {
          dcl: Math.round(nav.domContentLoadedEventEnd || 0),
          load: Math.round(nav.loadEventEnd || 0)
        };
      });

      const under2s = metrics.load < 2000 ? "✅ Under 2s (< " + (metrics.load / 1000).toFixed(2) + "s)" : "❌ Slower than 2s";
      console.log(
        route.padEnd(30) +
        `${metrics.dcl} ms`.padEnd(14) +
        `${metrics.load} ms`.padEnd(20) +
        under2s
      );
    } catch (e) {
      console.log(`${route.padEnd(30)} Error: ${e.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

checkAll().catch(console.error);
