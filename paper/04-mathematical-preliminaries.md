# 4. Mathematical Preliminaries

Let:

- `A` be an AMT address referent.
- `C = Commit(A, r)` be a hiding commitment.
- `W` be the private witness containing address-derived facts.
- `P` be a public predicate.
- `S` be public signals.
- `R` be accepted registry roots.
- `N` be a nullifier scoped to a purpose.

A proof asserts:

```text
exists W such that Relation(C, W, P, S, R, N) = true
```

The verifier learns the predicate result, not the raw address.
