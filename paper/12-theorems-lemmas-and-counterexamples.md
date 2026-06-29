# 12. Theorems, Lemmas, And Counterexamples

## Lemma: Public-Signal Safety

If public signals contain reconstructable address components, the proof is not
address-private even if the cryptographic proof is valid.

## Lemma: Scope Separation

If nullifiers are domain separated by verifier policy and purpose, cross-scope
linkability is reduced.

## Counterexample: Complete Proof, Incomplete Source Set

A proof can be valid for a committed credential while the underlying source set
misses the true address referent. ZK does not solve candidate generation.
