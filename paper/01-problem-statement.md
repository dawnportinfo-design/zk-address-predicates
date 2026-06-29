# 1. Problem Statement

Address systems often require too much disclosure. A store, hotel, locker,
delivery robot, or online service may only need to know that a destination is
eligible, fresh, consented, and deliverable. It may not need the raw address.

ZK Address Predicates studies how to prove address-related facts while keeping
the address itself private.

The core problem is:

```text
Given an AMT address envelope and a private witness, prove a scoped predicate
about the address without revealing raw address material.
```

The output should be small, purpose-bound, replay-resistant, unlinkable across
unrelated scopes, and safe for public verification.
