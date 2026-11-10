export type Task = {
  id: string // crypto.randomUUID()
  title: string // getrimmt, 1 bis 200 Zeichen
  done: boolean
  createdAt: number // Date.now()
}

const MAX_TITLE_LENGTH = 200

export function addTask(tasks: Task[], rawTitle: string): Task[] {
  const title = rawTitle.trim().slice(0, MAX_TITLE_LENGTH)
  if (title.length === 0) return tasks
  const next: Task = {
    id: crypto.randomUUID(),
    title,
    done: false,
    createdAt: Date.now(),
  }
  return [next, ...tasks]
}

export function toggleTask(tasks: Task[], id: string): Task[] {
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
}

export function removeTask(tasks: Task[], id: string): Task[] {
  return tasks.filter((task) => task.id !== id)
}

/** Setzt eine zuvor gelöschte Aufgabe an der alten Stelle wieder ein (Undo). */
export function restoreTask(tasks: Task[], task: Task, index: number): Task[] {
  if (tasks.some((t) => t.id === task.id)) return tasks
  const position = Math.min(Math.max(index, 0), tasks.length)
  return [...tasks.slice(0, position), task, ...tasks.slice(position)]
}
