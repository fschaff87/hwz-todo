import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ProgressRing } from './ProgressRing'

describe('ProgressRing', () => {
  it('zeigt 1 von 2 als aria-label', () => {
    render(<ProgressRing done={1} total={2} />)
    expect(screen.getByRole('img', { name: '1 von 2 erledigt' })).toBeInTheDocument()
  })

  it('zeigt den Zähler 1/2 in der Mitte', () => {
    render(<ProgressRing done={1} total={2} />)
    expect(screen.getByText('1/2')).toBeInTheDocument()
  })

  it('zeigt bei 0 Aufgaben 0/0 und einen leeren Ring', () => {
    render(<ProgressRing done={0} total={0} />)
    expect(screen.getByRole('img', { name: '0 von 0 erledigt' })).toBeInTheDocument()
    expect(screen.getByText('0/0')).toBeInTheDocument()
  })
})
