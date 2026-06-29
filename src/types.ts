export type ProofStatus = 'accepted' | 'rejected' | 'manual_review';

export type PredicateName =
  | 'region_membership'
  | 'quality_threshold'
  | 'consent_scope'
  | 'freshness'
  | 'not_revoked'
  | 'delivery_zone_eligibility'
  | 'anonymous_rate_limit';

export type ProofEnvelope = {
  schemaVersion: 'zk-address-proof-envelope-v0.1';
  commitment: string;
  issuerId: string;
  credentialType: 'address-region' | 'address-quality' | 'deliverability' | 'consent-scope';
  proofScope: string;
  freshnessRoot: string;
  revocationRoot: string;
};

export type AddressWitness = {
  regionIds: string[];
  qualityScore: number;
  consentScopes: string[];
  issuedAtEpochDays: number;
  revoked: boolean;
};

export type VerifierPolicy = {
  id: string;
  acceptedIssuers: string[];
  acceptedPredicates: PredicateName[];
  maxAgeDays: number;
  allowedScopes: string[];
};

export type IssuerTrustRecord = {
  id: string;
  acceptedCredentialTypes: string[];
  allowedPredicates: PredicateName[];
  auditStatus: 'unaudited' | 'reviewed' | 'audited';
};

export type PublicSignals = {
  policyId: string;
  predicate: PredicateName;
  status: ProofStatus;
  commitment: string;
  nullifier: string;
  issuerId: string;
  expiresAt?: string;
};

export type ProofBundle = {
  schemaVersion: 'zk-address-proof-bundle-v0.1';
  proofType: PredicateName;
  proofSystemProfile: 'reference-model' | 'circuit-pending';
  publicSignals: PublicSignals;
  createdAt: string;
};
