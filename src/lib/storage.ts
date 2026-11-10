import type { Task } from '@/features/tasks/model'

export const STORAGE_KEY = 'hwz-todo'
export const CURRENT_VERSION = 1

export type PersistedState = {
  version: number
  tasks: Task[]
}

export function loadState(): PersistedState {
  const fallback: PersistedState = { version: CURRENT_VERSION, tasks: [] }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return fallback
    const parsed: unknown = JSON.parse(raw)
    if (!isValidState(parsed)) return fallback
    return parsed
  } catch {
    return fallback
  }
}

export function saveState(state: PersistedState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

function isValidState(value: unknown): value is PersistedState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.version === 'number' &&
    Array.isArray(candidate.tasks) &&
    candidate.tasks.every(isTask)
  )
}

function isTask(value: unknown): value is Task {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Record<string, unknown>
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.title === 'string' &&
    typeof candidate.done === 'boolean' &&
    typeof candidate.createdAt === 'number'
  )
}
