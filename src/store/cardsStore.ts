import { useState, useEffect } from 'react';
import { Card } from '../types';
import { deserializeCard, deserializeSet, serializeSet } from '../utils/serialization';
import { seedCards } from '../data/seed';
import { cloneCard } from '../utils/cardFactory';

const STORAGE_KEY = 'noxen-cards';

export function useCardsStore() {
  const [cards, setCards] = useState<Card[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? deserializeSet(stored) : seedCards;
  });

  const [selectedId, setSelectedId] = useState<string | undefined>(() => cards[0]?.id);

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
      const copy = cloneCard(orig, { withNewId: true });
      upsert(copy);
    }
  }

  function importSet(json: string) {
    try {
      const parsed = JSON.parse(json);
      const set = Array.isArray(parsed)
        ? deserializeSet(json)
        : [deserializeCard(json)];
      if (set.length === 0) return;
      setCards(set);
      setSelectedId(set[0]?.id);
    } catch (e) {
      console.error('Invalid JSON', e);
    }
  }

  function remove(id: string) {
    setCards((prev) => {
      const filtered = prev.filter((c) => c.id !== id);
      if (filtered.length === 0) {
        setSelectedId(undefined);
      } else if (selectedId === id) {
        setSelectedId(filtered[0].id);
      }
      return filtered;
    });
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
    remove,
    exportSet,
  } as const;
}
