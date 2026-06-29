# 17. Security And Server-Side Analysis

Managed proof servers are high risk. They must not store witnesses, private
keys, raw addresses, decrypted QR payloads, or reusable proof secrets.

Required controls:

- short-lived sessions
- explicit purpose scope
- no unsafe retry
- rate limits
- audit logs without private material
- revocation and freshness roots
- dead-letter handling for failed proof generation
