const fs = require("fs");
const path = require("path");

const root = process.cwd();
const sourceDir = path.join(root, "public", "mirror");
const targetDir = path.join(root, "mirror");

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source directory not found: ${src}`);
  }

  fs.mkdirSync(dest, { recursive: true });

  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

copyDirRecursive(sourceDir, targetDir);

const indexHtml = path.join(root, "index.html");
const fallback404 = path.join(root, "404.html");
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, fallback404);
}

console.log("Synced public/mirror -> mirror and index.html -> 404.html");
