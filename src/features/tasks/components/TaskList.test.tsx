import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { loadState } from '@/lib/storage'
import type { Task } from '@/features/tasks/model'
import { TaskList } from './TaskList'

const noop = {
  onToggle: vi.fn(),
  onRemove: vi.fn(),
  onRestore: vi.fn(),
}

const storageTasks = (): Task[] => {
  localStorage.setItem(
    'hwz-todo',
    JSON.stringify({
      version: 1,
      tasks: [
        { id: 'a', title: 'Erste Aufgabe', done: false, createdAt: 1000 },
        { id: 'b', title: 'Zweite Aufgabe', done: true, createdAt: 2000 },
      ],
    }),
  )
  return loadState().tasks
}

describe('TaskList', () => {
  it('zeigt zwei Aufgaben aus dem localStorage nach dem Rendern an', () => {
    render(<TaskList tasks={storageTasks()} {...noop} />)
    expect(screen.getByText('Erste Aufgabe')).toBeInTheDocument()
    expect(screen.getByText('Zweite Aufgabe')).toBeInTheDocument()
  })

  it('zeigt eine leere Liste ohne Listeneinträge', () => {
    const { container } = render(<TaskList tasks={[]} {...noop} />)
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })
})
