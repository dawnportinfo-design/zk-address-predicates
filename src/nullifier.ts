import { createHash } from 'node:crypto';

export function deriveScopedNullifier(commitment: string, policyId: string, scope: string, nonce: string): string {
  const input = ['zk-address-nullifier-v0.1', commitment, policyId, scope, nonce].join('|');
  return `nul_${createHash('sha256').update(input).digest('hex').slice(0, 32)}`;
}

export function nullifiersLinkable(left: string, right: string): boolean {
  return left === right;
}
