import { toPng } from 'html-to-image';
import { Card } from '../types';
import { serializeCard, serializeSet } from './serialization';

async function copyTextToClipboard(text: string) {
  if (navigator?.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  let textarea: HTMLTextAreaElement | null = null;
  try {
    textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    document.execCommand('copy');
  } finally {
    if (textarea?.parentNode) {
      textarea.parentNode.removeChild(textarea);
    }
  }
}

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

export async function copyCardJSON(card: Card) {
  await copyTextToClipboard(serializeCard(card));
}

export function exportSetJSON(cards: Card[]) {
  const blob = new Blob([serializeSet(cards)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  download('noxen-set.json', url);
  URL.revokeObjectURL(url);
}

export async function copySetJSON(cards: Card[]) {
  await copyTextToClipboard(serializeSet(cards));
}
