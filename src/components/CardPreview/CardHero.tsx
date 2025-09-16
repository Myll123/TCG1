import React from 'react';
import { HeroCard } from '../../types';

function ExtraCosts({
  extra,
}: {
  extra?: HeroCard['abilities'][number]['extraCosts'];
}) {
  if (!extra) {
    return null;
  }
  const tags: string[] = [];
  if (extra.sacrifice) tags.push('Sacrifice');
  if (extra.discardHand) tags.push('Défausser la main');
  if (tags.length === 0) return null;
  return (
    <div className="mt-2 flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/60">
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
    <div className="mt-6 space-y-4">
      <div className="flex items-center justify-between text-sm font-semibold uppercase tracking-[0.2em] text-white/85">
        <span>ATK {card.attack}</span>
        <span>Deck HP {card.deckHP}</span>
      </div>
      {card.abilities?.length ? (
        <div className="rounded-2xl bg-white/10 p-4">
          <h4 className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            Capacités
          </h4>
          <div className="mt-3 space-y-3 text-sm text-white/90">
            {card.abilities.map((ability, index) => (
              <div key={`${ability.kind}-${index}`} className="rounded-xl bg-white/5 p-3">
                <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                  <span>{ability.kind}</span>
                  {ability.costPA != null && <span>{ability.costPA} PA</span>}
                </div>
                <p className="mt-2 leading-relaxed">{ability.text}</p>
                <ExtraCosts extra={ability.extraCosts} />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
