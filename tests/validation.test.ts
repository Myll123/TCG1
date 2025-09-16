import { describe, it, expect } from 'vitest';
import { validateCard } from '../src/utils/validation';
import { Card } from '../src/types';

const baseHero: Card = {
  id: 'h1',
  type: 'Hero',
  name: 'Test Hero',
  faction: 'Verdantheart',
  costPA: 0,
  attack: 1,
  deckHP: 30,
  abilities: []
};

describe('validateCard', () => {
  it('valide une carte correcte', () => {
    const res = validateCard(baseHero);
    expect(res.valid).toBe(true);
    expect(res.errors).toHaveLength(0);
  });

  it('rejette un coût PA trop élevé pour une action', () => {
    const action: Card = {
      id: 'a1',
      type: 'Action',
      name: 'Big Boom',
      faction: 'Bloodfury',
      costPA: 5,
      effectText: 'boom'
    };
    const res = validateCard(action);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('Coût PA des actions ≤ 4');
  });

  it('rejette un deckHP hors limites', () => {
    const hero = { ...baseHero, deckHP: 50 } as Card;
    const res = validateCard(hero);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('deckHP doit être entre 25 et 40');
  });

  it('requiert ATQ et HP pour une unité', () => {
    const unit: Card = {
      id: 'u1',
      type: 'Unit',
      name: 'Soldat',
      faction: 'Ethersight',
      costPA: 2,
      attack: 2,
      hp: undefined as any
    };
    const res = validateCard(unit);
    expect(res.valid).toBe(false);
    expect(res.errors).toContain('HP requis');
  });
});
