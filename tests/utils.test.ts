import { describe, it, expect } from 'vitest';
import { autoColorByFaction } from '../src/utils/validation';
import { serializeCard, deserializeCard } from '../src/utils/serialization';
import { Card } from '../src/types';

describe('autoColorByFaction', () => {
  it('retourne la couleur correcte', () => {
    expect(autoColorByFaction('Verdantheart')).toBe('#0f3d2e');
    expect(autoColorByFaction('Ethersight')).toBe('#5b2a86');
    expect(autoColorByFaction('Bloodfury')).toBe('#5a0d16');
  });
});

describe('serialisation', () => {
  it('sérialise et désérialise une carte', () => {
    const card: Card = {
      id: 'a1',
      type: 'Action',
      name: 'Test',
      faction: 'Bloodfury',
      costPA: 1,
      effectText: 'test'
    };
    const json = serializeCard(card);
    const parsed = deserializeCard(json);
    expect(parsed).toEqual(card);
  });
});
