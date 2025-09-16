import React, { useMemo, useState } from 'react';
import { Ability, Card, Faction, Keyword } from '../../types';
import { autoColorByFaction } from '../../utils/validation';
import { convertCardTo } from '../../utils/cardFactory';

interface Props {
  card: Card;
  onChange: (card: Card) => void;
}

const inputClasses =
  'w-full rounded-xl border border-slate-700/60 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/70';
const labelClasses = 'text-xs font-semibold uppercase tracking-[0.3em] text-slate-400';

const rarityOptions: Array<NonNullable<Card['rarity']>> = ['Common', 'Uncommon', 'Rare', 'Epic'];
const keywordOptions: Keyword[] = ['Stealth', 'Ranged', 'Healer', 'Flash', 'Protector', 'Hexproof'];
const abilityKinds: Ability['kind'][] = ['Passive', 'Active', 'Ultimate'];

export default function CardForm({ card, onChange }: Props) {
  const [tagDraft, setTagDraft] = useState('');

  const abilitySupported = card.type === 'Hero' || card.type === 'Unit';
  const abilities = useMemo<Ability[]>(
    () => (abilitySupported ? [...(card.abilities ?? [])] : []),
    [abilitySupported, card.abilities],
  );

  function update(partial: Partial<Card>) {
    onChange({ ...card, ...partial } as Card);
  }

  function handleTypeChange(type: Card['type']) {
    if (type === card.type) return;
    const converted = convertCardTo(card, type);
    onChange(converted);
  }

  function handleFaction(faction: Faction) {
    update({ faction, colorHex: autoColorByFaction(faction) });
  }

  function handleSynergyAdd() {
    const value = tagDraft.trim();
    if (!value) return;
    const existing = card.synergyTags ?? [];
    if (existing.includes(value)) {
      setTagDraft('');
      return;
    }
    update({ synergyTags: [...existing, value] });
    setTagDraft('');
  }

  function removeTag(tag: string) {
    update({ synergyTags: (card.synergyTags ?? []).filter((item) => item !== tag) });
  }

  const keywords = card.type === 'Unit' ? card.keywords ?? [] : [];

  function toggleKeyword(keyword: Keyword) {
    if (card.type !== 'Unit') return;
    const set = new Set(keywords);
    if (set.has(keyword)) {
      set.delete(keyword);
    } else {
      set.add(keyword);
    }
    update({ keywords: Array.from(set) });
  }

  function setAbilities(next: Ability[]) {
    if (!abilitySupported) return;
    update({ abilities: next });
  }

  function updateAbility(index: number, partial: Partial<Ability>) {
    const list = [...abilities];
    list[index] = { ...list[index], ...partial };
    setAbilities(list);
  }

  function removeAbility(index: number) {
    const list = [...abilities];
    list.splice(index, 1);
    setAbilities(list);
  }

  function moveAbility(index: number, delta: number) {
    const list = [...abilities];
    const target = index + delta;
    if (target < 0 || target >= list.length) return;
    const [item] = list.splice(index, 1);
    list.splice(target, 0, item);
    setAbilities(list);
  }

  function addAbility(kind: Ability['kind']) {
    const base: Ability = {
      kind,
      text: 'Décrivez l’effet de la capacité.',
      costPA: kind === 'Passive' ? undefined : 1,
    };
    setAbilities([...abilities, base]);
  }

  function toggleExtraCost(index: number, key: keyof NonNullable<Ability['extraCosts']>) {
    const ability = abilities[index];
    const extra = ability.extraCosts ?? {};
    const next = { ...extra, [key]: !extra[key] };
    updateAbility(index, {
      extraCosts: next,
    });
  }

  return (
    <form className="space-y-8 text-slate-200" autoComplete="off">
      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Identité</h2>
          <p className="text-sm text-slate-400">Définissez la carte et son rôle dans votre deck.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-name">
              Nom de la carte
            </label>
            <input
              id="card-name"
              className={inputClasses}
              value={card.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-type">
              Type
            </label>
            <select
              id="card-type"
              className={inputClasses}
              value={card.type}
              onChange={(e) => handleTypeChange(e.target.value as Card['type'])}
            >
              <option value="Hero">Héros</option>
              <option value="Unit">Unité</option>
              <option value="Action">Action</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-faction">
              Faction
            </label>
            <select
              id="card-faction"
              className={inputClasses}
              value={card.faction}
              onChange={(e) => handleFaction(e.target.value as Faction)}
            >
              <option value="Verdantheart">Verdantheart</option>
              <option value="Ethersight">Ethersight</option>
              <option value="Bloodfury">Bloodfury</option>
            </select>
            <p className="text-[0.7rem] text-slate-500">
              La couleur de la carte est ajustée automatiquement selon la faction.
            </p>
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-cost">
              Coût PA
            </label>
            <input
              id="card-cost"
              type="number"
              min={0}
              className={inputClasses}
              value={card.costPA}
              onChange={(e) => update({ costPA: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-set">
              Extension / Set
            </label>
            <input
              id="card-set"
              className={inputClasses}
              value={card.setCode ?? ''}
              onChange={(e) => update({ setCode: e.target.value })}
              placeholder="CODE-001"
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-rarity">
              Rareté
            </label>
            <select
              id="card-rarity"
              className={inputClasses}
              value={card.rarity ?? 'Common'}
              onChange={(e) => update({ rarity: e.target.value as Card['rarity'] })}
            >
              {rarityOptions.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-color">
              Couleur dominante
            </label>
            <div className="flex items-center gap-2">
              <input
                id="card-color"
                type="color"
                className="h-10 w-16 cursor-pointer rounded-xl border border-slate-700/60 bg-slate-900/70"
                value={card.colorHex ?? autoColorByFaction(card.faction)}
                onChange={(e) => update({ colorHex: e.target.value })}
              />
              <button
                type="button"
                className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-400/60 hover:bg-slate-800/70"
                onClick={() => update({ colorHex: autoColorByFaction(card.faction) })}
              >
                Recalculer
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Illustration & histoire</h2>
          <p className="text-sm text-slate-400">Renforcez l’identité visuelle et narrative de la carte.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-art">
              URL de l’illustration
            </label>
            <input
              id="card-art"
              className={inputClasses}
              value={card.artUrl ?? ''}
              onChange={(e) => update({ artUrl: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <label className={labelClasses} htmlFor="card-artist">
              Artiste
            </label>
            <input
              id="card-artist"
              className={inputClasses}
              value={card.artist ?? ''}
              onChange={(e) => update({ artist: e.target.value })}
              placeholder="Nom de l’artiste"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className={labelClasses} htmlFor="card-flavor">
            Texte d’ambiance
          </label>
          <textarea
            id="card-flavor"
            className={`${inputClasses} min-h-[90px] resize-none`}
            value={card.flavorText ?? ''}
            onChange={(e) => update({ flavorText: e.target.value })}
            placeholder="Une citation ou un fragment d’histoire."
          />
        </div>
        <div className="space-y-2">
          <label className={labelClasses} htmlFor="card-tags">
            Étiquettes de synergie
          </label>
          <div className="flex flex-wrap gap-2">
            {(card.synergyTags ?? []).map((tag) => (
              <button
                key={tag}
                type="button"
                className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-200 transition hover:border-slate-400/60 hover:bg-slate-800/70"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              id="card-tags"
              className={`${inputClasses} md:w-64`}
              value={tagDraft}
              onChange={(e) => setTagDraft(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleSynergyAdd();
                }
              }}
              placeholder="Ajoutez un mot-clé…"
            />
            <button
              type="button"
              className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-400/60 hover:bg-slate-800/70"
              onClick={handleSynergyAdd}
            >
              Ajouter
            </button>
          </div>
        </div>
      </section>

      {card.type !== 'Action' ? (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Statistiques</h2>
            <p className="text-sm text-slate-400">Affinez l’équilibrage de la carte.</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className={labelClasses} htmlFor="card-attack">
                Attaque
              </label>
              <input
                id="card-attack"
                type="number"
                className={inputClasses}
                value={card.attack}
                onChange={(e) => update({ attack: Number(e.target.value) } as Partial<Card>)}
              />
            </div>
            {card.type === 'Unit' ? (
              <div className="space-y-2">
                <label className={labelClasses} htmlFor="card-hp">
                  Points de vie
                </label>
                <input
                  id="card-hp"
                  type="number"
                  className={inputClasses}
                  value={card.hp}
                  onChange={(e) => update({ hp: Number(e.target.value) } as Partial<Card>)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className={labelClasses} htmlFor="card-deckhp">
                  Deck HP
                </label>
                <input
                  id="card-deckhp"
                  type="number"
                  className={inputClasses}
                  value={card.deckHP}
                  onChange={(e) => update({ deckHP: Number(e.target.value) } as Partial<Card>)}
                />
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Effet de l’action</h2>
            <p className="text-sm text-slate-400">Décrivez précisément l’impact en jeu.</p>
          </div>
          <textarea
            className={`${inputClasses} min-h-[140px] resize-none`}
            value={card.effectText}
            onChange={(e) => update({ effectText: e.target.value } as Partial<Card>)}
          />
        </section>
      )}

      {card.type === 'Unit' ? (
        <section className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Mots-clés</h2>
            <p className="text-sm text-slate-400">Choisissez les traits caractéristiques de l’unité.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {keywordOptions.map((keyword) => {
              const active = keywords.includes(keyword);
              return (
                <button
                  key={keyword}
                  type="button"
                  onClick={() => toggleKeyword(keyword)}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                    active
                      ? 'border-emerald-400/60 bg-emerald-400/15 text-emerald-100'
                      : 'border-slate-600/60 bg-slate-900/70 text-slate-300 hover:border-slate-400/60 hover:bg-slate-800/70'
                  }`}
                >
                  {keyword}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      {abilitySupported ? (
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <h2 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-300">Capacités</h2>
              <p className="text-sm text-slate-400">
                Ajoutez des actions spéciales, passifs ou ultimes pour enrichir la carte.
              </p>
            </div>
            <div className="flex gap-2">
              {abilityKinds.map((kind) => (
                <button
                  key={kind}
                  type="button"
                  className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:border-slate-400/60 hover:bg-slate-800/70"
                  onClick={() => addAbility(kind)}
                >
                  Ajouter {kind.toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {abilities.length === 0 ? (
              <p className="rounded-3xl border border-dashed border-white/10 bg-white/5 p-4 text-sm text-white/70">
                Aucune capacité pour le moment. Utilisez les boutons ci-dessus pour démarrer.
              </p>
            ) : null}
            {abilities.map((ability, index) => (
              <div
                key={`${ability.kind}-${index}`}
                className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <label className={labelClasses} htmlFor={`ability-kind-${index}`}>
                    Type
                  </label>
                  <select
                    id={`ability-kind-${index}`}
                    className={`${inputClasses} w-auto`}
                    value={ability.kind}
                    onChange={(e) => {
                      const kind = e.target.value as Ability['kind'];
                      updateAbility(index, {
                        kind,
                        costPA: kind === 'Passive' ? undefined : ability.costPA ?? 1,
                      });
                    }}
                  >
                    {abilityKinds.map((kind) => (
                      <option key={kind} value={kind}>
                        {kind}
                      </option>
                    ))}
                  </select>
                  {ability.kind !== 'Passive' ? (
                    <input
                      type="number"
                      className={`${inputClasses} w-24`}
                      min={0}
                      value={ability.costPA ?? 0}
                      onChange={(e) => updateAbility(index, { costPA: Number(e.target.value) })}
                    />
                  ) : (
                    <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Sans coût</span>
                  )}
                  <div className="ml-auto flex items-center gap-2 text-xs">
                    <button
                      type="button"
                      className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-100 hover:border-slate-400/60 hover:bg-slate-800/70"
                      onClick={() => moveAbility(index, -1)}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-slate-600/60 bg-slate-900/70 px-3 py-1 text-xs font-semibold text-slate-100 hover:border-slate-400/60 hover:bg-slate-800/70"
                      onClick={() => moveAbility(index, 1)}
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      className="rounded-full border border-red-500/50 bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-100 hover:border-red-400/60 hover:bg-red-500/30"
                      onClick={() => removeAbility(index)}
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
                <textarea
                  className={`${inputClasses} min-h-[120px]`}
                  value={ability.text}
                  onChange={(e) => updateAbility(index, { text: e.target.value })}
                />
                <div className="flex flex-wrap items-center gap-2 text-xs text-white/70">
                  <span className="uppercase tracking-[0.3em] text-slate-400">Coûts supplémentaires</span>
                  <button
                    type="button"
                    className={`rounded-full border px-3 py-1 ${
                      ability.extraCosts?.sacrifice
                        ? 'border-amber-400/60 bg-amber-400/15 text-amber-100'
                        : 'border-slate-600/60 bg-slate-900/70 text-slate-300 hover:border-slate-400/60 hover:bg-slate-800/70'
                    }`}
                    onClick={() => toggleExtraCost(index, 'sacrifice')}
                  >
                    Sacrifice
                  </button>
                  <button
                    type="button"
                    className={`rounded-full border px-3 py-1 ${
                      ability.extraCosts?.discardHand
                        ? 'border-amber-400/60 bg-amber-400/15 text-amber-100'
                        : 'border-slate-600/60 bg-slate-900/70 text-slate-300 hover:border-slate-400/60 hover:bg-slate-800/70'
                    }`}
                    onClick={() => toggleExtraCost(index, 'discardHand')}
                  >
                    Défausse totale
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </form>
  );
}
