import { useCallback, useRef, useState } from 'react'
import { loadState, saveState } from '@/lib/storage'
import { addTask, removeTask, restoreTask, toggleTask, type Task } from './model'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(() => loadState().tasks)
  const lastRemoved = useRef<{ task: Task; index: number } | null>(null)

  const add = useCallback((title: string) => {
    setTasks((current) => {
      const next = addTask(current, title)
      saveState({ version: 1, tasks: next })
      return next
    })
  }, [])

  const toggle = useCallback((id: string) => {
    setTasks((current) => {
      const next = toggleTask(current, id)
      saveState({ version: 1, tasks: next })
      return next
    })
  }, [])

  const remove = useCallback((id: string) => {
    setTasks((current) => {
      const index = current.findIndex((t) => t.id === id)
      if (index === -1) return current
      lastRemoved.current = { task: current[index], index }
      const next = removeTask(current, id)
      saveState({ version: 1, tasks: next })
      return next
    })
  }, [])

  const restore = useCallback(() => {
    const snapshot = lastRemoved.current
    if (!snapshot) return
    lastRemoved.current = null
    setTasks((current) => {
      const next = restoreTask(current, snapshot.task, snapshot.index)
      saveState({ version: 1, tasks: next })
      return next
    })
  }, [])

  return { tasks, add, toggle, remove, restore }
}
