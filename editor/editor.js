const DEFAULTS = {
  name: "Gardien de l'Aube",
  subtitle: 'Sentinelle solaire',
  set: 'Édition Alpha',
  description: 'Incarnez un protecteur ancestral et libérez des combos lumineux qui renversent le cours de la partie.',
  ability: 'Déclenche un halo protecteur qui restaure 150 PV aux alliés et double la défense du Gardien pendant un tour.',
  rarity: 'legendary',
  element: 'lumiere',
  attack: 320,
  defense: 280,
  health: 460,
};

const ELEMENT_THEMES = {
  arcane: {
    label: 'Arcane',
    accent: '#a855f7',
    soft: 'rgba(168, 85, 247, 0.32)',
    glow:
      'radial-gradient(circle at 25% 20%, rgba(168, 85, 247, 0.55), transparent 62%), radial-gradient(circle at 80% 30%, rgba(56, 189, 248, 0.45), transparent 65%)',
  },
  feu: {
    label: 'Flamme',
    accent: '#f97316',
    soft: 'rgba(249, 115, 22, 0.35)',
    glow:
      'radial-gradient(circle at 20% 25%, rgba(251, 146, 60, 0.55), transparent 60%), radial-gradient(circle at 80% 30%, rgba(249, 115, 22, 0.45), transparent 68%)',
  },
  glace: {
    label: 'Givre',
    accent: '#38bdf8',
    soft: 'rgba(56, 189, 248, 0.32)',
    glow:
      'radial-gradient(circle at 20% 20%, rgba(56, 189, 248, 0.55), transparent 60%), radial-gradient(circle at 78% 38%, rgba(14, 165, 233, 0.45), transparent 68%)',
  },
  nature: {
    label: 'Nature',
    accent: '#22c55e',
    soft: 'rgba(34, 197, 94, 0.32)',
    glow:
      'radial-gradient(circle at 22% 22%, rgba(34, 197, 94, 0.5), transparent 58%), radial-gradient(circle at 80% 35%, rgba(132, 204, 22, 0.45), transparent 68%)',
  },
  ombre: {
    label: 'Ombre',
    accent: '#6366f1',
    soft: 'rgba(99, 102, 241, 0.32)',
    glow:
      'radial-gradient(circle at 24% 26%, rgba(99, 102, 241, 0.48), transparent 60%), radial-gradient(circle at 78% 32%, rgba(15, 23, 42, 0.65), transparent 72%)',
  },
  lumiere: {
    label: 'Lumière',
    accent: '#facc15',
    soft: 'rgba(250, 204, 21, 0.3)',
    glow:
      'radial-gradient(circle at 22% 22%, rgba(250, 204, 21, 0.55), transparent 60%), radial-gradient(circle at 78% 32%, rgba(244, 226, 159, 0.5), transparent 72%)',
  },
};

const RARITIES = {
  common: {
    label: 'Commune',
    color: '#cbd5f5',
    soft: 'rgba(148, 163, 184, 0.18)',
    border: 'rgba(148, 163, 184, 0.4)',
  },
  rare: {
    label: 'Rare',
    color: '#38bdf8',
    soft: 'rgba(56, 189, 248, 0.18)',
    border: 'rgba(56, 189, 248, 0.4)',
  },
  epic: {
    label: 'Épique',
    color: '#a855f7',
    soft: 'rgba(168, 85, 247, 0.2)',
    border: 'rgba(168, 85, 247, 0.45)',
  },
  legendary: {
    label: 'Légendaire',
    color: '#facc15',
    soft: 'rgba(250, 204, 21, 0.22)',
    border: 'rgba(250, 204, 21, 0.4)',
  },
};

const PRESETS = {
  celestial: {
    name: "Gardien de l'Aube",
    subtitle: 'Sentinelle solaire',
    set: 'Édition Lumen',
    description: 'Une sentinelle éternelle qui absorbe les ténèbres et renvoie la lumière purifiée sur le champ de bataille.',
    ability:
      'Déploie un rempart radiant : réduit de 50% les dégâts subis par vos alliés et restaure 200 PV à la fin du tour.',
    rarity: 'legendary',
    element: 'lumiere',
    attack: 280,
    defense: 340,
    health: 540,
    image: '',
  },
  pyromancer: {
    name: 'Oracle des braises',
    subtitle: 'Mage incandescent',
    set: 'Cycle des Cendres',
    description: 'Un pyromancien visionnaire qui manipule les flammes du futur pour déclencher des combos incendiaires.',
    ability:
      "Enchaîne Brasier prophétique : inflige 420 dégâts, puis ajoute un marqueur 'Braised' augmentant vos dégâts de 25%.",
    rarity: 'epic',
    element: 'feu',
    attack: 410,
    defense: 190,
    health: 360,
    image: '',
  },
  wildheart: {
    name: 'Chuchoteur sylvestre',
    subtitle: 'Druide des clairières',
    set: 'Cercle de Verdoie',
    description: 'Gardien des forêts anciennes qui transforme la vitalité de la nature en boucliers druidiques.',
    ability:
      'Racines rajeunissantes : rend 220 PV à un allié et augmente sa défense de 35% jusqu’à la fin du prochain tour.',
    rarity: 'rare',
    element: 'nature',
    attack: 260,
    defense: 310,
    health: 520,
    image: '',
  },
};

const STAT_MAX = {
  attack: 600,
  defense: 600,
  health: 1000,
};

const DEFAULT_CARD_DATA = {
  name: DEFAULTS.name,
  subtitle: DEFAULTS.subtitle,
  set: DEFAULTS.set,
  description: DEFAULTS.description,
  ability: DEFAULTS.ability,
  rarity: DEFAULTS.rarity,
  element: DEFAULTS.element,
  attack: DEFAULTS.attack,
  defense: DEFAULTS.defense,
  health: DEFAULTS.health,
  image: '',
};

const fieldIds = ['name', 'subtitle', 'set', 'description', 'ability', 'image', 'attack', 'defense', 'health', 'rarity', 'element'];
const numericFields = new Set(['attack', 'defense', 'health']);

const previewCard = document.getElementById('preview-card');
const previewName = document.getElementById('preview-name');
const previewSubtitle = document.getElementById('preview-subtitle');
const previewDesc = document.getElementById('preview-desc');
const previewAbility = document.getElementById('preview-ability');
const previewAbilityBlock = document.getElementById('preview-ability-block');
const previewImage = document.getElementById('preview-image');
const previewPlaceholder = document.querySelector('.preview-card__placeholder');
const previewRarity = document.getElementById('preview-rarity');
const previewElement = document.getElementById('preview-element');
const previewSet = document.getElementById('preview-set');
const feedbackEl = document.getElementById('formFeedback');
const dropzone = document.getElementById('importDropzone');
const copyButton = document.getElementById('copyButton');
const resetButton = document.getElementById('resetButton');

const STORAGE_KEY = 'tcg-card-studio:last-card';
const supportsStorage = (() => {
  try {
    return typeof window !== 'undefined' && 'localStorage' in window && window.localStorage != null;
  } catch (error) {
    return false;
  }
})();

let feedbackTimer;
let saveTimer;

function setTextContent(element, text, isPlaceholder = false) {
  if (!element) {
    return;
  }
  element.textContent = text;
  element.classList.toggle('is-placeholder', Boolean(isPlaceholder));
}

function readText(id, fallback = '') {
  const input = document.getElementById(id);
  if (!input) {
    return { value: '', final: fallback, isFallback: true };
  }
  const raw = (input.value ?? '').toString().trim();
  return {
    value: raw,
    final: raw || fallback,
    isFallback: raw.length === 0,
  };
}

function readNumber(id, fallback = 0) {
  const input = document.getElementById(id);
  if (!input) {
    return fallback;
  }
  const raw = input.value;
  if (raw === '') {
    return 0;
  }
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function applyElementTheme(elementValue) {
  const theme = ELEMENT_THEMES[elementValue] || ELEMENT_THEMES[DEFAULTS.element];
  if (previewElement) {
    setTextContent(previewElement, theme.label);
  }
  if (previewCard) {
    previewCard.style.setProperty('--accent', theme.accent);
    previewCard.style.setProperty('--accent-soft', theme.soft);
    previewCard.style.setProperty('--glow-gradient', theme.glow);
    previewCard.dataset.element = elementValue;
  }
}

function applyRarityTheme(rarityValue) {
  const rarity = RARITIES[rarityValue] || RARITIES[DEFAULTS.rarity];
  if (previewRarity) {
    setTextContent(previewRarity, rarity.label);
  }
  if (previewCard) {
    previewCard.style.setProperty('--rarity-color', rarity.color);
    previewCard.style.setProperty('--rarity-soft', rarity.soft);
    previewCard.style.setProperty('--rarity-border', rarity.border);
    previewCard.dataset.rarity = rarityValue;
  }
}

function updateMeter(key, value) {
  const meter = document.querySelector(`.stat-meter[data-meter="${key}"]`);
  if (!meter) {
    return;
  }
  const finalValue = Number.isFinite(value) ? value : 0;
  const max = STAT_MAX[key] || 100;
  const percent = Math.max(0, Math.min(100, Math.round((finalValue / max) * 100)));
  const fill = meter.querySelector('.stat-meter__fill');
  const valueEl = meter.querySelector('.stat-meter__value');
  if (valueEl) {
    valueEl.textContent = finalValue;
  }
  if (fill) {
    fill.style.width = `${percent}%`;
  }
  meter.setAttribute('aria-valuenow', String(finalValue));
  meter.setAttribute('aria-valuemax', String(max));
  meter.setAttribute('aria-valuemin', '0');
}

function updateImage(name, subtitle) {
  if (!previewImage) {
    return;
  }
  const imageInput = document.getElementById('image');
  const imageValue = (imageInput?.value ?? '').trim();
  if (imageValue) {
    previewImage.src = imageValue;
    previewImage.alt = subtitle ? `${name} — ${subtitle}` : name;
    previewImage.style.display = 'block';
    previewPlaceholder?.classList.add('is-hidden');
  } else {
    previewImage.removeAttribute('src');
    previewImage.removeAttribute('alt');
    previewImage.style.display = 'none';
    previewPlaceholder?.classList.remove('is-hidden');
  }
}

function update() {

  const nameInfo = readText('name', DEFAULTS.name);
  const subtitleInfo = readText('subtitle', DEFAULTS.subtitle);
  const setInfo = readText('set', DEFAULTS.set);
  const descriptionInfo = readText('description', DEFAULTS.description);
  const abilityInfo = readText('ability', '');
  const rarityValue = document.getElementById('rarity')?.value || DEFAULTS.rarity;
  const elementValue = document.getElementById('element')?.value || DEFAULTS.element;
  const attackValue = readNumber('attack', DEFAULTS.attack);
  const defenseValue = readNumber('defense', DEFAULTS.defense);
  const healthValue = readNumber('health', DEFAULTS.health);

  setTextContent(previewName, nameInfo.final, nameInfo.isFallback);
  setTextContent(previewSubtitle, subtitleInfo.final, subtitleInfo.isFallback);
  setTextContent(previewDesc, descriptionInfo.final, descriptionInfo.isFallback);
  setTextContent(previewSet, setInfo.final, false);

  if (abilityInfo.value) {
    previewAbilityBlock?.removeAttribute('hidden');
    setTextContent(previewAbility, abilityInfo.final);
  } else {
    previewAbilityBlock?.setAttribute('hidden', 'hidden');
  }

  applyRarityTheme(rarityValue in RARITIES ? rarityValue : DEFAULTS.rarity);
  applyElementTheme(elementValue in ELEMENT_THEMES ? elementValue : DEFAULTS.element);

  updateMeter('attack', attackValue);
  updateMeter('defense', defenseValue);
  updateMeter('health', healthValue);

  updateImage(nameInfo.final, subtitleInfo.value);
}

function getFormData() {
  const data = {};
  fieldIds.forEach((id) => {
    const input = document.getElementById(id);
    if (!input) {
      return;
    }
    if (numericFields.has(id)) {
      const raw = input.value;
      const parsed = raw === '' ? 0 : Number.parseInt(raw, 10);
      data[id] = Number.isFinite(parsed) ? parsed : 0;
    } else {
      data[id] = (input.value ?? '').toString();
    }
  });
  return data;
}

function applyData(data) {
  if (!data || typeof data !== 'object') {
    return;
  }
  fieldIds.forEach((id) => {
    const input = document.getElementById(id);
    if (!input) {
      return;
    }
    const value = data[id];
    if (numericFields.has(id)) {
      if (typeof value === 'number' && Number.isFinite(value)) {
        input.value = String(value);
      } else if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number.parseInt(value, 10);
        input.value = Number.isFinite(parsed) ? String(parsed) : '';
      } else {
        input.value = '';
      }
    } else if (id === 'rarity') {
      input.value = value in RARITIES ? value : DEFAULTS.rarity;
    } else if (id === 'element') {
      input.value = value in ELEMENT_THEMES ? value : DEFAULTS.element;
    } else if (typeof value === 'string') {
      input.value = value;
    } else if (value == null) {
      input.value = '';
    } else {
      input.value = String(value);
    }
  });
  update();
}

function saveDraftNow(data = getFormData()) {
  if (!supportsStorage) {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // Ignore quota errors silently

  }
}

function scheduleDraftSave() {
  if (!supportsStorage) {
    return;
  }
  clearTimeout(saveTimer);
  saveTimer = window.setTimeout(() => {
    saveDraftNow();
  }, 350);
}

function loadDraft() {
  if (!supportsStorage) {
    return false;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return false;
    }
    const data = JSON.parse(raw);
    applyData(data);
    return true;
  } catch (error) {
    return false;
  }
}

function showFeedback(message, variant = 'info') {
  if (!feedbackEl) {
    return;
  }
  feedbackEl.textContent = message;
  if (variant === 'success' || variant === 'error') {
    feedbackEl.dataset.variant = variant;
  } else {
    delete feedbackEl.dataset.variant;
  }
  clearTimeout(feedbackTimer);
  feedbackTimer = window.setTimeout(() => {
    feedbackEl.textContent = '';
    delete feedbackEl.dataset.variant;
  }, 5000);
}

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '') || 'ma-carte';
}

function handleExport() {
  try {
    const data = getFormData();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const filename = `tcg-card-${slugify(data.name || DEFAULTS.name)}.json`;

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    showFeedback('Carte exportée au format JSON.', 'success');
  } catch (error) {
    showFeedback("Une erreur est survenue lors de l'export.", 'error');
  }
}

function isJsonFile(file) {
  if (!file) {
    return false;
  }
  const type = (file.type || '').toLowerCase();
  if (type.includes('json')) {
    return true;
  }
  const name = (file.name || '').toLowerCase();
  return name.endsWith('.json');
}

function handleImport(file) {
  if (!file) {
    return;
  }
  if (!isJsonFile(file)) {
    showFeedback('Veuillez sélectionner un fichier JSON valide.', 'error');
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const raw = typeof reader.result === 'string' ? reader.result : '';
      if (!raw) {
        throw new Error('Empty file');
      }
      const data = JSON.parse(raw);
      applyData(data);
      saveDraftNow(getFormData());
      showFeedback('Carte importée avec succès.', 'success');
    } catch (error) {
      showFeedback('Le fichier sélectionné est invalide.', 'error');
    }
  };
  reader.onerror = () => {
    showFeedback('Impossible de lire le fichier importé.', 'error');
  };
  reader.readAsText(file);
}

async function copyCardToClipboard() {
  const json = JSON.stringify(getFormData(), null, 2);
  try {
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(json);
    } else {
      let textarea;
      try {
        textarea = document.createElement('textarea');
        textarea.value = json;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'absolute';
        textarea.style.left = '-9999px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand('copy');
        if (!successful) {
          throw new Error('Copy command failed');
        }
      } finally {
        if (textarea && textarea.parentNode) {
          textarea.parentNode.removeChild(textarea);
        }
      }
    }
    showFeedback('JSON copié dans le presse-papiers.', 'success');
  } catch (error) {
    showFeedback("Impossible de copier le JSON.", 'error');
  }
}

function resetForm() {
  const defaults = { ...DEFAULT_CARD_DATA };
  applyData(defaults);
  saveDraftNow(defaults);
  showFeedback('Carte réinitialisée sur le modèle de base.');
}

function toggleDropzoneState(isActive) {
  if (!dropzone) {
    return;
  }
  dropzone.classList.toggle('is-active', Boolean(isActive));
}

function preventDragDefaults(event) {
  event.preventDefault();
  event.stopPropagation();
}

const exportButton = document.getElementById('exportButton');
const importButton = document.getElementById('importButton');
const importInput = document.getElementById('importInput');

exportButton?.addEventListener('click', handleExport);
importButton?.addEventListener('click', () => importInput?.click());
copyButton?.addEventListener('click', copyCardToClipboard);
resetButton?.addEventListener('click', resetForm);
importInput?.addEventListener('change', (event) => {
  const target = event.target;
  const file = target?.files?.[0];
  if (file) {
    handleImport(file);
  }
  if (target) {
    target.value = '';
  }
  toggleDropzoneState(false);
});

dropzone?.addEventListener('click', () => importInput?.click());
dropzone?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    importInput?.click();
  }
});

['dragenter', 'dragover'].forEach((eventName) => {
  dropzone?.addEventListener(eventName, (event) => {
    preventDragDefaults(event);
    toggleDropzoneState(true);
  });
});

['dragleave', 'dragend'].forEach((eventName) => {
  dropzone?.addEventListener(eventName, (event) => {
    preventDragDefaults(event);
    toggleDropzoneState(false);
  });
});

dropzone?.addEventListener('drop', (event) => {
  preventDragDefaults(event);
  toggleDropzoneState(false);
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    handleImport(file);
  }
});

if (typeof window !== 'undefined') {
  ['dragover', 'drop'].forEach((eventName) => {
    window.addEventListener(eventName, (event) => {
      const hasFiles = event.dataTransfer?.types?.includes('Files');
      if (!hasFiles) {
        return;
      }
      if (dropzone && (event.target === dropzone || dropzone.contains(event.target))) {
        return;
      }
      event.preventDefault();
    });
  });
}

fieldIds.forEach((id) => {
  const input = document.getElementById(id);
  if (!input) {
    return;
  }
  const handler = () => {
    update();
    scheduleDraftSave();
  };
  if (input.tagName === 'SELECT') {
    input.addEventListener('change', handler);
  } else {
    input.addEventListener('input', handler);
  }
});

document.querySelectorAll('[data-preset]').forEach((button) => {
  button.addEventListener('click', () => {
    const presetKey = button.getAttribute('data-preset');
    if (!presetKey || !(presetKey in PRESETS)) {
      return;
    }
    const preset = { ...PRESETS[presetKey] };
    applyData(preset);
    saveDraftNow(getFormData());
    showFeedback('Archétype appliqué !', 'success');
  });
});

const draftLoaded = loadDraft();
if (draftLoaded) {
  showFeedback('Brouillon rechargé automatiquement.', 'success');
} else {
  update();
  saveDraftNow();
}
