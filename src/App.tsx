import React, { useEffect, useRef } from 'react';
import StudioApp from './StudioApp';

const HERO_HIGHLIGHTS = [
  {
    badge: 'Glisser-déposer',
    description:
      "Importez vos fichiers JSON directement dans l'éditeur ou choisissez-les depuis votre ordinateur.",
  },
  {
    badge: 'Partage',
    description: 'Copiez le JSON généré ou exportez-le pour collaborer facilement avec votre équipe.',
  },
  {
    badge: 'Brouillon',
    description: 'Vos cartes sont sauvegardées localement après chaque modification.',
  },
];

const FEATURES = [
  {
    title: 'Import / Export JSON',
    description:
      "Glissez-déposez vos cartes dans l'éditeur, importez-les depuis l'explorateur ou exportez-les en un clic.",
    badge: 'Nouveau',
  },
  {
    title: 'Archétypes prêts à jouer',
    description:
      'Démarrez rapidement avec un preset — Gardien céleste, Oracle des braises ou Druide sylvestre — puis personnalisez.',
  },
  {
    title: 'Interface immersive',
    description:
      'Un formulaire à panneaux avec aperçu premium, capacité signature et jauges animées pour visualiser chaque détail.',
  },
  {
    title: 'Partage simplifié',
    description:
      'Copiez le JSON généré, téléchargez un set complet et profitez de la sauvegarde automatique.',
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
      <div className="relative overflow-hidden pb-20">
        <div className="absolute inset-0 -z-20 bg-slate-950" aria-hidden="true" />
        <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/2 -left-40 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />

        <header id="top" className="relative z-10">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-6 px-6 py-8 md:flex-nowrap md:justify-between">
            <a href="#top" className="flex items-center gap-3 text-white">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-lg font-semibold shadow-2xl">
                TCG
              </span>
              <span className="text-xl font-semibold tracking-tight">Card Studio</span>
            </a>
            <nav aria-label="Navigation principale" className="flex flex-1 justify-end gap-6 text-sm text-slate-200">
              <a className="transition hover:text-white" href="#features">
                Fonctionnalités
              </a>
              <a className="transition hover:text-white" href="#studio">
                Ouvrir l'éditeur
              </a>
              <a className="transition hover:text-white" href="mailto:contact@example.com">
                Support
              </a>
            </nav>
          </div>
        </header>

        <main className="relative z-10">
          <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-16 pt-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,360px)]">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-300">Créez votre univers</span>
              <h1 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">
                Donnez vie à vos cartes de jeu en quelques clics
              </h1>
              <p className="mt-6 max-w-xl text-lg text-slate-200/80">
                Composez vos cartes de jeu de façon intuitive&nbsp;: personnalisez le nom, l'histoire et les statistiques, visualisez le rendu final instantanément, importez vos anciennes créations et exportez vos decks en un clin d'œil.
              </p>
              <ul className="mt-8 grid gap-4" role="list">
                {HERO_HIGHLIGHTS.map((item) => (
                  <li
                    key={item.badge}
                    className="flex items-start gap-3 rounded-2xl bg-sky-400/10 p-4 text-sm text-slate-200/90 shadow-[0_18px_32px_rgba(15,23,42,0.25)]"
                  >
                    <span className="inline-flex shrink-0 items-center justify-center rounded-full bg-white/80 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-sky-600">
                      {item.badge}
                    </span>
                    <span className="leading-relaxed">{item.description}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-wrap gap-3">
                <button
                  className="rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/40 transition hover:brightness-105"
                  onClick={() => scrollTo(studioRef)}
                >
                  Ouvrir l'éditeur
                </button>
                <button
                  className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/40 hover:text-white"
                  onClick={() => scrollTo(featuresRef)}
                >
                  Découvrir les fonctionnalités
                </button>
                <a
                  className="rounded-full bg-white/10 px-5 py-2.5 text-sm font-semibold text-white/80 transition hover:bg-white/20"
                  href="#studio"
                >
                  Importer une création
                </a>
              </div>
            </div>
            <div className="relative flex justify-center">
              <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-sky-400/40 blur-2xl" aria-hidden="true" />
              <div className="absolute -right-10 bottom-0 h-28 w-28 rounded-full bg-indigo-500/40 blur-2xl" aria-hidden="true" />
              <article className="relative w-full max-w-xs rounded-[26px] border border-white/20 bg-white/10 p-6 text-white shadow-[0_32px_70px_rgba(15,23,42,0.45)] backdrop-blur-xl">
                <header className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/70">
                  <span>Legendary</span>
                  <span>Édition Alpha</span>
                </header>
                <h2 className="mt-4 text-2xl font-semibold">Gardien de l'Aube</h2>
                <div className="mt-4 grid h-40 place-items-center rounded-2xl bg-white/10 text-sm text-white/70">
                  Ajoutez votre visuel
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/80">
                  Incarnez un protecteur ancestral et libérez des combos lumineux qui renversent le cours de la partie.
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold tracking-[0.1em]">
                  <span>ATK 320</span>
                  <span>DEF 280</span>
                </div>
              </article>
            </div>
          </section>
        </main>
      </div>

      <section ref={featuresRef} id="features" className="bg-slate-50 py-20 text-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-3xl font-semibold md:text-4xl">
            Pourquoi vous allez adorer l'éditeur
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map((feature) => (
              <article
                key={feature.title}
                className={`rounded-3xl border border-slate-200/70 bg-white p-6 shadow-[0_18px_30px_rgba(15,23,42,0.08)] ${
                  feature.badge ? 'ring-1 ring-sky-400/40' : ''
                }`}
              >
                {feature.badge && (
                  <span className="inline-flex items-center rounded-full bg-sky-500/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-sky-600">
                    {feature.badge}
                  </span>
                )}
                <h3 className="mt-4 text-xl font-semibold">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{feature.description}</p>
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
            <h2 className="text-3xl font-semibold md:text-4xl">Tout ce qu'il faut pour imaginer votre deck</h2>
            <p className="mx-auto max-w-3xl text-base text-slate-300">
              Créez, dupliquez, importez et exportez vos cartes sans quitter la page. L'aperçu haute fidélité et la galerie vous aident à garder le contrôle sur votre collection.
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
