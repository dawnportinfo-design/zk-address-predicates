import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { decideAMTCompatibility, type AMTEnvelope } from '../src/amt-compatibility.ts';
import type { PredicateName } from '../src/types.ts';

type ContractVector = {
  id: string;
  amt: AMTEnvelope;
  zk: {
    predicate: PredicateName;
  };
};

const fixture = JSON.parse(fs.readFileSync('../agid-interoperability-contracts/fixtures/interop-vectors.json', 'utf8')) as {
  vectors: ContractVector[];
};

test('ZK conformance reads shared interop vectors', () => {
  assert.ok(fixture.vectors.length >= 3);
});

test('ZK compatibility accepts verified postal-equivalent proof request', () => {
  const vector = fixture.vectors.find((item) => item.id === 'verified-postal-proof-allowed');
  assert.ok(vector);
  assert.equal(decideAMTCompatibility(vector.amt, vector.zk.predicate), 'allowed');
});

test('ZK compatibility blocks unresolved proof request', () => {
  const vector = fixture.vectors.find((item) => item.id === 'unresolved-proof-blocked');
  assert.ok(vector);
  assert.equal(decideAMTCompatibility(vector.amt, vector.zk.predicate), 'blocked');
});

test('ZK compatibility blocks ambiguous precise delivery request', () => {
  const vector = fixture.vectors.find((item) => item.id === 'ambiguous-ai-manual-review');
  assert.ok(vector);
  assert.equal(decideAMTCompatibility(vector.amt, vector.zk.predicate), 'blocked');
});

