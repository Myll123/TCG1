# Noxen Card Studio

Application React/TypeScript permettant d'éditer et prévisualiser des cartes pour le jeu de cartes Noxen. Ce dépôt contient la base du projet ainsi que quelques utilitaires et données d'exemple.

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Tests

```bash
npm test
```

## Structure
- `src/types.ts` : définitions des types des cartes.
- `src/utils/validation.ts` : fonctions de validation et couleurs par faction.
- `src/utils/serialization.ts` : helpers de sérialisation JSON.
- `src/data/seed.ts` : exemple de cartes.
- `tests/` : tests unitaires avec Vitest.

> **Remarque** : l'interface complète décrite dans le cahier des charges n'est pas encore implémentée.
