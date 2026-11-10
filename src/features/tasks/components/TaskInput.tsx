import { useRef, useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useHotkey } from '@/lib/useHotkey'

type TaskInputProps = {
  onAdd: (title: string) => void
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [title, setTitle] = useState('')
  const [shake, setShake] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useHotkey('n', () => inputRef.current?.focus())

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (trimmed.length === 0) {
      setShake(true)
      return
    }
    onAdd(trimmed)
    setTitle('')
    inputRef.current?.focus()
  }

  return (
    <form
      onSubmit={handleSubmit}
      onAnimationEnd={() => setShake(false)}
      className={`glass flex items-center gap-2 rounded-2xl border p-2 shadow-card ${shake ? 'animate-shake' : ''}`}
    >
      <Input
        ref={inputRef}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setTitle('')
            inputRef.current?.blur()
          }
        }}
        className="h-14 flex-1 border-0 bg-transparent px-4 text-lg shadow-none focus-visible:ring-0"
        placeholder="Was steht an?"
        aria-label="Neue Aufgabe"
        maxLength={200}
      />
      <Button
        type="submit"
        size="icon"
        className="size-12 rounded-xl bg-primary text-primary-foreground transition-look hover:scale-105 active:scale-95"
        aria-label="Aufgabe hinzufügen"
      >
        <Plus className="size-6" />
      </Button>
    </form>
  )
}
