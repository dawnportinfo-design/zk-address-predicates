const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const forbidden = [
  /BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY/i,
  /witness\.wtns/i,
  /privateKey\s*:/i,
  /recipient\s*:/i,
  /rawAddress\s*:/i,
  /street\s*:/i,
  /houseNumber\s*:/i,
  /latitude\s*:/i,
  /longitude\s*:/i,
];
const allowedFiles = new Set([
  'README.md',
  'paper/05-amt-envelope-and-secret-witness.md',
  'paper/10-proof-bundle-registry.md',
  'paper/17-security-and-server-side-analysis.md',
  'appendices/A-public-schema-proposal.md',
  'tests/public-signal-safety.test.ts',
  'tests/proof-bundle.test.ts',
  'src/public-signal-safety.ts',
  'scripts/verify-publication-safety.cjs',
]);
const errors = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relative = path.relative(root, fullPath).replaceAll(path.sep, '/');
    if (entry.isDirectory()) {
      if (['.git', 'node_modules'].includes(entry.name)) continue;
      walk(fullPath);
    } else if (entry.isFile() && /\.(md|ts|json|cjs|yml)$/i.test(entry.name)) {
      const text = fs.readFileSync(fullPath, 'utf8');
      if (allowedFiles.has(relative)) continue;
      for (const pattern of forbidden) {
        if (pattern.test(text)) {
          errors.push(`${relative} matches forbidden pattern ${pattern}`);
        }
      }
    }
  }
}

walk(root);

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log('Publication safety scan passed.');
