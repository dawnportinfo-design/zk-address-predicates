import type { ProofEnvelope } from './types.ts';

export function createProofEnvelope(input: Omit<ProofEnvelope, 'schemaVersion'>): ProofEnvelope {
  return {
    schemaVersion: 'zk-address-proof-envelope-v0.1',
    ...input,
  };
}

export function envelopeIsPublicSafe(envelope: ProofEnvelope): boolean {
  return envelope.commitment.startsWith('commit_') && !JSON.stringify(envelope).toLowerCase().includes('rawaddress');
}
