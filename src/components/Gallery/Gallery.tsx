import React from 'react';
import { Card } from '../../types';

interface Props {
  cards: Card[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function Gallery({ cards, selectedId, onSelect }: Props) {
  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {cards.map((card) => {
        const isActive = selectedId === card.id;
        return (
          <button
            key={card.id}
            type="button"
            className={`rounded-2xl border px-3 py-3 text-left text-xs transition focus:outline-none focus:ring-2 focus:ring-sky-400/70 ${
              isActive
                ? 'border-sky-400/80 bg-sky-400/10 shadow-[0_12px_28px_rgba(56,189,248,0.22)]'
                : 'border-transparent bg-white/5 hover:border-slate-600/40 hover:bg-white/10'
            }`}
            onClick={() => onSelect(card.id)}
          >
            <div className="flex items-center justify-between text-[0.7rem] uppercase tracking-[0.28em] text-slate-400">
              <span>{card.type}</span>
              <span>{card.faction}</span>
            </div>
            <div className="mt-2 truncate text-sm font-semibold text-white">{card.name}</div>
            {card.type === 'Hero' && (
              <div className="mt-3 flex items-center gap-4 text-[0.65rem] font-semibold text-slate-300">
                <span>ATK {card.attack}</span>
                <span>Deck HP {card.deckHP}</span>
              </div>
            )}
            {card.type === 'Unit' && (
              <div className="mt-3 flex items-center gap-4 text-[0.65rem] font-semibold text-slate-300">
                <span>ATK {card.attack}</span>
                <span>HP {card.hp}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
