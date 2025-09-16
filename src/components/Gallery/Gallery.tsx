import React from 'react';
import { Card } from '../../types';

interface Props {
  cards: Card[];
  selectedId?: string;
  onSelect: (id: string) => void;
}

export default function Gallery({ cards, selectedId, onSelect }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {cards.map((c) => (
        <div
          key={c.id}
          className={`border p-1 text-xs cursor-pointer ${selectedId === c.id ? 'border-blue-500' : 'border-transparent'}`}
          onClick={() => onSelect(c.id)}
        >
          <div className="font-bold truncate">{c.name}</div>
          <div>{c.type}</div>
        </div>
      ))}
    </div>
  );
}
