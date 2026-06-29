# ZK Address Predicates

Zero-Knowledge Address Predicates is an independent research and reference-code
repository for proving useful address claims without disclosing the raw address.

The project is a companion to Address Morphism Theory (AMT). AMT defines how an
address expression becomes an evidence-bound referent. This repository defines
what can be proved about that referent without revealing the underlying address,
recipient, witness, private key, or precise private coordinate.

For the cross-repository boundary, read
[`compatibility/address-morphism-theory.md`](compatibility/address-morphism-theory.md).
ZK verification must not upgrade an unsafe AMT resolution state.

Shared schemas, types, and cross-layer test vectors live in
[`agid-interoperability-contracts`](https://github.com/dawnportinfo-design/agid-interoperability-contracts).
The paper chapter `paper/20-amt-state-guard-and-interoperability-contracts.md`
states the AMT state guard, public-signal discipline, nullifier scope, and
proof-bundle compatibility matrix.

## Core Question

Can a user prove that an address is usable for a purpose without revealing the
address itself?

Examples:

- the address is inside a delivery zone
- the address belongs to a country, state, city, postal-equivalent area, or AGID
  region
- the address quality is at least `verified`
- the credential is fresh and not revoked
- the consent scope allows delivery, hotel check-in, locker pickup, or audit
- a nullifier prevents replay without linking unrelated uses

## Non-Claims

This repository is **ZK-ready**, not a claim of audited circuit security.

It does not claim:

- production-grade circuit implementation
- cryptographic audit completion
- global candidate-generation completeness
- on-chain storage of address data
- raw address publication
- that Ethereum or any blockchain is required

## Repository Layout

- `paper/` - chapterized paper draft.
- `appendices/` - schemas, verified/unverified claim map, references.
- `specs/` - JSON schemas for envelopes, public signals, verifier policy,
  issuer registry, and proof bundles.
- `src/` - small dependency-free TypeScript reference model.
- `tests/` - executable tests for public-signal safety, nullifiers, policies,
  and proof bundles.
- `diagrams/` - Mermaid diagrams.
- `scripts/` - local verification scripts.
- `compatibility/` - AMT boundary notes, compatibility matrix, and shared test
  vectors.

## Quick Start

```bash
npm install
npm run verify
```

The verification is local-only. It does not call external services.

## Safety Rules

- Do not commit raw personal addresses.
- Do not commit recipient records.
- Do not commit private coordinates.
- Do not commit witness data.
- Do not commit private keys or proof secrets.
- Public signals must expose only scoped predicates, commitments, roots,
  nullifiers, status, and policy identifiers.

## License

- Code and schemas: MIT.
- Papers and documentation: CC BY 4.0, see `LICENSE-PAPERS.md`.
