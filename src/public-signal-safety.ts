const forbiddenKeys = [
  'address',
  'rawAddress',
  'recipient',
  'street',
  'houseNumber',
  'unit',
  'room',
  'phone',
  'email',
  'witness',
  'privateKey',
  'secret',
  'latitude',
  'longitude',
  'preciseCoordinate',
];

export function findUnsafePublicSignalKeys(value: unknown): string[] {
  const hits = new Set<string>();

  function visit(node: unknown, path: string[]) {
    if (!node || typeof node !== 'object') return;
    for (const [key, child] of Object.entries(node as Record<string, unknown>)) {
      if (forbiddenKeys.some(forbidden => key.toLowerCase() === forbidden.toLowerCase())) {
        hits.add([...path, key].join('.'));
      }
      visit(child, [...path, key]);
    }
  }

  visit(value, []);
  return [...hits].sort();
}

export function publicSignalsAreSafe(value: unknown): boolean {
  return findUnsafePublicSignalKeys(value).length === 0;
}
