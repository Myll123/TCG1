import React, { useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import CardForm from './components/Editor/CardForm';
import CardFrame from './components/CardPreview/CardFrame';
import Gallery from './components/Gallery/Gallery';
import { Card } from './types';
import { useCardsStore } from './store/cardsStore';
import { exportSetJSON } from './utils/export';

export default function App() {
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

  return (
    <div className="flex flex-col h-screen">
      <Toolbar
        onNew={newCard}
        onDuplicate={() => selected && duplicate(selected.id)}
        onImport={importSet}
        onExport={exportSetHandler}
        onSearch={setSearch}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 p-4 overflow-auto">
          {selected && <CardForm card={selected} onChange={upsert} />}
        </div>
        <div className="w-1/2 p-4 overflow-auto">
          {selected && <CardFrame card={selected} />}
        </div>
      </div>
      <div className="border-t overflow-auto">
        <Gallery
          cards={filtered}
          selectedId={selected?.id}
          onSelect={setSelectedId}
        />
      </div>
    </div>
  );
}
