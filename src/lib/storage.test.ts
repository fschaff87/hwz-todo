import { beforeEach, describe, expect, it } from 'vitest'
import { loadState, saveState, type PersistedState } from './storage'

const KEY = 'hwz-todo'
let data: Record<string, string> = {}

beforeEach(() => {
  data = {}
  Object.defineProperty(globalThis, 'localStorage', {
    value: {
      getItem: (k: string) => (k in data ? data[k] : null),
      setItem: (k: string, v: string) => {
        data[k] = String(v)
      },
      removeItem: (k: string) => {
        delete data[k]
      },
      clear: () => {
        data = {}
      },
    },
    configurable: true,
  })
})

const state: PersistedState = {
  version: 1,
  tasks: [
    { id: '1', title: 'Milch', done: false, createdAt: 1000 },
    { id: '2', title: 'Brot', done: true, createdAt: 2000 },
  ],
}

describe('loadState', () => {
  it('returns an empty state when the key is missing', () => {
    expect(loadState()).toEqual({ version: 1, tasks: [] })
  })

  it('returns an empty state for content that is not valid JSON', () => {
    data[KEY] = 'kaputt{'
    expect(loadState()).toEqual({ version: 1, tasks: [] })
  })

  it('returns an empty state when the shape is wrong', () => {
    data[KEY] = JSON.stringify({ version: 1, tasks: 'kein array' })
    expect(loadState()).toEqual({ version: 1, tasks: [] })
  })

  it('returns the stored state', () => {
    data[KEY] = JSON.stringify(state)
    expect(loadState()).toEqual(state)
  })

  it('does not throw for broken content', () => {
    data[KEY] = null as unknown as string
    expect(() => loadState()).not.toThrow()
  })
})

describe('saveState', () => {
  it('writes the whole state to localStorage', () => {
    saveState(state)
    expect(JSON.parse(data[KEY])).toEqual(state)
  })

  it('can be read back with loadState', () => {
    saveState(state)
    expect(loadState()).toEqual(state)
  })
})
