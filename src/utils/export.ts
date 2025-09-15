import { toPng } from 'html-to-image';
import { Card } from '../types';
import { serializeCard, serializeSet } from './serialization';

function download(name: string, dataUrl: string) {
  const link = document.createElement('a');
  link.download = name;
  link.href = dataUrl;
  link.click();
}

export async function exportCardPNG(node: HTMLElement, scale: number) {
  const dataUrl = await toPng(node, { pixelRatio: scale, cacheBust: true });
  download(`card-${scale}x.png`, dataUrl);
}

export function exportCardJSON(card: Card) {
  const blob = new Blob([serializeCard(card)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  download(`${card.id}.json`, url);
  URL.revokeObjectURL(url);
}

export function exportSetJSON(cards: Card[]) {
  const blob = new Blob([serializeSet(cards)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  download('noxen-set.json', url);
  URL.revokeObjectURL(url);
}
