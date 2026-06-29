# Adoption Readiness: ZK Address Predicates

This note explains how ZK Address Predicates can be reviewed as a privacy
layer above Address Morphism Theory (AMT).

## Review Audience

- Ethereum ecosystem reviewers evaluating public-signal safety.
- Privacy researchers evaluating proof boundaries.
- Public-good funders evaluating whether address use can avoid unnecessary
  disclosure.
- Application teams building POS, locker, delivery, hotel, or field workflows.

## Core Public-Good Claim

The repository defines how to prove scoped address facts without revealing the
full address content. The important point is conservative separation: AMT
resolves the referent, and this repository only proves predicates over
AMT-compatible commitments, roots, nullifiers, and verifier policies.

## What Is Verifiable Today

- ZK-ready TypeScript model for predicates, public signals, bundles, and AMT
  state guards.
- JSON schema checks for proof requests, policies, issuer registries, and
  bundles.
- Compatibility fixtures shared with `agid-interoperability-contracts`.
- Publication-safety scan for public repository material.
- CI verification on GitHub.

## What Is Deliberately Not Claimed

- Audited production circuit security.
- A complete proving system.
- Any need to store address data on a blockchain.
- Ability to turn an unsafe AMT state into a safe result.
- Global candidate-generation completeness.

## Strongest Grant Fit

- Ethereum Foundation: proof boundaries, verifier policies, nullifier scope,
  and no-address-on-chain design.
- NLnet Foundation: privacy-preserving open infrastructure.
- Mozilla Foundation: user agency and minimal disclosure.
- UNICEF Venture Fund: delivery, service access, and verification workflows in
  places where exposing address details can increase harm.

## Next Evidence to Add

1. A circuit-readiness matrix separating relation definitions, public inputs,
   private witness fields, and audit status.
2. A formal threat model for linkability, replay, issuer trust, revocation, and
   stale credentials.
3. Cross-repo tests that import proof obligations from
   `agid-interoperability-contracts`.
4. One proof-only application walkthrough for POS or locker pickup.

