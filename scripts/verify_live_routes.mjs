import http from "http";
import fs from "fs";

const blogsData = JSON.parse(fs.readFileSync("src/lib/blogs-data.json", "utf8"));

function requestUrl(urlPath) {
  return new Promise((resolve) => {
    const start = performance.now();
    const req = http.get(
      {
        hostname: "localhost",
        port: 3005,
        path: urlPath,
        headers: { "User-Agent": "RouteVerifier/1.0" },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          const duration = Math.round(performance.now() - start);
          resolve({
            path: urlPath,
            status: res.statusCode,
            location: res.headers.location,
            duration,
            bodyLength: data.length,
          });
        });
      }
    );
    req.on("error", (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function runTests() {
  console.log("=== Testing Key Pages ===");
  const keyPages = ["/", "/blogs", "/about", "/services", "/packages", "/case-studies", "/contact"];
  for (const p of keyPages) {
    const res = await requestUrl(p);
    console.log(`${p}: status=${res.status}, time=${res.duration}ms, size=${res.bodyLength}B`);
  }

  console.log("\n=== Testing Green Route Redirects ===");
  const greenRoutes = [
    "/home-2",
    "/blog",
    "/social-media-pacakege",
    "/case-studies/ed-sathi",
    "/best-smo-company-in-delhi-2",
  ];
  for (const g of greenRoutes) {
    const res = await requestUrl(g);
    console.log(`${g}: status=${res.status}, location=${res.location}, time=${res.duration}ms`);
  }

  console.log("\n=== Testing Yellow Route (Blog Post) Detail Pages ===");
  let blogSuccess = 0;
  let blogMaxTime = 0;
  for (const b of blogsData) {
    const res = await requestUrl(`/blogs/${b.slug}`);
    if (res.status === 200) {
      blogSuccess++;
      blogMaxTime = Math.max(blogMaxTime, res.duration);
    } else {
      console.error(`FAILED /blogs/${b.slug}: status=${res.status}`);
    }
  }
  console.log(`Blog detail pages verified: ${blogSuccess}/${blogsData.length} returned 200 OK! Max time: ${blogMaxTime}ms`);

  console.log("\n=== Testing Root Blog Slugs Redirection ===");
  const sampleBlogs = blogsData.slice(0, 5);
  for (const b of sampleBlogs) {
    const res = await requestUrl(`/${b.slug}`);
    console.log(`/${b.slug}: status=${res.status}, location=${res.location}, time=${res.duration}ms`);
  }
}

runTests();
