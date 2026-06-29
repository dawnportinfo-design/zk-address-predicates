import assert from 'node:assert/strict';
import { test } from 'node:test';

import { findUnsafePublicSignalKeys, publicSignalsAreSafe } from '../src/index.ts';

test('accepts safe public signals', () => {
  assert.equal(publicSignalsAreSafe({
    policyId: 'policy-delivery',
    predicate: 'delivery_zone_eligibility',
    commitment: 'commit_example',
    nullifier: 'nul_example',
    issuerId: 'issuer-example',
  }), true);
});

test('rejects raw address-like public signal fields', () => {
  const hits = findUnsafePublicSignalKeys({
    policyId: 'policy-delivery',
    rawAddress: 'REDACTED',
    nested: { witness: 'REDACTED' },
  });

  assert.deepEqual(hits, ['nested.witness', 'rawAddress']);
});
