import fs from "node:fs";
import path from "node:path";
import JavaScriptObfuscator from "javascript-obfuscator";

const assetsDir = path.resolve("dist/assets");

function obfuscateDirectory(directory) {
  const files = fs.readdirSync(directory, { withFileTypes: true });

  for (const file of files) {
    const fullPath = path.join(directory, file.name);

    if (file.isDirectory()) {
      obfuscateDirectory(fullPath);
      continue;
    }

    if (!/\.(js|mjs|cjs)$/.test(file.name)) {
      continue;
    }

    const sourceCode = fs.readFileSync(fullPath, "utf8");

    const obfuscatedCode = JavaScriptObfuscator.obfuscate(
      sourceCode,
      {
        compact: true,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 0.5,
        deadCodeInjection: true,
        deadCodeInjectionThreshold: 0.2,
        debugProtection: false,
        disableConsoleOutput: false,
        // identifierNamesGenerator: "hexadecimal",
        identifierNamesGenerator: "mangled",
        renameGlobals: false,
        rotateStringArray: true,
        selfDefending: false,
        stringArray: true,
        stringArrayThreshold: 0.75,
        splitStrings: true,
        splitStringsChunkLength: 5,
      }
    );

    fs.writeFileSync(fullPath, obfuscatedCode.getObfuscatedCode());

    console.log(`Obfuscated: ${fullPath}`);
  }
}

if (!fs.existsSync(assetsDir)) {
  throw new Error(`Build assets directory not found: ${assetsDir}`);
}

obfuscateDirectory(assetsDir);

console.log("JavaScript obfuscation completed successfully.");