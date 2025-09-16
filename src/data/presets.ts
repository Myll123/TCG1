import { Card } from '../types';

export interface CardPreset {
  id: string;
  name: string;
  tagline: string;
  type: Card['type'];
  card: Card;
}

export const presets: CardPreset[] = [
  {
    id: 'preset-lumen-guardian',
    name: "Gardien de Lumen", 
    tagline: 'Héros défenseur • Mur de lumière',
    type: 'Hero',
    card: {
      id: 'preset-lumen-guardian-card',
      type: 'Hero',
      name: "Gardien de Lumen",
      faction: 'Verdantheart',
      colorHex: '#14594b',
      costPA: 0,
      attack: 2,
      deckHP: 34,
      setCode: 'LUM-001',
      rarity: 'Epic',
      artUrl:
        'https://images.unsplash.com/photo-1618005198919-d3d4b5a92eee?auto=format&fit=crop&w=900&q=80',
      artist: 'Soraya Holt',
      flavorText: 'La lumière que tu projettes est celle que tu cultives.',
      synergyTags: ['Mur', 'Soutien'],
      abilities: [
        {
          kind: 'Passive',
          text: 'Vos unités gagnent +1 DEF tant que le Gardien est en jeu.',
        },
        {
          kind: 'Active',
          costPA: 1,
          text: 'Octroie un bouclier de 3 PV à une unité alliée.',
        },
        {
          kind: 'Ultimate',
          costPA: 3,
          text: 'Restaure tous les PV d\'une unité et lui donne Provocation ce tour.',
          extraCosts: { sacrifice: false, discardHand: false },
        },
      ],
    },
  },
  {
    id: 'preset-sky-piercer',
    name: 'Traqueur du Voile',
    tagline: 'Unité evasive • Burst éclair',
    type: 'Unit',
    card: {
      id: 'preset-sky-piercer-card',
      type: 'Unit',
      name: 'Traqueur du Voile',
      faction: 'Ethersight',
      colorHex: '#311a52',
      costPA: 3,
      attack: 4,
      hp: 11,
      setCode: 'ETH-112',
      rarity: 'Rare',
      artUrl:
        'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
      artist: 'Miko Aster',
      flavorText: 'Un seul éclat suffit à déchirer le voile des mondes.',
      synergyTags: ['Flash', 'Combo'],
      keywords: ['Flash', 'Ranged'],
      abilities: [
        {
          kind: 'Active',
          costPA: 1,
          text: 'Inflige 2 dégâts à n\'importe quelle cible.',
        },
      ],
    },
  },
  {
    id: 'preset-crimson-ritual',
    name: 'Rituel Sangpourpre',
    tagline: 'Action agressive • Sacrifice',
    type: 'Action',
    card: {
      id: 'preset-crimson-ritual-card',
      type: 'Action',
      name: 'Rituel Sangpourpre',
      faction: 'Bloodfury',
      colorHex: '#64111b',
      costPA: 2,
      setCode: 'BLD-078',
      rarity: 'Uncommon',
      artUrl:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=80',
      artist: 'Kaya Brant',
      flavorText: 'La puissance réclame toujours son dû.',
      synergyTags: ['Saignement', 'Sacrifice'],
      effectText:
        'En sacrifiant une unité alliée, infligez 4 dégâts à une cible et piochez une carte.',
    },
  },
];
