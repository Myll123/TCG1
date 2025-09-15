# Noxen Card Studio

Application React/TypeScript permettant d'éditer, prévisualiser et exporter des cartes pour le jeu de cartes Noxen. L'interface est une SPA construite avec Vite, React, TypeScript et Tailwind.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Aperçu local du build

```bash
npm run preview
```

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## Déploiement sur GitHub Pages

1. Activer **Pages** dans les paramètres du dépôt en choisissant "GitHub Actions" comme source.
2. Les push sur `main` déclenchent le workflow [pages.yml](.github/workflows/pages.yml) qui construit l'application et la déploie sur Pages.
3. L'URL du site sera de la forme `https://<utilisateur>.github.io/noxen-card-studio/`.

## Structure
- `src/types.ts` : définitions des types des cartes.
- `src/utils/validation.ts` : fonctions de validation et couleurs par faction.
- `src/utils/serialization.ts` : helpers de sérialisation JSON.
- `src/data/seed.ts` : exemples de cartes.
- `tests/` : tests unitaires avec Vitest.

Un fichier `404.html` est présent pour assurer le routage côté client lorsque l'application est servie via GitHub Pages.
