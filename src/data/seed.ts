import { Card } from '../types';

export const seedCards: Card[] = [
  {
    id: 'hero-verdant-guardian',
    type: 'Hero',
    name: "Gaia's Warden",
    faction: 'Verdantheart',
    colorHex: '#14594b',
    costPA: 0,
    attack: 2,
    deckHP: 35,
    setCode: 'LUM-002',
    rarity: 'Epic',
    artUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=900&q=80',
    artist: 'Soraya Holt',
    flavorText: 'Chaque racine qui s\'étend renforce sa vigilance.',
    synergyTags: ['Mur', 'Soutien'],
    abilities: [
      { kind: 'Passive', text: 'Régénère 1 PV à chaque tour' },
      { kind: 'Active', costPA: 1, text: '+1/+1' },
      { kind: 'Ultimate', costPA: 3, text: 'Soigne toutes vos unités à fond' }
    ]
  },
  {
    id: 'unit-veil-dragon',
    type: 'Unit',
    name: 'Veil Dragon',
    faction: 'Ethersight',
    colorHex: '#311a52',
    costPA: 4,
    attack: 4,
    hp: 14,
    setCode: 'ETH-207',
    rarity: 'Rare',
    artUrl: 'https://images.unsplash.com/photo-1618005198919-1f97c7fb1b15?auto=format&fit=crop&w=900&q=80',
    artist: 'Miko Aster',
    flavorText: 'Il fend la brume en laissant un sillage d\'étincelles.',
    synergyTags: ['Flash', 'Vol'],
    keywords: ['Flash', 'Ranged'],
    abilities: [
      { kind: 'Active', costPA: 2, text: "Invoque deux 'Esprit du Savoir' 0/3" }
    ]
  },
  {
    id: 'action-hemofury',
    type: 'Action',
    name: 'Hemofury',
    faction: 'Bloodfury',
    costPA: 2,
    colorHex: '#64111b',
    setCode: 'BLD-041',
    rarity: 'Uncommon',
    artUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80',
    artist: 'Kaya Brant',
    flavorText: 'Ceux qui versent le sang décident de son prix.',
    synergyTags: ['Sacrifice'],
    effectText: 'Sacrifiez une unité: infligez 3 dégâts et piochez 1.'
  }
];
