# 6. Main Relation For ZK Address Proofs

The main relation checks:

1. the commitment binds to a valid AMT credential
2. the issuer is trusted by policy
3. the credential is fresh
4. the credential is not revoked
5. the requested predicate is true
6. the proof scope is allowed
7. the nullifier is correctly scoped
8. no raw address field appears in public signals

This relation is a specification target. The TypeScript code is a local
reference model, not a cryptographic circuit.
