import React from 'react';
import { ActionCard } from '../../types';

export default function CardAction({ card }: { card: ActionCard }) {
  return (
    <div className="mt-6 rounded-2xl bg-white/10 p-4 text-sm leading-relaxed text-white/90">
      {card.effectText || 'Décrivez l’effet de votre action.'}
    </div>
  );
}
