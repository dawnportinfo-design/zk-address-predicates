import type { IssuerTrustRecord, PredicateName, ProofEnvelope } from './types.ts';

export function issuerAllowed(
  envelope: ProofEnvelope,
  predicate: PredicateName,
  registry: IssuerTrustRecord[],
): boolean {
  const issuer = registry.find(record => record.id === envelope.issuerId);
  if (!issuer) return false;
  return (
    issuer.acceptedCredentialTypes.includes(envelope.credentialType) &&
    issuer.allowedPredicates.includes(predicate) &&
    issuer.auditStatus !== 'unaudited'
  );
}
