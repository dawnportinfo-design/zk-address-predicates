const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const specs = path.join(root, 'specs');
const required = [
  'proof-envelope.schema.json',
  'public-signals.schema.json',
  'verifier-policy.schema.json',
  'proof-bundle.schema.json',
  'issuer-trust-registry.schema.json',
];

for (const file of required) {
  const fullPath = path.join(specs, file);
  JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

console.log(`Verified ${required.length} schema file(s).`);
