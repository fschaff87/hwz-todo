import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { EmptyState } from './EmptyState'

describe('EmptyState', () => {
  it('zeigt die freundliche Meldung, wenn nichts zu tun ist', () => {
    render(<EmptyState />)
    expect(screen.getByText('Alles erledigt. Zeit für Kaffee.')).toBeInTheDocument()
  })

  it('zeigt den Hinweis, oben eine neue Aufgabe einzutippen', () => {
    render(<EmptyState />)
    expect(
      screen.getByText('Tippe oben eine neue Aufgabe ein oder drücke N.'),
    ).toBeInTheDocument()
  })
})
