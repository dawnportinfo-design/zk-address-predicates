# 11. Compatibility, Collision, And Unlinkability

Nullifiers prevent replay. They must be scoped so that unrelated uses cannot be
linked.

Compatibility rules:

- same proof scope may reuse a stable nullifier when replay prevention is needed
- different proof scopes should derive unlinkable nullifiers
- low-entropy aliases must not be used as nullifiers
- public signals should expose policy identifiers, not hidden address structure
