import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import CardForm from './components/Editor/CardForm';
import CardFrame from './components/CardPreview/CardFrame';
import Gallery from './components/Gallery/Gallery';
import { Card } from './types';
import { useCardsStore } from './store/cardsStore';
import { exportSetJSON } from './utils/export';

interface StudioAppProps {
  className?: string;
}

export default function StudioApp({ className = '' }: StudioAppProps) {
  const { cards, selected, setSelectedId, upsert, duplicate, importSet } = useCardsStore();
  const [search, setSearch] = useState('');

  function newCard() {
    const id = `card-${Date.now()}`;
    const card: Card = {
      id,
      type: 'Unit',
      name: 'Nouvelle carte',
      faction: 'Verdantheart',
      costPA: 0,
      attack: 0,
      hp: 1,
    } as Card;
    upsert(card);
  }

  function exportSetHandler() {
    exportSetJSON(cards);
  }

  const filtered = cards.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const containerClass = [
    'flex flex-col min-h-[720px] rounded-3xl overflow-hidden border border-slate-800/60 bg-slate-950/60 backdrop-blur',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass}>
      <Toolbar
        onNew={newCard}
        onDuplicate={() => selected && duplicate(selected.id)}
        onImport={importSet}
        onExport={exportSetHandler}
        onSearch={setSearch}
      />
      <div className="flex flex-1 overflow-hidden divide-x divide-slate-800/60">
        <div className="w-1/2 p-6 overflow-auto bg-slate-950/40">
          {selected && <CardForm card={selected} onChange={upsert} />}
        </div>
        <div className="w-1/2 p-6 overflow-auto bg-slate-950/20">
          {selected && <CardFrame card={selected} />}
        </div>
      </div>
      <div className="border-t border-slate-800/60 bg-slate-950/60 overflow-auto">
        <Gallery
          cards={filtered}
          selectedId={selected?.id}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
}
