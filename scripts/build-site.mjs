import { cpSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'dist');
const revision = process.env.CF_COMMIT_SHA || execFileSync('git', ['rev-parse', 'HEAD'], {
  cwd: root, encoding: 'utf8',
}).trim();
if (!/^[a-f0-9]{40}$/.test(revision)) throw new Error('Invalid source revision');
rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });
for (const path of ["index.html", "map.html", "styles.css", "art3mis.js", "machines.json", "materials.json", "icomoon-zones.jpg", "icomoon.jpg", "moonman.jpg", "Art3misLand.sol", "CheeseToken.sol", "LICENSE", "api/land/1.json", "api/land/2.json", "api/land/3.json", "api/land/4.json", "api/land/5.json", "api/land/6.json", "api/land/7.json", "api/land/8.json", "api/land/9.json", "api/land/10.json", "api/land/11.json", "api/land/12.json", "api/land/13.json", "api/land/14.json", "api/land/15.json", "api/land/16.json", "api/land/17.json", "api/land/18.json", "api/land/19.json", "api/land/20.json"]) { mkdirSync(resolve(output, path, '..'), { recursive: true }); cpSync(resolve(root, path), resolve(output, path), { recursive: true }); }
writeFileSync(resolve(output, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Page not found</title><h1>Page not found</h1><p><a href="/">Return home</a></p></html>\n');
mkdirSync(resolve(output, '.well-known'), { recursive: true });
writeFileSync(resolve(output, '.well-known/cloudflare-build.json'), JSON.stringify({ repository: "pierce403/art3mis", revision }, null, 2) + '\n');
writeFileSync(resolve(output, '_headers'), '/*\n  X-Content-Type-Options: nosniff\n/.well-known/cloudflare-build.json\n  Cache-Control: no-store\n');
console.log('Built public assets at ' + revision);
