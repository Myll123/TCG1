import React, { useRef, useState } from 'react';
import { Card, Faction } from '../../types';

interface Props {
  onNew: (type: Card['type']) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onImport: (json: string) => void;
  onExport: () => void;
  onCopySet: () => void;
  onApplyPreset: (presetId: string) => void;
  onSearch: (text: string) => void;
  onFilterType: (value: Card['type'] | 'all') => void;
  onFilterFaction: (value: Faction | 'all') => void;
  availablePresets: Array<{ id: string; name: string; tagline: string; type: Card['type'] }>;
  disableDuplicate?: boolean;
  disableDelete?: boolean;
  disableExport?: boolean;
  searchValue: string;
  typeFilter: Card['type'] | 'all';
  factionFilter: Faction | 'all';
}

const creationOptions: Array<{ label: string; value: Card['type'] }> = [
  { label: 'Héros', value: 'Hero' },
  { label: 'Unité', value: 'Unit' },
  { label: 'Action', value: 'Action' },
];

const typeFilters: Array<{ label: string; value: Card['type'] | 'all' }> = [
  { label: 'Toutes les cartes', value: 'all' },
  { label: 'Héros', value: 'Hero' },
  { label: 'Unités', value: 'Unit' },
  { label: 'Actions', value: 'Action' },
];

const factionFilters: Array<{ label: string; value: Faction | 'all' }> = [
  { label: 'Toutes factions', value: 'all' },
  { label: 'Verdantheart', value: 'Verdantheart' },
  { label: 'Ethersight', value: 'Ethersight' },
  { label: 'Bloodfury', value: 'Bloodfury' },
];

export default function Toolbar({
  onNew,
  onDuplicate,
  onDelete,
  onImport,
  onExport,
  onCopySet,
  onApplyPreset,
  onSearch,
  onFilterType,
  onFilterFaction,
  availablePresets,
  disableDuplicate,
  disableDelete,
  disableExport,
  searchValue,
  typeFilter,
  factionFilter,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [presetValue, setPresetValue] = useState('');

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(onImport).catch(console.error);
    e.target.value = '';
  }

  function handlePresetChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const id = e.target.value;
    if (!id) return;
    onApplyPreset(id);
    setPresetValue('');
  }

  const buttonBase =
    'rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-sm font-semibold text-slate-100 transition focus:outline-none focus:ring-2 focus:ring-sky-500/60 disabled:cursor-not-allowed disabled:opacity-50 hover:border-slate-400/60 hover:bg-slate-800/60';

  const pillBase =
    'rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] transition focus:outline-none focus:ring-2 focus:ring-sky-500/60';

  return (
    <div className="flex flex-col gap-4 border-b border-slate-800/60 bg-slate-950/80 px-6 py-5 text-slate-100">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">Créer</span>
        <div className="flex overflow-hidden rounded-full border border-slate-700/60 bg-slate-900/70">
          {creationOptions.map((option) => (
            <button
              key={option.value}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-slate-200 transition hover:bg-slate-800/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
              onClick={() => onNew(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
        <button className={buttonBase} onClick={onDuplicate} disabled={disableDuplicate} type="button">
          Dupliquer
        </button>
        <button className={buttonBase} onClick={onDelete} disabled={disableDelete} type="button">
          Supprimer
        </button>
        <button className={buttonBase} onClick={() => fileRef.current?.click()} type="button">
          Importer JSON
        </button>
        <input type="file" accept="application/json" ref={fileRef} className="hidden" onChange={handleFile} />
        <button className={buttonBase} onClick={onExport} disabled={disableExport} type="button">
          Exporter le set
        </button>
        <button className={buttonBase} onClick={onCopySet} disabled={disableExport} type="button">
          Copier le set
        </button>
        <label className="ml-auto hidden text-[0.65rem] uppercase tracking-[0.3em] text-slate-400 lg:block" htmlFor="preset-select">
          Archétypes
        </label>
        <select
          id="preset-select"
          value={presetValue}
          onChange={handlePresetChange}
          className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 transition hover:border-slate-500/60 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
        >
          <option value="">Charger un archétype…</option>
          {availablePresets.map((preset) => (
            <option key={preset.id} value={preset.id}>{`${preset.name} — ${preset.tagline}`}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-400" htmlFor="card-search">
          Rechercher
        </label>
        <input
          id="card-search"
          type="text"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Nom, artiste, étiquette…"
          className="w-full max-w-xs rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
        />

        <div className="flex flex-wrap items-center gap-2">
          {typeFilters.map((filter) => {
            const active = typeFilter === filter.value;
            return (
              <button
                key={filter.value}
                className={`${pillBase} ${
                  active
                    ? 'border border-sky-500/70 bg-sky-500/15 text-sky-200 shadow-[0_0_0_1px_rgba(56,189,248,0.35)]'
                    : 'border border-transparent bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
                onClick={() => onFilterType(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {factionFilters.map((filter) => {
            const active = factionFilter === filter.value;
            return (
              <button
                key={filter.value}
                className={`${pillBase} ${
                  active
                    ? 'border border-emerald-400/70 bg-emerald-400/10 text-emerald-200 shadow-[0_0_0_1px_rgba(52,211,153,0.35)]'
                    : 'border border-transparent bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
                onClick={() => onFilterFaction(filter.value)}
                type="button"
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
