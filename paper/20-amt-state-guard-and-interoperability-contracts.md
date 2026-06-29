# 20. AMT State Guard and Interoperability Contracts

ZK Address Predicates is a proof layer, not an address resolver. It depends on
Address Morphism Theory (AMT) for referent selection, ambiguity handling,
quality state, lineage, and safe refusal.

## 20.1 Dependency Rule

A proof request is valid only when it is derived from an AMT-compatible envelope.
The envelope is defined in
`agid-interoperability-contracts/schemas/amt-envelope.schema.json`.

The ZK repository may check:

- predicate name;
- verifier policy;
- issuer trust;
- public signal safety;
- nullifier scope;
- freshness and revocation roots;
- proof bundle format.

It must not decide:

- whether the candidate set was complete;
- whether the referent was correctly selected;
- whether a disputed source policy is politically or legally correct;
- whether a deprecated PID has a valid successor outside the envelope.

## 20.2 AMT State Guard

The implementation guard is `src/amt-compatibility.ts`.

```text
verified      -> proof can proceed if policy and envelope allow it
partial       -> limited predicates only
ambiguous     -> precise purpose predicates blocked
unresolved    -> blocked
rejected      -> blocked
deprecated    -> successor required before purpose proof
disputed      -> policy-dependent
manual_review -> not automatic
```

## 20.3 Public Signal Discipline

Public signals must be scoped to the verifier policy and purpose. They may
include predicate name, policy id, commitment, issuer id, status, expiration, and
domain-separated nullifier. They must not include private address content,
recipient data, secret witness material, or precise private location material.

## 20.4 Nullifier Scope

A nullifier must be domain-separated by purpose, verifier policy, epoch, and
nonce. A global nullifier would turn proof verification into cross-service
tracking. Therefore nullifier safety is a compatibility condition, not merely a
cryptographic implementation detail.

## 20.5 Proof Bundle Compatibility Matrix

The shared matrix lives in `agid-interoperability-contracts`. This repository
keeps a local guard for reference, but the shared vectors are the conformance
contract.

Required outcomes:

- verified AMT state plus allowed predicate may produce a proof bundle;
- ambiguous AMT state blocks precise delivery and region claims;
- unresolved or rejected AMT state blocks proof issuance;
- deprecated AMT state requires successor handling;
- disputed AMT state is verifier-policy dependent.

## 20.6 Non-Claim

This repository can prove a predicate over an accepted envelope. It cannot prove
that the envelope's upstream candidate generation was globally complete. That
claim belongs to AMT, country repositories, source policy, and regional
verification.

