export type Faction = 'Verdantheart' | 'Ethersight' | 'Bloodfury';
export type CardType = 'Hero' | 'Unit' | 'Action';
export type Keyword = 'Stealth' | 'Ranged' | 'Healer' | 'Flash' | 'Protector' | 'Hexproof';

export interface Ability {
  kind: 'Passive' | 'Active' | 'Ultimate';
  text: string;
  costPA?: number;
  extraCosts?: { sacrifice?: boolean; discardHand?: boolean };
}

export interface BaseCard {
  id: string;
  type: CardType;
  name: string;
  faction: Faction;
  colorHex?: string;
  costPA: number;
  rarity?: 'Common' | 'Uncommon' | 'Rare' | 'Epic';
  setCode?: string;
  artUrl?: string;
  artist?: string;
  flavorText?: string;
  synergyTags?: string[];
}

export interface HeroCard extends BaseCard {
  type: 'Hero';
  attack: number;
  deckHP: number;
  abilities: Ability[];
}

export interface UnitCard extends BaseCard {
  type: 'Unit';
  attack: number;
  hp: number;
  keywords?: Keyword[];
  abilities?: Ability[];
}

export interface ActionCard extends BaseCard {
  type: 'Action';
  effectText: string;
}

export type Card = HeroCard | UnitCard | ActionCard;
