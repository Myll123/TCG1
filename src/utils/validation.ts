import { Card, Faction, HeroCard, UnitCard, ActionCard } from '../types';

export function autoColorByFaction(faction: Faction): string {
  const colors: Record<Faction, string> = {
    Verdantheart: '#0f3d2e',
    Ethersight: '#5b2a86',
    Bloodfury: '#5a0d16',
  };
  return colors[faction];
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export function validateCard(card: Card): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!card.name) errors.push('Nom requis');
  if (!card.type) errors.push('Type requis');
  if (!card.faction) errors.push('Faction requise');
  if (card.costPA == null || card.costPA < 0) errors.push('Coût PA invalide');

  if (card.type === 'Action') {
    const c = card as ActionCard;
    if (!c.effectText) errors.push('Texte d\'effet requis');
    if (c.costPA > 4) errors.push('Coût PA des actions ≤ 4');
  }

  if (card.type === 'Unit') {
    const c = card as UnitCard;
    if (c.attack == null) errors.push('ATQ requise');
    if (c.hp == null) errors.push('HP requis');
    if (c.costPA >= 2 && c.hp < 3)
      warnings.push('HP faible pour un coût PA élevé');
  }

  if (card.type === 'Hero') {
    const c = card as HeroCard;
    if (c.deckHP == null) errors.push('deckHP requis');
    if (c.deckHP < 25 || c.deckHP > 40)
      errors.push('deckHP doit être entre 25 et 40');
  }

  return { valid: errors.length === 0, errors, warnings };
}
