import type {
  AddressWitness,
  IssuerTrustRecord,
  ProofBundle,
  ProofEnvelope,
  PublicSignals,
  VerifierPolicy,
} from './types.ts';
import { issuerAllowed } from './issuer-trust-registry.ts';
import { deriveScopedNullifier } from './nullifier.ts';
import { evaluatePredicate, predicateName, type PredicateRequest } from './predicates.ts';
import { publicSignalsAreSafe } from './public-signal-safety.ts';
import { policyAllows } from './verifier-policy.ts';

export function createReferenceProofBundle(input: {
  envelope: ProofEnvelope;
  witness: AddressWitness;
  request: PredicateRequest;
  policy: VerifierPolicy;
  issuerRegistry: IssuerTrustRecord[];
  nonce: string;
  createdAt: string;
}): ProofBundle {
  const predicate = predicateName(input.request);
  const allowed =
    policyAllows(input.envelope, predicate, input.policy) &&
    issuerAllowed(input.envelope, predicate, input.issuerRegistry);
  const predicateHolds = evaluatePredicate(input.witness, input.request);
  const status = allowed && predicateHolds ? 'accepted' : 'rejected';
  const publicSignals: PublicSignals = {
    policyId: input.policy.id,
    predicate,
    status,
    commitment: input.envelope.commitment,
    nullifier: deriveScopedNullifier(input.envelope.commitment, input.policy.id, input.envelope.proofScope, input.nonce),
    issuerId: input.envelope.issuerId,
  };

  if (!publicSignalsAreSafe(publicSignals)) {
    return {
      schemaVersion: 'zk-address-proof-bundle-v0.1',
      proofType: predicate,
      proofSystemProfile: 'reference-model',
      publicSignals: { ...publicSignals, status: 'rejected' },
      createdAt: input.createdAt,
    };
  }

  return {
    schemaVersion: 'zk-address-proof-bundle-v0.1',
    proofType: predicate,
    proofSystemProfile: 'reference-model',
    publicSignals,
    createdAt: input.createdAt,
  };
}
