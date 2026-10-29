#!/usr/bin/env node
// Usage: npm run new -- "Client Name"
// Creates proposals/<client>-<random>.ts from the template and registers it.
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";

const client = process.argv.slice(2).join(" ").trim();
if (!client) {
  console.error('Add the client name, e.g. npm run new -- "Harbour & Pine"');
  process.exit(1);
}

const base = client.toLowerCase().normalize("NFKD").replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
const suffix = Array.from(randomBytes(5), (b) => alphabet[b % alphabet.length]).join("");
const slug = `${base}-${suffix}`;
const file = `proposals/${slug}.ts`;
if (existsSync(file)) throw new Error(`${file} already exists`);

const date = new Date().toISOString().slice(0, 10);
const template = readFileSync("proposals/_template.ts", "utf8")
  .replace("__CLIENT__", client.replace(/"/g, '\\"'))
  .replace("__DATE__", date)
  .replace(/^\/\/ Starting point.*\n/m, "");
writeFileSync(file, template);

const id = `p_${slug.replace(/-/g, "_")}`;
const index = readFileSync("proposals/index.ts", "utf8")
  .replace("// @imports", `import ${id} from "./${slug}";\n// @imports`)
  .replace("  // @entries", `  "${slug}": ${id},\n  // @entries`);
writeFileSync("proposals/index.ts", index);

console.log(`Created ${file}`);
console.log(`Preview: http://localhost:3000/${slug}`);
console.log(`Live:    https://strategy.mesmeriseco.com/${slug}`);
