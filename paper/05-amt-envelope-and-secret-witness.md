# 5. AMT Envelope And Secret Witness

The public AMT envelope contains only safe fields:

- commitment
- credential issuer
- credential type
- root identifiers
- proof scope
- freshness metadata
- verifier policy id

The secret witness may contain address-derived attributes, but it must never be
stored in the repository, logs, QR payloads, or public proof bundles.
