import React from 'react';
import { UnitCard } from '../../types';

const kindColors: Record<UnitCard['abilities'][number]['kind'], string> = {
  Passive: 'bg-emerald-400/10 text-emerald-100 border-emerald-400/30',
  Active: 'bg-sky-400/10 text-sky-100 border-sky-400/40',
  Ultimate: 'bg-amber-400/10 text-amber-100 border-amber-400/40',
};

export default function CardUnit({ card }: { card: UnitCard }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
        <span className="rounded-full bg-white/10 px-3 py-1">ATK {card.attack}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">HP {card.hp}</span>
      </div>
      {card.keywords?.length ? (
        <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/60">
          {card.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-white/10 px-3 py-1">
              {keyword}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-[0.65rem] uppercase tracking-[0.3em] text-white/40">
          Ajoutez des mots-clés pour clarifier le rôle de l'unité.
        </p>
      )}
      {card.abilities?.length ? (
        <div className="space-y-3 text-sm text-white/90">
          {card.abilities.map((ability, index) => (
            <div
              key={`${ability.kind}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-4"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className={`rounded-full border px-3 py-1 ${kindColors[ability.kind]}`}>{ability.kind}</span>
                {ability.costPA != null && <span className="text-white/70">{ability.costPA} PA</span>}
              </div>
              <p className="mt-3 leading-relaxed">{ability.text}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
