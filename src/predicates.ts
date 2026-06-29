import type { AddressWitness, PredicateName } from './types.ts';

export type PredicateRequest =
  | { predicate: 'region_membership'; regionId: string }
  | { predicate: 'quality_threshold'; minimumScore: number }
  | { predicate: 'consent_scope'; scope: string }
  | { predicate: 'freshness'; nowEpochDays: number; maxAgeDays: number }
  | { predicate: 'not_revoked' }
  | { predicate: 'delivery_zone_eligibility'; regionId: string; minimumScore: number }
  | { predicate: 'anonymous_rate_limit'; anonymitySetSize: number; minimumSetSize: number };

export function predicateName(request: PredicateRequest): PredicateName {
  return request.predicate;
}

export function evaluatePredicate(witness: AddressWitness, request: PredicateRequest): boolean {
  switch (request.predicate) {
    case 'region_membership':
      return witness.regionIds.includes(request.regionId);
    case 'quality_threshold':
      return witness.qualityScore >= request.minimumScore;
    case 'consent_scope':
      return witness.consentScopes.includes(request.scope);
    case 'freshness':
      return request.nowEpochDays - witness.issuedAtEpochDays <= request.maxAgeDays;
    case 'not_revoked':
      return !witness.revoked;
    case 'delivery_zone_eligibility':
      return witness.regionIds.includes(request.regionId) && witness.qualityScore >= request.minimumScore && !witness.revoked;
    case 'anonymous_rate_limit':
      return request.anonymitySetSize >= request.minimumSetSize;
  }
}
