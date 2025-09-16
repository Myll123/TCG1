import React from 'react';
import { Card } from '../../types';

interface Props {
  cards: Card[];
  selectedId?: string;
  onSelect: (id: string) => void;
  onClearFilters?: () => void;
}

const typeLabels: Record<Card['type'], string> = {
  Hero: 'Héros',
  Unit: 'Unité',
  Action: 'Action',
};

export default function Gallery({ cards, selectedId, onSelect, onClearFilters }: Props) {
  if (cards.length === 0) {
    return (
      <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-3 px-6 py-10 text-center text-slate-300">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Aucun résultat</p>
        <p className="max-w-sm text-sm text-slate-400">
          Ajustez vos filtres ou créez une nouvelle carte pour remplir votre collection.
        </p>
        {onClearFilters ? (
          <button
            type="button"
            className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-400/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            onClick={onClearFilters}
          >
            Réinitialiser les filtres
          </button>
        ) : null}
      </div>
    );
  }

  return (
    <div className="grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {cards.map((card) => {
        const isActive = selectedId === card.id;
        const hasArt = !!card.artUrl;
        return (
          <button
            key={card.id}
            type="button"
            className={`group relative overflow-hidden rounded-3xl border px-0 text-left transition focus:outline-none focus:ring-2 focus:ring-sky-400/70 ${
              isActive
                ? 'border-sky-400/80 bg-sky-400/10 shadow-[0_12px_28px_rgba(56,189,248,0.22)]'
                : 'border-transparent bg-white/5 hover:border-slate-600/40 hover:bg-white/10'
            }`}
            onClick={() => onSelect(card.id)}
          >
            <div className="relative h-32 overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: hasArt
                    ? `linear-gradient(to top, rgba(15,23,42,0.75), rgba(15,23,42,0.2)), url(${card.artUrl})`
                    : 'linear-gradient(135deg, rgba(51,65,85,0.7), rgba(56,189,248,0.25))',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-3 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                <span>{typeLabels[card.type]}</span>
                <span className="text-[0.6rem] text-white/60">{card.setCode ?? 'Set perso'}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 p-4 text-sm text-white">
              <div className="flex items-start justify-between gap-2">
                <span className="truncate text-base font-semibold leading-tight">{card.name}</span>
                <span className="rounded-full bg-white/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-white/70">
                  {card.costPA} PA
                </span>
              </div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-300">{card.faction}</p>
              {card.type === 'Action' ? (
                <p className="text-xs text-slate-300">
                  {card.effectText.length > 120
                    ? `${card.effectText.slice(0, 120)}…`
                    : card.effectText}
                </p>
              ) : (
                <div className="flex items-center gap-3 text-[0.7rem] font-semibold text-slate-200">
                  <span>ATK {card.attack}</span>
                  {card.type === 'Unit' ? <span>HP {card.hp}</span> : null}
                  {card.type === 'Hero' ? <span>Deck HP {card.deckHP}</span> : null}
                </div>
              )}
              {card.synergyTags?.length ? (
                <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-slate-300/80">
                  {card.synergyTags.slice(0, 3).map((tag) => (
                    <span key={tag} className="rounded-full bg-white/10 px-2 py-1">
                      {tag}
                    </span>
                  ))}
                  {card.synergyTags.length > 3 ? (
                    <span className="rounded-full bg-white/5 px-2 py-1">+{card.synergyTags.length - 3}</span>
                  ) : null}
                </div>
              ) : null}
            </div>
          </button>
        );
      })}
    </div>
  );
}
