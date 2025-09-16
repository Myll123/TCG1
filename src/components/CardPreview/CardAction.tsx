import React from 'react';
import { ActionCard } from '../../types';

export default function CardAction({ card }: { card: ActionCard }) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-white/90">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
        {card.effectText || 'Décrivez l’effet de votre action.'}
      </div>
      {card.flavorText ? (
        <blockquote className="rounded-3xl border border-white/5 bg-white/10 px-4 py-3 text-xs italic text-white/70">
          “{card.flavorText}”
        </blockquote>
      ) : null}
    </div>
  );
}
