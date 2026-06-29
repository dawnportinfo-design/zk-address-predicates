import assert from 'node:assert/strict';
import { test } from 'node:test';

import { deriveScopedNullifier, nullifiersLinkable } from '../src/index.ts';

test('derives stable nullifier for the same scope and nonce', () => {
  const left = deriveScopedNullifier('commit_example_1234567890', 'policy-delivery', 'delivery', 'nonce-1');
  const right = deriveScopedNullifier('commit_example_1234567890', 'policy-delivery', 'delivery', 'nonce-1');

  assert.equal(left, right);
  assert.equal(nullifiersLinkable(left, right), true);
});

test('domain separates nullifier across scopes', () => {
  const delivery = deriveScopedNullifier('commit_example_1234567890', 'policy-delivery', 'delivery', 'nonce-1');
  const hotel = deriveScopedNullifier('commit_example_1234567890', 'policy-hotel', 'hotel_checkin', 'nonce-1');

  assert.notEqual(delivery, hotel);
  assert.equal(nullifiersLinkable(delivery, hotel), false);
});
