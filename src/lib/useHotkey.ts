import { useEffect, useLayoutEffect, useRef } from 'react'

const EDITABLE_SELECTOR = 'input, textarea, [contenteditable]'

/**
 * Reagiert auf eine Taste auf der ganzen Seite (keydown auf window) und
 * überspringt den Aufruf, wenn gerade in ein Eingabefeld getippt wird
 * (DESIGN.md, Rezept 9).
 */
export function useHotkey(key: string, handler: () => void) {
  const handlerRef = useRef(handler)

  useLayoutEffect(() => {
    handlerRef.current = handler
  })

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() !== key.toLowerCase()) return
      const target = event.target as HTMLElement | null
      if (target?.closest?.(EDITABLE_SELECTOR)) return
      handlerRef.current()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [key])
}
