import React from 'react';
import { Keyword } from '../../types';

const icons: Record<Keyword, JSX.Element> = {
  Stealth: <svg width="10" height="10"><circle cx="5" cy="5" r="4" fill="currentColor" /></svg>,
  Ranged: <svg width="10" height="10"><rect x="1" y="4" width="8" height="2" fill="currentColor" /></svg>,
  Healer: <svg width="10" height="10"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="2"/></svg>,
  Flash: <svg width="10" height="10"><polygon points="5,1 9,9 1,9" fill="currentColor" /></svg>,
  Protector: <svg width="10" height="10"><path d="M5 1l4 2v3c0 2-2 3-4 4-2-1-4-2-4-4V3z" fill="currentColor"/></svg>,
  Hexproof: <svg width="10" height="10"><polygon points="5,1 9,3 9,7 5,9 1,7 1,3" fill="currentColor"/></svg>
};

export default function KeywordBadge({ keyword }: { keyword: Keyword }) {
  return (
    <span className="inline-flex items-center gap-1 px-1 border rounded text-xs">
      {icons[keyword]}
      {keyword}
    </span>
  );
}
