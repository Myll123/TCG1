import React from 'react';
import { ActionCard } from '../../types';

export default function CardAction({ card }: { card: ActionCard }) {
  return <div className="mt-4 whitespace-pre-wrap text-sm">{card.effectText}</div>;
}
