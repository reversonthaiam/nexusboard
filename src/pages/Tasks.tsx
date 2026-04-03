import { useState } from 'react'
import { TaskList } from '../features/tasks/TasksList'
import { TaskForm } from '../features/tasks/TaskForm'
import { Button } from '../components/ui/Button/Button'
import type { Task } from '../store/types'

export default function Tasks() {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  function handleEdit(task: Task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function handleClose() {
    setEditingTask(null)
    setIsFormOpen(false)
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-medium text-[#0f4c5c]">Tasks</h2>
        <Button onClick={() => setIsFormOpen(true)}>+ New task</Button>
      </div>

      <TaskList onEdit={handleEdit} />

      <TaskForm
        isOpen={isFormOpen}
        onClose={handleClose}
        task={editingTask}
      />
    </div>
  )
}