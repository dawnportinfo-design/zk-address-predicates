import type { PredicateName, ProofEnvelope, VerifierPolicy } from './types.ts';

export function policyAllows(envelope: ProofEnvelope, predicate: PredicateName, policy: VerifierPolicy): boolean {
  return (
    policy.acceptedIssuers.includes(envelope.issuerId) &&
    policy.acceptedPredicates.includes(predicate) &&
    policy.allowedScopes.includes(envelope.proofScope)
  );
}
