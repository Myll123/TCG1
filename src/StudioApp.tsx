import React, { useMemo, useState } from 'react';
import Toolbar from './components/Toolbar/Toolbar';
import CardForm from './components/Editor/CardForm';
import CardFrame from './components/CardPreview/CardFrame';
import Gallery from './components/Gallery/Gallery';
import { Card, Faction } from './types';
import { useCardsStore } from './store/cardsStore';
import { createBlankCard, cloneCard } from './utils/cardFactory';
import { copySetJSON, exportSetJSON } from './utils/export';
import { presets } from './data/presets';

interface StudioAppProps {
  className?: string;
}

export default function StudioApp({ className = '' }: StudioAppProps) {
  const { cards, selected, setSelectedId, upsert, duplicate, importSet, remove } = useCardsStore();
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<Card['type'] | 'all'>('all');
  const [factionFilter, setFactionFilter] = useState<Faction | 'all'>('all');

  function handleNew(type: Card['type']) {
    const card = createBlankCard(type);
    upsert(card);
  }

  function handlePreset(presetId: string) {
    const preset = presets.find((item) => item.id === presetId);
    if (!preset) return;
    const card = cloneCard(preset.card, { withNewId: true });
    upsert(card);
  }

  function handleCopySet() {
    copySetJSON(cards).catch((error) => {
      console.error('Impossible de copier le set', error);
    });
  }

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards.filter((card) => {
      if (typeFilter !== 'all' && card.type !== typeFilter) return false;
      if (factionFilter !== 'all' && card.faction !== factionFilter) return false;
      if (!query) return true;
      const haystack = [
        card.name,
        card.artist ?? '',
        card.setCode ?? '',
        ...(card.synergyTags ?? []),
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [cards, factionFilter, search, typeFilter]);

  const containerClass = [
    'flex flex-col min-h-[720px] rounded-3xl overflow-hidden border border-slate-800/60 bg-slate-950/60 backdrop-blur',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const filtersActive =
    search.trim().length > 0 || typeFilter !== 'all' || factionFilter !== 'all';

  return (
    <div className={containerClass}>
      <Toolbar
        onNew={handleNew}
        onDuplicate={() => selected && duplicate(selected.id)}
        onDelete={() => selected && remove(selected.id)}
        onImport={importSet}
        onExport={() => exportSetJSON(cards)}
        onCopySet={handleCopySet}
        onApplyPreset={handlePreset}
        onSearch={setSearch}
        onFilterType={setTypeFilter}
        onFilterFaction={setFactionFilter}
        availablePresets={presets}
        disableDuplicate={!selected}
        disableDelete={!selected}
        disableExport={cards.length === 0}
        searchValue={search}
        typeFilter={typeFilter}
        factionFilter={factionFilter}
      />
      <div className="flex flex-1 flex-col lg:flex-row">
        <div className="order-1 flex-1 overflow-auto bg-slate-950/45 p-6">
          {selected ? (
            <CardForm card={selected} onChange={upsert} />
          ) : (
            <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-white/10 bg-white/5 p-8 text-center text-slate-300">
              Sélectionnez ou créez une carte pour commencer la personnalisation.
            </div>
          )}
        </div>
        <div className="order-3 border-t border-slate-800/60 bg-slate-950/50 p-6 lg:order-2 lg:w-[420px] lg:border-l lg:border-t-0 overflow-auto">
          {selected ? (
            <CardFrame card={selected} />
          ) : (
            <div className="flex h-full items-center justify-center text-center text-slate-300">
              L’aperçu détaillé apparaîtra ici.
            </div>
          )}
        </div>
        <aside className="order-2 max-h-96 overflow-auto border-t border-slate-800/60 bg-slate-950/40 lg:order-3 lg:max-h-none lg:w-[320px] lg:border-l lg:border-t-0">
          <Gallery
            cards={filtered}
            selectedId={selected?.id}
            onSelect={setSelectedId}
            onClearFilters={filtersActive ? () => {
              setSearch('');
              setTypeFilter('all');
              setFactionFilter('all');
            } : undefined}
          />
        </aside>
      </div>
    </div>
  );
}
