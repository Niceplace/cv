import { render } from "./bold-header-niceplace/src/index.js";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the resume JSON
const resumePaths = {
  en: join(__dirname, "resume-base-en.json"),
  fr: join(__dirname, "resume-base-fr.json"),
};

for (const key of Object.keys(resumePaths)) {
  const resumeData = JSON.parse(readFileSync(resumePaths[key], "utf-8"));
  // Render the resume
  const html = render(resumeData);
  // Write the output
  const outputPath = join(
    __dirname,
    "rendered",
    `${key}-resume-bold-header-niceplace.html`,
  );
  writeFileSync(outputPath, html, "utf-8");

  console.log(
    `Resume rendered successfully for language ${key} to: ${outputPath}`,
  );
}
