# 14. Identity Integration

ZK address predicates may integrate with DID, VC, OIDC, wallet credentials, or
institutional accounts.

The rule is separation:

- identity proves who controls a credential
- AMT proves what address referent is represented
- ZK predicate proves only the requested property

These layers should not collapse into a single global identifier.
