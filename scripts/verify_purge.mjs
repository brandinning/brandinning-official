import fs from "fs";

const files = fs.readdirSync("public").filter(f => f.startsWith("exact-") && f.endsWith(".html"));
let anyFound = false;
for (const f of files) {
  const content = fs.readFileSync("public/" + f, "utf8");
  const found = ["greater-noida", "gurugram", "ghaziabad", "faridabad", "social-media-pacakege"].filter(k => content.includes(k));
  if (found.length > 0) {
    console.log(f, "still has:", found);
    anyFound = true;
  }
}
if (!anyFound) {
  console.log("SUCCESS: 0 green route references found in any HTML file!");
}
