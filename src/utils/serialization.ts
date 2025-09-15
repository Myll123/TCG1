import { Card } from '../types';

export function serializeCard(card: Card): string {
  return JSON.stringify(card);
}

export function deserializeCard(json: string): Card {
  return JSON.parse(json) as Card;
}

export function serializeSet(cards: Card[]): string {
  return JSON.stringify(cards);
}

export function deserializeSet(json: string): Card[] {
  return JSON.parse(json) as Card[];
}
