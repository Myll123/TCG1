import React, { useEffect, useRef } from 'react';
import StudioApp from './StudioApp';

const HERO_METRICS = [
  { label: 'Archétypes inclus', value: '3 presets premium' },
  { label: 'Export instantané', value: 'PNG & JSON en 1 clic' },
  { label: 'Sauvegarde locale', value: 'Automatique' },
];

const WORKFLOW_STEPS = [
  {
    title: 'Imaginez',
    description:
      'Sélectionnez un archétype, définissez votre faction et personnalisez vos synergies en quelques secondes.',
    icon: '✨',
  },
  {
    title: 'Équilibrez',
    description:
      'Ajustez statistiques, mots-clés et capacités avec des contrôles clairs pour garder un équilibre parfait.',
    icon: '⚖️',
  },
  {
    title: 'Partagez',
    description:
      'Exportez en PNG haute résolution, copiez le JSON et constituez votre set prêt à imprimer.',
    icon: '🚀',
  },
];

const FEATURE_LIST = [
  {
    title: 'Éditeur ergonomique',
    description:
      'Formulaire organisé par sections, raccourcis pour les capacités et aperçu temps réel entièrement stylisé.',
  },
  {
    title: 'Filtres & recherche',
    description:
      'Retrouvez vos cartes instantanément grâce aux filtres par type, faction et mots-clés personnalisés.',
  },
  {
    title: 'Import intelligent',
    description:
      'Glissez-déposez un JSON d’une carte ou d’un set complet et reprenez votre travail exactement là où vous l’aviez laissé.',
  },
  {
    title: 'Exports multiples',
    description:
      'Téléchargez en PNG x1/x2/x4, exportez ou copiez le JSON d’une carte ou d’un set complet pour collaborer.',
  },
];

export default function App() {
  const featuresRef = useRef<HTMLElement | null>(null);
  const studioRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const anchor = sessionStorage.getItem('tcg-card-studio:redirect');
    if (anchor) {
      sessionStorage.removeItem('tcg-card-studio:redirect');
      if (anchor === '#studio') {
        requestAnimationFrame(() => {
          studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      }
    } else if (window.location.hash === '#studio') {
      requestAnimationFrame(() => {
        studioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden pb-24">
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-sky-500/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/3 -right-20 h-[26rem] w-[26rem] rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />

        <header id="top" className="relative z-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-8 md:flex-nowrap md:justify-between">
            <a href="#top" className="flex items-center gap-3 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-semibold shadow-2xl">
                TCG
              </span>
              <span className="text-xl font-semibold tracking-tight">Card Studio</span>
            </a>
            <nav aria-label="Navigation principale" className="flex flex-1 justify-end gap-6 text-sm text-slate-200">
              <button className="transition hover:text-white" onClick={() => scrollTo(featuresRef)} type="button">
                Fonctionnalités
              </button>
              <button className="transition hover:text-white" onClick={() => scrollTo(studioRef)} type="button">
                Ouvrir le studio
              </button>
              <a className="transition hover:text-white" href="mailto:contact@example.com">
                Support
              </a>
            </nav>
          </div>
        </header>

        <main className="relative z-10">
          <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,380px)]">
            <div>
              <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-sky-200">
                Studio tout-en-un
              </span>
              <h1 className="mt-5 text-4xl font-semibold leading-tight md:text-5xl">
                Concevez des cartes spectaculaires sans quitter votre navigateur
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-200/80">
                Créez des héros, des unités ou des actions avec un éditeur pensé pour l’équilibrage et la narration. Chaque modification s’affiche immédiatement dans un aperçu premium, prêt à être exporté.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:brightness-105"
                  onClick={() => scrollTo(studioRef)}
                  type="button"
                >
                  Lancer le studio
                </button>
                <button
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                  onClick={() => scrollTo(featuresRef)}
                  type="button"
                >
                  Explorer les modules
                </button>
                <a
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/20"
                  href="#studio"
                >
                  Importer un JSON
                </a>
              </div>
              <dl className="mt-10 grid gap-6 sm:grid-cols-3">
                {HERO_METRICS.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-[0_18px_30px_rgba(15,23,42,0.35)]">
                    <dt className="text-xs uppercase tracking-[0.3em] text-white/60">{metric.label}</dt>
                    <dd className="mt-2 text-sm font-semibold text-white/90">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-sky-400/40 blur-2xl" aria-hidden="true" />
              <div className="absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-indigo-500/40 blur-2xl" aria-hidden="true" />
              <article className="relative w-full max-w-xs rounded-[26px] border border-white/20 bg-white/10 p-6 text-white shadow-[0_32px_70px_rgba(15,23,42,0.55)] backdrop-blur-xl">
                <header className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
                  <span>Héros</span>
                  <span>Verdantheart</span>
                </header>
                <h2 className="mt-4 text-2xl font-semibold">Gardien de Lumen</h2>
                <div className="mt-4 grid h-40 place-items-center rounded-2xl bg-white/10 text-sm text-white/70">
                  Ajoutez votre visuel
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Étendez un rempart de lumière pour protéger vos unités et renverser la bataille.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold tracking-[0.1em]">
                  <span>ATK 3</span>
                  <span>Deck HP 34</span>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>

      <section ref={featuresRef} id="features" className="bg-slate-900/80 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Workflow intuitif</span>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Toutes les étapes pour créer un set cohérent
            </h2>
            <p className="mt-4 text-base text-slate-300">
              Chaque module du studio a été pensé pour accélérer votre processus de création tout en conservant un rendu professionnel.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {WORKFLOW_STEPS.map((step) => (
              <article key={step.title} className="rounded-3xl border border-slate-800/60 bg-slate-950/80 p-6">
                <span className="text-2xl">{step.icon}</span>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{step.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {FEATURE_LIST.map((feature) => (
              <article key={feature.title} className="rounded-3xl border border-slate-800/60 bg-slate-950/80 p-6">
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={studioRef} id="studio" className="bg-slate-900/95 py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">
          <div className="flex flex-col gap-2 text-center text-slate-200">
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">
              Studio interactif
            </span>
            <h2 className="text-3xl font-semibold md:text-4xl">Tout ce qu’il faut pour imaginer votre deck</h2>
            <p className="mx-auto max-w-3xl text-base text-slate-300">
              Créez, dupliquez, importez et exportez vos cartes sans quitter la page. L’aperçu haute fidélité et la galerie vous aident à garder le contrôle sur votre collection.
            </p>
          </div>
          <StudioApp className="shadow-[0_40px_120px_rgba(8,47,73,0.35)]" />
        </div>
      </section>

      <footer className="bg-slate-950 py-12 text-center text-sm text-slate-400">
        © {new Date().getFullYear()} TCG Card Studio — Donnez vie à vos cartes.
      </footer>
    </div>
  );
}
