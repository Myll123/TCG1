import React, { useRef } from 'react';
import { Card, HeroCard, UnitCard, ActionCard } from '../../types';
import CardHero from './CardHero';
import CardUnit from './CardUnit';
import CardAction from './CardAction';
import { autoColorByFaction } from '../../utils/validation';
import { exportCardPNG, exportCardJSON } from '../../utils/export';

export default function CardFrame({ card }: { card: Card }) {
  const ref = useRef<HTMLDivElement>(null);
  const color = card.colorHex || autoColorByFaction(card.faction);

  return (
    <div>
      <div className="mb-2 flex gap-2">
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => ref.current && exportCardPNG(ref.current, 1)}
        >
          PNG x1
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => ref.current && exportCardPNG(ref.current, 2)}
        >
          PNG x2
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => ref.current && exportCardPNG(ref.current, 4)}
        >
          PNG x4
        </button>
        <button
          className="px-2 py-1 bg-gray-200 rounded"
          onClick={() => exportCardJSON(card)}
        >
          Exporter JSON
        </button>
      </div>
      <div
        ref={ref}
        className="w-72 rounded-lg p-4 text-white"
        style={{ backgroundColor: color }}
      >
        <div className="flex justify-between font-bold">
          <span>{card.name}</span>
          <span>{card.costPA} PA</span>
        </div>
        <div className="text-sm italic">{card.type} — {card.faction}</div>
        {card.type === 'Hero' && <CardHero card={card as HeroCard} />}
        {card.type === 'Unit' && <CardUnit card={card as UnitCard} />}
        {card.type === 'Action' && <CardAction card={card as ActionCard} />}
      </div>
    </div>
  );
}
