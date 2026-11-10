import { useRef } from 'react'
import { motion } from 'motion/react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { celebrate } from '@/lib/celebrate'
import type { Task } from '../model'

type TaskCardProps = {
  task: Task
  onToggle: (task: Task) => void
  onRemove: (task: Task) => void
  onRestore: (task: Task) => void
}

export function TaskCard({ task, onToggle, onRemove, onRestore }: TaskCardProps) {
  const checkboxRef = useRef<HTMLButtonElement>(null)

  const handleCheckedChange = (checked: boolean) => {
    // Konfetti nur beim Übergang von offen nach erledigt (DESIGN.md, Rezept 3).
    if (checked && !task.done) {
      const rect = checkboxRef.current?.getBoundingClientRect()
      if (rect) {
        celebrate({
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        })
      } else {
        celebrate()
      }
    }
    onToggle(task)
  }

  const handleRemove = () => {
    onRemove(task)
    toast('Aufgabe gelöscht', {
      action: { label: 'Rückgängig', onClick: () => onRestore(task) },
      duration: 5000,
    })
  }

  return (
    <motion.li
      data-done={task.done}
      layout
      initial={{ opacity: 0, y: -12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
      className="group glass flex min-w-0 items-start gap-3 rounded-xl border p-4 shadow-card transition-look hover:-translate-y-0.5 hover:shadow-pop focus-within:glow"
    >
      <Checkbox
        ref={checkboxRef}
        checked={task.done}
        onCheckedChange={handleCheckedChange}
        className="mt-0.5 size-6 rounded-md transition-look data-[state=checked]:animate-pop data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
        aria-label={`«${task.title}» erledigt`}
      />
      <span
        className={`relative flex-1 break-words [overflow-wrap:anywhere] text-base leading-relaxed ${task.done ? 'text-muted-foreground' : ''}`}
      >
        <motion.span
          aria-hidden
          className="absolute left-0 top-1/2 h-0.5 w-full origin-left bg-current"
          initial={false}
          animate={{ scaleX: task.done ? 1 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
        {task.title}
      </span>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`«${task.title}» löschen`}
        onClick={handleRemove}
        className="opacity-60 transition-look group-hover:opacity-100 focus-visible:opacity-100"
      >
        <Trash2 className="size-4" />
      </Button>
    </motion.li>
  )
}
