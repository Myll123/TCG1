import React from 'react';
import { Card, Faction } from '../../types';
import { autoColorByFaction } from '../../utils/validation';

interface Props {
  card: Card;
  onChange: (card: Card) => void;
}

const inputClasses =
  'w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70';

export default function CardForm({ card, onChange }: Props) {
  function update<K extends keyof Card>(key: K, value: Card[K]) {
    onChange({ ...card, [key]: value });
  }

  const handleFaction = (f: Faction) => {
    update('faction', f);
    update('colorHex', autoColorByFaction(f));
  };

  return (
    <form className="space-y-5 text-slate-200">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="name">
            Nom
          </label>
          <input
            id="name"
            className={inputClasses}
            value={card.name}
            onChange={(e) => update('name', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            className={inputClasses}
            value={card.type}
            onChange={(e) => update('type', e.target.value as Card['type'])}
          >
            <option value="Hero">Héro</option>
            <option value="Unit">Unité</option>
            <option value="Action">Action</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="faction">
            Faction
          </label>
          <select
            id="faction"
            className={inputClasses}
            value={card.faction}
            onChange={(e) => handleFaction(e.target.value as Faction)}
          >
            <option value="Verdantheart">Verdantheart</option>
            <option value="Ethersight">Ethersight</option>
            <option value="Bloodfury">Bloodfury</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="costPA">
            Coût PA
          </label>
          <input
            id="costPA"
            type="number"
            className={inputClasses}
            value={card.costPA}
            onChange={(e) => update('costPA', Number(e.target.value))}
          />
        </div>
      </div>

      {card.type === 'Hero' && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="hero-attack">
              ATQ
            </label>
            <input
              id="hero-attack"
              type="number"
              className={inputClasses}
              value={card.attack}
              onChange={(e) => update('attack', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="hero-hp">
              Deck HP
            </label>
            <input
              id="hero-hp"
              type="number"
              className={inputClasses}
              value={card.deckHP}
              onChange={(e) => update('deckHP', Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {card.type === 'Unit' && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="unit-attack">
              ATQ
            </label>
            <input
              id="unit-attack"
              type="number"
              className={inputClasses}
              value={card.attack}
              onChange={(e) => update('attack', Number(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="unit-hp">
              HP
            </label>
            <input
              id="unit-hp"
              type="number"
              className={inputClasses}
              value={card.hp}
              onChange={(e) => update('hp', Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {card.type === 'Action' && (
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400" htmlFor="action-effect">
            Effet
          </label>
          <textarea
            id="action-effect"
            className={`${inputClasses} min-h-[160px] resize-none`}
            value={card.effectText}
            onChange={(e) => update('effectText', e.target.value)}
          />
        </div>
      )}
    </form>
  );
}
