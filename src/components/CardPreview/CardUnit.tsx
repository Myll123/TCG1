import React from 'react';
import { UnitCard } from '../../types';

export default function CardUnit({ card }: { card: UnitCard }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
        <span>ATK {card.attack}</span>
        <span>HP {card.hp}</span>
      </div>
      {card.keywords?.length ? (
        <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/60">
          {card.keywords.map((keyword) => (
            <span key={keyword} className="rounded-full bg-white/10 px-3 py-1">
              {keyword}
            </span>
          ))}
        </div>
      ) : null}
      {card.abilities?.length ? (
        <div className="rounded-2xl bg-white/10 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Compétences</h4>
          <div className="mt-3 space-y-3 text-sm text-white/90">
            {card.abilities.map((ability, index) => (
              <div key={`${ability.kind}-${index}`} className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  <span>{ability.kind}</span>
                  {ability.costPA != null && <span>{ability.costPA} PA</span>}
                </div>
                <p className="mt-2 leading-relaxed">{ability.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
