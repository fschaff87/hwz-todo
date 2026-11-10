import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Task } from '@/features/tasks/model'
import { celebrate } from '@/lib/celebrate'
import { toast } from 'sonner'
import { TaskCard } from './TaskCard'

vi.mock('@/lib/celebrate', () => ({
  celebrate: vi.fn(),
}))

vi.mock('sonner', () => ({
  toast: vi.fn(),
}))

const task: Task = {
  id: '1',
  title: 'Milch holen',
  done: false,
  createdAt: 1000,
}

const onToggle = vi.fn()
const onRemove = vi.fn()
const onRestore = vi.fn()

function renderCard(overrides: Partial<Task> = {}) {
  return render(
    <TaskCard
      task={{ ...task, ...overrides }}
      onToggle={onToggle}
      onRemove={onRemove}
      onRestore={onRestore}
    />,
  )
}

beforeEach(() => {
  onToggle.mockClear()
  onRemove.mockClear()
  onRestore.mockClear()
  vi.mocked(celebrate).mockClear()
  vi.mocked(toast).mockClear()
})

describe('TaskCard', () => {
  it('zeigt den Titel der Aufgabe', () => {
    renderCard()
    expect(screen.getByText('Milch holen')).toBeInTheDocument()
  })

  it('Abhaken ruft onToggle und celebrate auf', async () => {
    const user = userEvent.setup()
    renderCard()
    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith(task)
    expect(celebrate).toHaveBeenCalledTimes(1)
  })

  it('Wieder-Öffnen ruft onToggle, aber kein celebrate', async () => {
    const user = userEvent.setup()
    renderCard({ done: true })
    await user.click(screen.getByRole('checkbox'))
    expect(onToggle).toHaveBeenCalledWith({ ...task, done: true })
    expect(celebrate).not.toHaveBeenCalled()
  })

  it('Löschen ruft onRemove und «Rückgängig» stellt wieder her', async () => {
    const user = userEvent.setup()
    renderCard()
    await user.click(screen.getByRole('button', { name: '«Milch holen» löschen' }))

    expect(onRemove).toHaveBeenCalledWith(task)

    const call = vi.mocked(toast).mock.calls[0] as unknown as [
      string,
      { action: { label: string; onClick: () => void } },
    ]
    const [message, options] = call
    expect(message).toBe('Aufgabe gelöscht')
    expect(options.action.label).toBe('Rückgängig')
    options.action.onClick()
    expect(onRestore).toHaveBeenCalledWith(task)
  })
})
