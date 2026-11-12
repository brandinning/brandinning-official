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
  "/blogs",
  "/industries",
  "/packages",
  "/seo-package",
  "/local-seo-package",
  "/social-media-pacakege",
  "/digital-marketing-package"
];

async function runBenchmark() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"]
  });

  console.log("=== Performance Benchmark (http://localhost:3001) ===\n");
  console.log(
    "Route".padEnd(28) +
    "Load Time".padEnd(12) +
    "DOM Loaded".padEnd(12) +
    "FCP".padEnd(10) +
    "Requests".padEnd(10) +
    "Transferred"
  );
  console.log("-".repeat(80));

  for (const route of routes) {
    const page = await browser.newPage();
    let requests = 0;
    let transferredBytes = 0;

    await page.setRequestInterception(false);
    
    page.on("response", (res) => {
      requests++;
      const headers = res.headers();
      const length = headers["content-length"] ? parseInt(headers["content-length"], 10) : 0;
      transferredBytes += length;
    });

    const start = Date.now();
    try {
      await page.goto(`http://localhost:3001${route}`, {
        waitUntil: "networkidle2",
        timeout: 15000
      });
      const loadTime = Date.now() - start;

      const metrics = await page.evaluate(() => {
        const nav = performance.getEntriesByType("navigation")[0] || {};
        const paint = performance.getEntriesByType("paint");
        const fcpEntry = paint.find(p => p.name === "first-contentful-paint");
        return {
          domContentLoaded: Math.round(nav.domContentLoadedEventEnd || 0),
          fcp: Math.round(fcpEntry ? fcpEntry.startTime : 0)
        };
      });

      console.log(
        route.padEnd(28) +
        `${loadTime} ms`.padEnd(12) +
        `${metrics.domContentLoaded} ms`.padEnd(12) +
        `${metrics.fcp} ms`.padEnd(10) +
        `${requests}`.padEnd(10) +
        `${(transferredBytes / 1024).toFixed(1)} KB`
      );
    } catch (err) {
      console.log(`${route.padEnd(28)} FAILED: ${err.message}`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

runBenchmark().catch(console.error);
