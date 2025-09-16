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

  return (
    <div className="flex items-center gap-2 bg-gray-800 text-white p-2">
      <button className="px-2 py-1 bg-gray-700 rounded" onClick={onNew}>Nouveau</button>
      <button className="px-2 py-1 bg-gray-700 rounded" onClick={onDuplicate}>Dupliquer</button>
      <button className="px-2 py-1 bg-gray-700 rounded" onClick={() => fileRef.current?.click()}>Importer JSON</button>
      <input type="file" accept="application/json" ref={fileRef} className="hidden" onChange={handleFile} />
      <button className="px-2 py-1 bg-gray-700 rounded" onClick={onExport}>Exporter Set</button>
      <input
        type="text"
        placeholder="Rechercher"
        className="ml-auto px-2 py-1 text-black rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
}
