import { act, renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { loadState } from '@/lib/storage'
import { useTasks } from './useTasks'

beforeEach(() => {
  localStorage.clear()
})

describe('useTasks', () => {
  it('starts with the tasks from localStorage', () => {
    localStorage.setItem(
      'hwz-todo',
      JSON.stringify({
        version: 1,
        tasks: [{ id: '1', title: 'Gespeichert', done: false, createdAt: 1000 }],
      }),
    )
    const { result } = renderHook(() => useTasks())
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Gespeichert')
  })

  it('adds a task and persists it', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.add('Neue Aufgabe')
    })
    expect(result.current.tasks).toHaveLength(1)
    expect(result.current.tasks[0].title).toBe('Neue Aufgabe')
    expect(loadState().tasks).toHaveLength(1)
  })

  it('toggles a task and persists the change', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.add('Aufgabe')
    })
    const id = result.current.tasks[0].id
    act(() => {
      result.current.toggle(id)
    })
    expect(result.current.tasks[0].done).toBe(true)
    expect(loadState().tasks[0].done).toBe(true)
  })

  it('removes a task and persists the change', () => {
    const { result } = renderHook(() => useTasks())
    act(() => {
      result.current.add('Aufgabe')
    })
    const id = result.current.tasks[0].id
    act(() => {
      result.current.remove(id)
    })
    expect(result.current.tasks).toHaveLength(0)
    expect(loadState().tasks).toHaveLength(0)
  })
})
