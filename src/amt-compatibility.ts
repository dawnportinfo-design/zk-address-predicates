import type { PredicateName } from './types.ts';

export type AMTResolutionState =
  | 'verified'
  | 'partial'
  | 'ambiguous'
  | 'unresolved'
  | 'rejected'
  | 'deprecated'
  | 'disputed';

export type AMTCompatibilityDecision = 'allowed' | 'limited' | 'blocked' | 'policy_dependent';

export type AMTEnvelope = {
  schemaVersion: 'amt-envelope-v0.1';
  referentCommitment: string;
  pidCommitment: string;
  resolutionState: AMTResolutionState;
  qualityState: 'verified' | 'partial' | 'manual_required';
  sourceSetVersion: string;
  lineageRoot: string;
  freshnessRoot: string;
  revocationRoot?: string;
  allowedPredicates: PredicateName[];
};

const stateRules: Record<AMTResolutionState, { decision: AMTCompatibilityDecision; predicates: PredicateName[] }> = {
  verified: {
    decision: 'allowed',
    predicates: [
      'region_membership',
      'quality_threshold',
      'consent_scope',
      'freshness',
      'not_revoked',
      'delivery_zone_eligibility',
      'anonymous_rate_limit',
    ],
  },
  partial: {
    decision: 'limited',
    predicates: ['quality_threshold', 'freshness', 'not_revoked', 'anonymous_rate_limit'],
  },
  ambiguous: {
    decision: 'blocked',
    predicates: ['freshness', 'not_revoked'],
  },
  unresolved: {
    decision: 'blocked',
    predicates: [],
  },
  rejected: {
    decision: 'blocked',
    predicates: [],
  },
  deprecated: {
    decision: 'blocked',
    predicates: ['freshness', 'not_revoked'],
  },
  disputed: {
    decision: 'policy_dependent',
    predicates: ['freshness', 'not_revoked', 'anonymous_rate_limit'],
  },
};

export function decideAMTCompatibility(
  envelope: Pick<AMTEnvelope, 'resolutionState' | 'allowedPredicates'>,
  requestedPredicate: PredicateName,
): AMTCompatibilityDecision {
  const rule = stateRules[envelope.resolutionState];
  const allowedByState = rule.predicates.includes(requestedPredicate);
  const allowedByEnvelope = envelope.allowedPredicates.includes(requestedPredicate);

  if (envelope.resolutionState === 'disputed') {
    return 'policy_dependent';
  }

  if (!allowedByState || !allowedByEnvelope) {
    return 'blocked';
  }

  return rule.decision;
}

