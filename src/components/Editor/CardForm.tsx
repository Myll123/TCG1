import React from 'react';
import { Card, Faction } from '../../types';
import { autoColorByFaction } from '../../utils/validation';

interface Props {
  card: Card;
  onChange: (card: Card) => void;
}

export default function CardForm({ card, onChange }: Props) {
  function update<K extends keyof Card>(key: K, value: Card[K]) {
    onChange({ ...card, [key]: value });
  }

  const handleFaction = (f: Faction) => {
    update('faction', f);
    update('colorHex', autoColorByFaction(f));
  };

  return (
    <form className="space-y-2">
      <div>
        <label className="block text-sm">Nom</label>
        <input
          className="w-full border px-2 py-1"
          value={card.name}
          onChange={(e) => update('name', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm">Type</label>
        <select
          className="w-full border px-2 py-1"
          value={card.type}
          onChange={(e) => update('type', e.target.value as Card['type'])}
        >
          <option value="Hero">Héro</option>
          <option value="Unit">Unité</option>
          <option value="Action">Action</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Faction</label>
        <select
          className="w-full border px-2 py-1"
          value={card.faction}
          onChange={(e) => handleFaction(e.target.value as Faction)}
        >
          <option value="Verdantheart">Verdantheart</option>
          <option value="Ethersight">Ethersight</option>
          <option value="Bloodfury">Bloodfury</option>
        </select>
      </div>
      <div>
        <label className="block text-sm">Coût PA</label>
        <input
          type="number"
          className="w-full border px-2 py-1"
          value={card.costPA}
          onChange={(e) => update('costPA', Number(e.target.value))}
        />
      </div>

      {card.type === 'Hero' && (
        <div className="space-y-2">
          <div>
            <label className="block text-sm">ATQ</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={(card as any).attack || 0}
              onChange={(e) => update('attack' as any, Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm">Deck HP</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={(card as any).deckHP || 25}
              onChange={(e) => update('deckHP' as any, Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {card.type === 'Unit' && (
        <div className="space-y-2">
          <div>
            <label className="block text-sm">ATQ</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={(card as any).attack || 0}
              onChange={(e) => update('attack' as any, Number(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm">HP</label>
            <input
              type="number"
              className="w-full border px-2 py-1"
              value={(card as any).hp || 1}
              onChange={(e) => update('hp' as any, Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {card.type === 'Action' && (
        <div>
          <label className="block text-sm">Effet</label>
          <textarea
            className="w-full border px-2 py-1"
            value={(card as any).effectText || ''}
            onChange={(e) => update('effectText' as any, e.target.value)}
          />
        </div>
      )}
    </form>
  );
}
