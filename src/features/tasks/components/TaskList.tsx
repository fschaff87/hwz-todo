import { AnimatePresence } from 'motion/react'
import type { Task } from '../model'
import { TaskCard } from './TaskCard'

type TaskListProps = {
  tasks: Task[]
  onToggle: (task: Task) => void
  onRemove: (task: Task) => void
  onRestore: (task: Task) => void
}

export function TaskList({ tasks, onToggle, onRemove, onRestore }: TaskListProps) {
  return (
    <ul className="flex flex-col gap-3">
      <AnimatePresence initial={false} mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} onRestore={onRestore} />
        ))}
      </AnimatePresence>
    </ul>
  )
}
