import { Card } from '../types';

export const seedCards: Card[] = [
  {
    id: 'hero-verdant-guardian',
    type: 'Hero',
    name: "Gaia's Warden",
    faction: 'Verdantheart',
    costPA: 0,
    attack: 2,
    deckHP: 35,
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
    costPA: 4,
    attack: 4,
    hp: 14,
    keywords: ['Flash'],
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
    effectText: 'Sacrifiez une unité: infligez 3 dégâts et piochez 1.'
  }
];
