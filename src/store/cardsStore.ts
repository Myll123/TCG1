import { useState, useEffect } from 'react';
import { Card } from '../types';
import { deserializeSet, serializeSet } from '../utils/serialization';
import { seedCards } from '../data/seed';

const STORAGE_KEY = 'noxen-cards';

export function useCardsStore() {
  const [cards, setCards] = useState<Card[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? deserializeSet(stored) : seedCards;
  });

  const [selectedId, setSelectedId] = useState<string | undefined>(
    () => cards[0]?.id
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, serializeSet(cards));
  }, [cards]);

  const selected = cards.find((c) => c.id === selectedId);

  function upsert(card: Card) {
    setCards((prev) => {
      const idx = prev.findIndex((c) => c.id === card.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = card;
        return copy;
      }
      return [...prev, card];
    });
    setSelectedId(card.id);
  }

  function duplicate(id: string) {
    const orig = cards.find((c) => c.id === id);
    if (orig) {
      const copy = { ...orig, id: `${orig.id}-copy-${Date.now()}` };
      upsert(copy);
    }
  }

  function importSet(json: string) {
    try {
      const set = deserializeSet(json);
      setCards(set);
      setSelectedId(set[0]?.id);
    } catch (e) {
      console.error('Invalid JSON', e);
    }
  }

  function exportSet() {
    return serializeSet(cards);
  }

  return {
    cards,
    selected,
    setSelectedId,
    upsert,
    duplicate,
    importSet,
    exportSet,
  } as const;
}
