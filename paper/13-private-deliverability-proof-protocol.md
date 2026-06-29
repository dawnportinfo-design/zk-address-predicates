# 13. Private Deliverability Proof Protocol

Private deliverability protocol:

1. issuer creates an AMT-derived credential
2. wallet stores the credential locally
3. verifier requests a scoped proof
4. wallet proves deliverability predicate
5. verifier receives `deliverable`, `alias`, `receipt`, `policy`, and `status`
6. carrier receives decryptable or otherwise authorized handoff material only
   when policy allows it

The store, hotel, or POS surface should not need the raw address.
