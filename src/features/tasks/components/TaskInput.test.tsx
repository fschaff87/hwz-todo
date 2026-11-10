import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TaskInput } from './TaskInput'

describe('TaskInput', () => {
  it('tippen und Enter ruft onAdd mit dem getrimmten Titel auf', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const field = screen.getByRole('textbox', { name: 'Neue Aufgabe' })
    await user.type(field, '  Milch kaufen  ')
    await user.keyboard('{Enter}')
    expect(onAdd).toHaveBeenCalledTimes(1)
    expect(onAdd).toHaveBeenCalledWith('Milch kaufen')
  })

  it('der Plus-Knopf fügt die Aufgabe hinzu', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const field = screen.getByRole('textbox', { name: 'Neue Aufgabe' })
    await user.type(field, 'Brot')
    await user.click(screen.getByRole('button', { name: 'Aufgabe hinzufügen' }))
    expect(onAdd).toHaveBeenCalledWith('Brot')
  })

  it('Enter bei leerem Feld fügt nichts hinzu', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const field = screen.getByRole('textbox', { name: 'Neue Aufgabe' })
    await user.type(field, '   ')
    await user.keyboard('{Enter}')
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('leert das Feld nach dem Hinzufügen', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const field = screen.getByRole('textbox', { name: 'Neue Aufgabe' })
    await user.type(field, 'Einkauf')
    await user.keyboard('{Enter}')
    expect((field as HTMLInputElement).value).toBe('')
    expect(onAdd).toHaveBeenCalledWith('Einkauf')
  })

  it('die Taste N fokussiert die Eingabe', () => {
    render(<TaskInput onAdd={vi.fn()} />)
    const field = screen.getByRole('textbox', { name: 'Neue Aufgabe' })
    fireEvent.keyDown(window, { key: 'n' })
    expect(field).toHaveFocus()
  })
})
