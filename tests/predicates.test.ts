import assert from 'node:assert/strict';
import { test } from 'node:test';

import { evaluatePredicate, type AddressWitness } from '../src/index.ts';

const witness: AddressWitness = {
  regionIds: ['JP-13', 'delivery-zone-tokyo'],
  qualityScore: 0.98,
  consentScopes: ['delivery'],
  issuedAtEpochDays: 100,
  revoked: false,
};

test('evaluates region, quality, consent, freshness, and revocation predicates', () => {
  assert.equal(evaluatePredicate(witness, { predicate: 'region_membership', regionId: 'JP-13' }), true);
  assert.equal(evaluatePredicate(witness, { predicate: 'quality_threshold', minimumScore: 0.9 }), true);
  assert.equal(evaluatePredicate(witness, { predicate: 'consent_scope', scope: 'delivery' }), true);
  assert.equal(evaluatePredicate(witness, { predicate: 'freshness', nowEpochDays: 120, maxAgeDays: 30 }), true);
  assert.equal(evaluatePredicate(witness, { predicate: 'not_revoked' }), true);
});

test('rejects unavailable delivery zone predicates', () => {
  assert.equal(
    evaluatePredicate(witness, {
      predicate: 'delivery_zone_eligibility',
      regionId: 'delivery-zone-osaka',
      minimumScore: 0.9,
    }),
    false,
  );
});
