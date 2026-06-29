import assert from 'node:assert/strict';
import { test } from 'node:test';

import { createProofEnvelope, createReferenceProofBundle } from '../src/index.ts';

const envelope = createProofEnvelope({
  commitment: 'commit_example_1234567890abcdef',
  issuerId: 'issuer-agid-test',
  credentialType: 'deliverability',
  proofScope: 'delivery',
  freshnessRoot: 'fresh_root_1',
  revocationRoot: 'rev_root_1',
});

const witness = {
  regionIds: ['delivery-zone-tokyo'],
  qualityScore: 0.95,
  consentScopes: ['delivery'],
  issuedAtEpochDays: 100,
  revoked: false,
};

const policy = {
  id: 'policy-delivery',
  acceptedIssuers: ['issuer-agid-test'],
  acceptedPredicates: ['delivery_zone_eligibility'] as const,
  maxAgeDays: 30,
  allowedScopes: ['delivery'],
};

const issuerRegistry = [{
  id: 'issuer-agid-test',
  acceptedCredentialTypes: ['deliverability'],
  allowedPredicates: ['delivery_zone_eligibility'] as const,
  auditStatus: 'reviewed' as const,
}];

test('creates accepted reference proof bundle without exposing raw address', () => {
  const bundle = createReferenceProofBundle({
    envelope,
    witness,
    request: { predicate: 'delivery_zone_eligibility', regionId: 'delivery-zone-tokyo', minimumScore: 0.9 },
    policy,
    issuerRegistry,
    nonce: 'nonce-1',
    createdAt: '2026-06-29T00:00:00.000Z',
  });

  assert.equal(bundle.publicSignals.status, 'accepted');
  assert.equal(JSON.stringify(bundle).includes('rawAddress'), false);
});

test('rejects proof bundle when issuer policy does not allow the predicate', () => {
  const bundle = createReferenceProofBundle({
    envelope,
    witness,
    request: { predicate: 'quality_threshold', minimumScore: 0.9 },
    policy,
    issuerRegistry,
    nonce: 'nonce-1',
    createdAt: '2026-06-29T00:00:00.000Z',
  });

  assert.equal(bundle.publicSignals.status, 'rejected');
});
