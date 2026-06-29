# 2. Boundary With Address Morphism Theory

Address Morphism Theory (AMT) defines address referents, candidate sufficiency,
lineage, safe issuance, and unresolved states.

This repository does not replace AMT. It consumes an AMT envelope and proves
selected predicates about that envelope.

AMT answers:

- What does this address expression refer to?
- Is the candidate set sufficient?
- Can a persistent identifier be issued?

ZK Address Predicates answers:

- Can a verifier learn that a predicate is true without seeing the address?
- Which public signals are safe?
- Which nullifier prevents replay without global tracking?
