import React from 'react';
import { UnitCard } from '../../types';

export default function CardUnit({ card }: { card: UnitCard }) {
  return (
    <div className="mt-4 flex justify-between">
      <span>ATQ {card.attack}</span>
      <span>HP {card.hp}</span>
    </div>
  );
}
