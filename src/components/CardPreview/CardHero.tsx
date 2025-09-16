import React from 'react';
import { HeroCard } from '../../types';

const kindColors: Record<HeroCard['abilities'][number]['kind'], string> = {
  Passive: 'bg-emerald-400/10 text-emerald-100 border-emerald-400/30',
  Active: 'bg-sky-400/10 text-sky-100 border-sky-400/40',
  Ultimate: 'bg-amber-400/10 text-amber-100 border-amber-400/40',
};

function ExtraCosts({ extra }: { extra?: HeroCard['abilities'][number]['extraCosts'] }) {
  if (!extra) {
    return null;
  }
  const tags: string[] = [];
  if (extra.sacrifice) tags.push('Sacrifice');
  if (extra.discardHand) tags.push('Défausse totale');
  if (tags.length === 0) return null;
  return (
    <div className="mt-3 flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/60">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full bg-white/10 px-2 py-1">
          {tag}
        </span>
      ))}
    </div>
  );
}

export default function CardHero({ card }: { card: HeroCard }) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
        <span className="rounded-full bg-white/10 px-3 py-1">ATK {card.attack}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">Deck HP {card.deckHP}</span>
      </div>
      {card.abilities?.length ? (
        <div className="space-y-3">
          {card.abilities.map((ability, index) => (
            <div
              key={`${ability.kind}-${index}`}
              className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/90"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.3em]">
                <span className={`rounded-full border px-3 py-1 ${kindColors[ability.kind]}`}>{ability.kind}</span>
                {ability.costPA != null && <span className="text-white/70">{ability.costPA} PA</span>}
              </div>
              <p className="mt-3 leading-relaxed">{ability.text}</p>
              <ExtraCosts extra={ability.extraCosts} />
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-white/70">
          Ajoutez des capacités pour donner de la personnalité à votre héros.
        </p>
      )}
    </div>
  );
}
