# Appendix A. Public Schema Proposal

Public schemas live in `specs/`.

The key rule is that public schemas may include commitments, roots, policy ids,
issuer ids, proof types, nullifiers, timestamps, and result status. They must not
include raw address components, recipient data, witness material, private keys,
or precise private coordinates.
