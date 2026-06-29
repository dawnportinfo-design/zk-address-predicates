import assert from 'node:assert/strict';
import test from 'node:test';
import { decideAMTCompatibility, type AMTEnvelope } from '../src/amt-compatibility.ts';

const baseEnvelope: AMTEnvelope = {
  schemaVersion: 'amt-envelope-v0.1',
  referentCommitment: 'commitment:referent:test',
  pidCommitment: 'commitment:pid:test',
  resolutionState: 'verified',
  qualityState: 'verified',
  sourceSetVersion: 'source-set:test',
  lineageRoot: 'root:lineage:test',
  freshnessRoot: 'root:freshness:test',
  revocationRoot: 'root:revocation:test',
  allowedPredicates: [
    'region_membership',
    'quality_threshold',
    'consent_scope',
    'freshness',
    'not_revoked',
    'delivery_zone_eligibility',
    'anonymous_rate_limit',
  ],
};

test('verified AMT envelope permits predicate allowed by state and envelope', () => {
  assert.equal(decideAMTCompatibility(baseEnvelope, 'region_membership'), 'allowed');
});

test('envelope allow-list can further restrict a verified state', () => {
  const envelope = { ...baseEnvelope, allowedPredicates: ['freshness'] };
  assert.equal(decideAMTCompatibility(envelope, 'region_membership'), 'blocked');
});

test('partial AMT envelope cannot prove precise deliverability', () => {
  const envelope = { ...baseEnvelope, resolutionState: 'partial' as const };
  assert.equal(decideAMTCompatibility(envelope, 'quality_threshold'), 'limited');
  assert.equal(decideAMTCompatibility(envelope, 'delivery_zone_eligibility'), 'blocked');
});

test('unresolved and rejected AMT states block proof issuance', () => {
  assert.equal(decideAMTCompatibility({ ...baseEnvelope, resolutionState: 'unresolved' }, 'freshness'), 'blocked');
  assert.equal(decideAMTCompatibility({ ...baseEnvelope, resolutionState: 'rejected' }, 'not_revoked'), 'blocked');
});

test('disputed AMT state requires verifier policy', () => {
  assert.equal(decideAMTCompatibility({ ...baseEnvelope, resolutionState: 'disputed' }, 'anonymous_rate_limit'), 'policy_dependent');
});

