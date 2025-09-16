import React, { useMemo, useRef } from 'react';
import { Card, HeroCard, UnitCard, ActionCard } from '../../types';
import CardHero from './CardHero';
import CardUnit from './CardUnit';
import CardAction from './CardAction';
import { autoColorByFaction, validateCard } from '../../utils/validation';
import { copyCardJSON, exportCardJSON, exportCardPNG } from '../../utils/export';

const PNG_SCALES = [
  { label: 'PNG x1', scale: 1 },
  { label: 'PNG x2', scale: 2 },
  { label: 'PNG x4', scale: 4 },
];

const rarityLabel: Record<NonNullable<Card['rarity']>, string> = {
  Common: 'Commune',
  Uncommon: 'Peu commune',
  Rare: 'Rare',
  Epic: 'Épique',
};

const rarityAccent: Record<NonNullable<Card['rarity']>, string> = {
  Common: 'bg-slate-400/20 text-slate-100 border-slate-300/40',
  Uncommon: 'bg-emerald-400/15 text-emerald-100 border-emerald-400/40',
  Rare: 'bg-sky-400/15 text-sky-100 border-sky-400/40',
  Epic: 'bg-violet-400/15 text-violet-100 border-violet-400/40',
};

export default function CardFrame({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const color = card.colorHex || autoColorByFaction(card.faction);
  const diagnostics = validateCard(card);

  const backgroundStyles = useMemo(
    () => ({
      background: `radial-gradient(circle at top left, ${color}55, rgba(15,23,42,0.85)), radial-gradient(circle at 80% 20%, rgba(56,189,248,0.18), transparent 60%)`,
    }),
    [color],
  );

  async function handleCopy() {
    try {
      await copyCardJSON(card);
    } catch (error) {
      console.error('Impossible de copier la carte', error);
    }
  }

  return (
    <div className="flex flex-col gap-4 text-slate-100">
      <div className="flex flex-wrap gap-2">
        {PNG_SCALES.map(({ label, scale }) => (
          <button
            key={scale}
            className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold transition hover:border-slate-300/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
            onClick={() => ref.current && exportCardPNG(ref.current, scale)}
            type="button"
          >
            {label}
          </button>
        ))}
        <button
          className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold transition hover:border-slate-300/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          onClick={() => exportCardJSON(card)}
          type="button"
        >
          Télécharger JSON
        </button>
        <button
          className="rounded-full border border-slate-600/60 bg-slate-900/70 px-4 py-2 text-xs font-semibold transition hover:border-slate-300/60 hover:bg-slate-800/70 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          onClick={handleCopy}
          type="button"
        >
          Copier JSON
        </button>
      </div>

      {diagnostics.errors.length || diagnostics.warnings.length ? (
        <div className="space-y-2 rounded-3xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-xs text-amber-100">
          {diagnostics.errors.map((error, index) => (
            <p key={`error-${index}`}>⚠️ {error}</p>
          ))}
          {diagnostics.warnings.map((warning, index) => (
            <p key={`warning-${index}`}>ℹ️ {warning}</p>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs text-emerald-100">
          ✅ Carte prête à être exportée.
        </div>
      )}

      <div
        ref={ref}
        className="relative mx-auto w-full max-w-sm overflow-hidden rounded-[32px] border border-white/20 bg-slate-950/70 p-6 text-white shadow-[0_32px_70px_rgba(15,23,42,0.55)]"
        style={backgroundStyles}
      >
        <div className="absolute inset-0 overflow-hidden rounded-[32px]">
          {card.artUrl ? (
            <img
              src={card.artUrl}
              alt={card.name}
              className="h-full w-full object-cover opacity-70"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-900/40 text-sm text-white/60">
              Ajoutez une illustration haute résolution
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-slate-950/70 to-slate-950" />
        </div>
        <div className="relative z-10 flex flex-col gap-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-2">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-white/60">
                {card.faction}
              </span>
              <h3 className="text-2xl font-semibold leading-tight">{card.name}</h3>
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/70">
                <span className={`rounded-full border px-3 py-1 ${rarityAccent[card.rarity ?? 'Common']}`}>
                  {rarityLabel[card.rarity ?? 'Common']}
                </span>
                <span className="rounded-full bg-white/10 px-3 py-1">{card.setCode ?? 'Set personnalisé'}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/80">
                {card.type}
              </span>
              <span className="rounded-full bg-slate-900/70 px-4 py-2 text-sm font-semibold">{card.costPA} PA</span>
            </div>
          </div>

          {card.synergyTags?.length ? (
            <div className="flex flex-wrap gap-2 text-[0.6rem] uppercase tracking-[0.3em] text-white/60">
              {card.synergyTags.map((tag) => (
                <span key={tag} className="rounded-full bg-white/10 px-2 py-1">
                  {tag}
                </span>
              ))}
            </div>
          ) : null}

          {card.flavorText ? (
            <p className="text-sm italic text-white/80">“{card.flavorText}”</p>
          ) : null}

          {card.type === 'Hero' && <CardHero card={card as HeroCard} />}
          {card.type === 'Unit' && <CardUnit card={card as UnitCard} />}
          {card.type === 'Action' && <CardAction card={card as ActionCard} />}

          {card.artist ? (
            <p className="text-right text-[0.6rem] uppercase tracking-[0.3em] text-white/50">
              Illustration&nbsp;: {card.artist}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
