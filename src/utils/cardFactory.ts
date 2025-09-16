import { Ability, Card, CardType, HeroCard, UnitCard, ActionCard } from '../types';
import { autoColorByFaction } from './validation';

const DEFAULT_BASE = {
  name: 'Nouvelle carte',
  costPA: 1,
  setCode: 'SET-001',
  rarity: 'Common' as Card['rarity'],
  artUrl: '',
  artist: '',
  flavorText: '',
  synergyTags: [] as string[],
};

function cloneAbilities(list?: Ability[]): Ability[] {
  if (!list) return [];
  return list.map((ability) => ({
    ...ability,
    extraCosts: ability.extraCosts ? { ...ability.extraCosts } : undefined,
  }));
}

function buildBase(card: Partial<Card>, type: CardType): Pick<Card, 'id' | 'type' | 'name' | 'faction' | 'costPA'> & {
  colorHex?: string;
  rarity?: Card['rarity'];
  setCode?: string;
  artUrl?: string;
  artist?: string;
  flavorText?: string;
  synergyTags?: string[];
} {
  const faction = (card.faction ?? 'Verdantheart') as Card['faction'];
  return {
    id: card.id ?? `card-${type.toLowerCase()}-${Date.now()}`,
    type,
    name: card.name ?? DEFAULT_BASE.name,
    faction,
    costPA: card.costPA ?? DEFAULT_BASE.costPA,
    colorHex: card.colorHex ?? autoColorByFaction(faction),
    rarity: card.rarity ?? DEFAULT_BASE.rarity,
    setCode: card.setCode ?? DEFAULT_BASE.setCode,
    artUrl: card.artUrl ?? DEFAULT_BASE.artUrl,
    artist: card.artist ?? DEFAULT_BASE.artist,
    flavorText: card.flavorText ?? DEFAULT_BASE.flavorText,
    synergyTags: card.synergyTags ? [...card.synergyTags] : [...DEFAULT_BASE.synergyTags],
  };
}

export function createBlankCard(type: CardType, overrides: Partial<Card> = {}): Card {
  const base = buildBase(overrides, type);
  switch (type) {
    case 'Hero':
      return {
        ...base,
        type: 'Hero',
        costPA: overrides.costPA ?? 0,
        attack: (overrides as Partial<HeroCard>).attack ?? 2,
        deckHP: (overrides as Partial<HeroCard>).deckHP ?? 32,
        abilities: cloneAbilities((overrides as Partial<HeroCard>).abilities),
      } satisfies HeroCard;
    case 'Unit':
      return {
        ...base,
        type: 'Unit',
        costPA: overrides.costPA ?? 2,
        attack: (overrides as Partial<UnitCard>).attack ?? 3,
        hp: (overrides as Partial<UnitCard>).hp ?? 6,
        keywords: (overrides as Partial<UnitCard>).keywords
          ? [...((overrides as Partial<UnitCard>).keywords as string[])]
          : [],
        abilities: cloneAbilities((overrides as Partial<UnitCard>).abilities),
      } satisfies UnitCard;
    case 'Action':
    default:
      return {
        ...base,
        type: 'Action',
        costPA: overrides.costPA ?? 1,
        effectText: (overrides as Partial<ActionCard>).effectText ?? '',
      } satisfies ActionCard;
  }
}

export function convertCardTo(card: Card, type: CardType): Card {
  const base = buildBase(card, type);
  switch (type) {
    case 'Hero': {
      const current = card.type === 'Hero' ? (card as HeroCard) : undefined;
      return {
        ...base,
        type: 'Hero',
        costPA: card.costPA ?? 0,
        attack: current?.attack ?? (card as Partial<UnitCard>).attack ?? 2,
        deckHP: current?.deckHP ?? 30,
        abilities: cloneAbilities(current?.abilities),
      } satisfies HeroCard;
    }
    case 'Unit': {
      const current = card.type === 'Unit' ? (card as UnitCard) : undefined;
      return {
        ...base,
        type: 'Unit',
        costPA: card.costPA ?? 2,
        attack: current?.attack ?? (card as Partial<HeroCard>).attack ?? 3,
        hp: current?.hp ?? 6,
        keywords: current?.keywords ? [...current.keywords] : [],
        abilities: cloneAbilities(current?.abilities),
      } satisfies UnitCard;
    }
    case 'Action':
    default: {
      const current = card.type === 'Action' ? (card as ActionCard) : undefined;
      return {
        ...base,
        type: 'Action',
        costPA: card.costPA ?? 1,
        effectText: current?.effectText ?? '',
      } satisfies ActionCard;
    }
  }
}

export function cloneCard(card: Card, options: { withNewId?: boolean } = {}): Card {
  const copy = convertCardTo({ ...card, id: card.id }, card.type);
  if (options.withNewId) {
    copy.id = `${card.id}-copy-${Date.now()}`;
  }
  return copy;
}
