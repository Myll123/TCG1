// Ajuste la taille de police d'un élément pour que son contenu tienne dans son parent.
export function fitText(element: HTMLElement, max = 16, min = 8) {
  let size = max;
  const parent = element.parentElement;
  if (!parent) return;
  element.style.fontSize = size + 'px';
  while (size > min && element.scrollHeight > parent.clientHeight) {
    size -= 1;
    element.style.fontSize = size + 'px';
  }
}
