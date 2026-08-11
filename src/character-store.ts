// Character persistence — a deliberate seam.
//
// Today this is localStorage, keyed by character name (the same
// `foresight_characters_v2` store the previous sheet used, so existing saved
// characters keep working). Tomorrow it's Firestore, so players save online and
// GMs host campaigns with custom rulesets.
//
// Keeping the interface tiny and async now means that move is a swap rather than
// a rewrite: implement CharacterStore against Firestore, hand it to the sheet.

import type { Character } from './character-rules'

export interface CharacterStore {
  list(): Promise<string[]>
  load(name: string): Promise<Character | null>
  save(character: Character): Promise<void>
  remove(name: string): Promise<void>
}

const KEY = 'foresight_characters_v2'

/** The default store. Sync under the hood, async at the seam. */
export class LocalCharacterStore implements CharacterStore {
  private all(): Record<string, Character> {
    try {
      return JSON.parse(localStorage.getItem(KEY) || '{}')
    } catch {
      return {}
    }
  }

  private write(o: Record<string, Character>) {
    localStorage.setItem(KEY, JSON.stringify(o))
  }

  async list() {
    return Object.keys(this.all()).sort()
  }

  async load(name: string) {
    return this.all()[name] ?? null
  }

  async save(character: Character) {
    if (!character.name) throw new Error('a character needs a name before it can be saved')
    const o = this.all()
    // structuredClone strips any reactive proxy wrapper before serialising
    o[character.name] = JSON.parse(JSON.stringify(character))
    this.write(o)
  }

  async remove(name: string) {
    const o = this.all()
    delete o[name]
    this.write(o)
  }
}
