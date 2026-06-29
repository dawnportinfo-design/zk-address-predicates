# Compatibility with Address Morphism Theory

ZK Address Predicates depends on Address Morphism Theory (AMT). This repository
does not resolve addresses by itself. It proves scoped predicates over an
AMT-compatible referent, credential, commitment, or proof envelope.

## Dependency Boundary

AMT is responsible for:

- candidate generation and source policy;
- resolution, ambiguity, unresolved states, and abstention;
- PID issuance, successor handling, lineage, and quality;
- deciding whether a referent is safe enough for a purpose.

ZK Address Predicates is responsible for:

- commitment-bound predicate proofs;
- public signal safety;
- verifier policy checks;
- nullifier scope, freshness, revocation, and consent scope;
- producing proof bundles without raw address disclosure.

## Safety Rule

ZK verification says that a predicate was proved against an accepted envelope and
policy. It does not say that global address resolution was complete. If AMT
marks a referent as unresolved, ambiguous, rejected, deprecated, or disputed,
proof issuance must follow the compatibility matrix.

## AMT State Guard

The guard is implemented in `src/amt-compatibility.ts` and mirrored by
`compatibility/amt-zk-compatibility-matrix.json`.

```text
verified   -> allowed predicates
partial    -> limited predicates
ambiguous  -> precise predicates blocked
unresolved -> no proof
rejected   -> no proof
deprecated -> successor required
disputed   -> verifier-policy dependent
```

## What This Repository Must Not Do

- generate candidate addresses;
- select a canonical physical or social referent;
- treat a valid proof as evidence that the source data is correct;
- store raw address text, recipient records, private coordinates, witness
  material, private keys, or proof secrets;
- publish global nullifiers that link unrelated uses.

## Recommended Integration

An AMT-compatible implementation should first create an AMT envelope with
commitments, state, quality, source version, freshness root, revocation root,
and allowed predicates. This repository then evaluates the verifier policy and
builds a proof bundle only if the requested predicate is compatible with the AMT
state.

