import React, { useRef } from 'react';
import { Card, HeroCard, UnitCard, ActionCard } from '../../types';
import CardHero from './CardHero';
import CardUnit from './CardUnit';
import CardAction from './CardAction';
import { autoColorByFaction } from '../../utils/validation';
import { exportCardPNG, exportCardJSON } from '../../utils/export';

const PNG_SCALES = [
  { label: 'PNG x1', scale: 1 },
  { label: 'PNG x2', scale: 2 },
  { label: 'PNG x4', scale: 4 },
];

export default function CardFrame({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const color = card.colorHex || autoColorByFaction(card.faction);

  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex flex-wrap gap-2">
        {PNG_SCALES.map(({ label, scale }) => (
          <button
            key={scale}
            className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold transition hover:border-slate-300/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            onClick={() => ref.current && exportCardPNG(ref.current, scale)}
          >
            {label}
          </button>
        ))}
        <button
          className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold transition hover:border-slate-300/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          onClick={() => exportCardJSON(card)}
        >
          Exporter JSON
        </button>
      </div>
      <div
        ref={ref}
        className="mx-auto w-full max-w-xs overflow-hidden rounded-3xl border border-white/20 bg-slate-900/80 p-6 text-white shadow-[0_24px_60px_rgba(8,47,73,0.45)]"
        style={{
          background: `linear-gradient(160deg, ${color}, rgba(15, 23, 42, 0.95) 120%)`,
        }}
      >
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
          <span>{card.type}</span>
          <span>{card.faction}</span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold tracking-tight">{card.name}</h3>
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">{card.costPA} PA</span>
        </div>
        <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/70">{card.setCode ?? 'Série personnalisée'}</p>
        {card.type === 'Hero' && <CardHero card={card as HeroCard} />}
        {card.type === 'Unit' && <CardUnit card={card as UnitCard} />}
        {card.type === 'Action' && <CardAction card={card as ActionCard} />}
      </div>
    </div>
  );
}
