import { describe, expect, it } from 'vitest'
import { addTask, removeTask, toggleTask, type Task } from './model'

const task = (overrides: Partial<Task> = {}): Task => ({
  id: '1',
  title: 'Testaufgabe',
  done: false,
  createdAt: 1000,
  ...overrides,
})

describe('addTask', () => {
  it('adds a task to an empty list', () => {
    const result = addTask([], '  Milch kaufen  ')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Milch kaufen')
    expect(result[0].done).toBe(false)
    expect(result[0].id).toBeTruthy()
  })

  it('ignores an empty or whitespace-only title', () => {
    expect(addTask([task()], '   ')).toEqual([task()])
    expect(addTask([task()], '')).toEqual([task()])
  })

  it('truncates a title longer than 200 characters', () => {
    const long = 'ä'.repeat(250)
    const result = addTask([], long)
    expect(result[0].title).toHaveLength(200)
    expect(result[0].title).toBe('ä'.repeat(200))
  })

  it('adds new tasks at the top', () => {
    const first = task({ id: 'a', title: 'Erste' })
    const result = addTask([first], 'Zweite')
    expect(result.map((t) => t.title)).toEqual(['Zweite', 'Erste'])
  })
})

describe('toggleTask', () => {
  it('flips done from false to true', () => {
    const result = toggleTask([task()], '1')
    expect(result[0].done).toBe(true)
  })

  it('flips done from true to false', () => {
    const done = task({ done: true })
    const result = toggleTask([done], '1')
    expect(result[0].done).toBe(false)
  })

  it('leaves the list unchanged for an unknown id', () => {
    const original = [task()]
    expect(toggleTask(original, 'nope')).toEqual(original)
  })
})

describe('removeTask', () => {
  it('removes the task with the given id', () => {
    const a = task({ id: 'a' })
    const b = task({ id: 'b' })
    expect(removeTask([a, b], 'a')).toEqual([b])
  })

  it('leaves the list unchanged for an unknown id', () => {
    const original = [task()]
    expect(removeTask(original, 'nope')).toEqual(original)
  })
})
