import React, { useRef } from 'react';

interface Props {
  onNew: () => void;
  onDuplicate: () => void;
  onImport: (json: string) => void;
  onExport: () => void;
  onSearch: (text: string) => void;
}

export default function Toolbar({ onNew, onDuplicate, onImport, onExport, onSearch }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then(onImport);
    e.target.value = '';
  }

  const baseButton =
    'rounded-full border border-slate-600/60 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:border-slate-400/60 hover:bg-slate-800/60 focus:outline-none focus:ring-2 focus:ring-sky-500/60';

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-slate-800/60 bg-slate-950/80 px-6 py-4 text-slate-100">
      <button
        className={`${baseButton} bg-gradient-to-r from-sky-500 to-indigo-500 text-white hover:from-sky-400 hover:to-indigo-500`}
        onClick={onNew}
      >
        Nouveau
      </button>
      <button className={baseButton} onClick={onDuplicate}>
        Dupliquer
      </button>
      <button className={baseButton} onClick={() => fileRef.current?.click()}>
        Importer JSON
      </button>
      <input type="file" accept="application/json" ref={fileRef} className="hidden" onChange={handleFile} />
      <button className={baseButton} onClick={onExport}>
        Exporter Set
      </button>
      <div className="ml-auto flex items-center gap-2">
        <label className="text-xs uppercase tracking-[0.3em] text-slate-400" htmlFor="card-search">
          Rechercher
        </label>
        <input
          id="card-search"
          type="text"
          placeholder="Nom de la carte"
          className="w-48 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/60"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
