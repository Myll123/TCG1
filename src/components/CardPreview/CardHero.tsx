import React from 'react';
import { HeroCard } from '../../types';

export default function CardHero({ card }: { card: HeroCard }) {
  return (
    <div className="mt-4 flex justify-between">
      <span>ATQ {card.attack}</span>
      <span>Deck HP {card.deckHP}</span>
    </div>
  );
}
