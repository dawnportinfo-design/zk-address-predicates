# 7. Commutative Diagrams

The intended diagram is:

```text
AMT referent -> credential -> commitment -> proof bundle
      |             |              |              |
      v             v              v              v
  source policy -> issuer trust -> public signals -> verifier decision
```

The diagram commutes only if the issuer, root, scope, freshness, and revocation
checks agree. It breaks when candidate coverage, issuer trust, or public-signal
safety fails.
