import { useState, useEffect } from 'react'
import { useAppDispatch } from '../../store/hooks'
import { addTask, updateTask } from './tasksSlice'
import { Modal } from '../../components/ui/Modal/Modal'
import { Input } from '../../components/ui/Input/Input'
import { Button } from '../../components/ui/Button/Button'
import type { Task, TaskStatus, TaskPriority } from '../../store/types'

interface TaskFormProps {
  isOpen:  boolean
  onClose: () => void
  task?:   Task | null
}

interface FormState {
  title:       string
  description: string
  status:      TaskStatus
  priority:    TaskPriority
}

const initialForm: FormState = {
  title:       '',
  description: '',
  status:      'todo',
  priority:    'medium',
}

export function TaskForm({ isOpen, onClose, task }: TaskFormProps) {
  const dispatch          = useAppDispatch()
  const [form, setForm]   = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})

  useEffect(() => {
    if (task) {
      setForm({
        title:       task.title,
        description: task.description,
        status:      task.status,
        priority:    task.priority,
      })
    } else {
      setForm(initialForm)
    }
  }, [task, isOpen])

  function validate(): boolean {
    const newErrors: Partial<FormState> = {}
    if (!form.title.trim())       newErrors.title       = 'Title is required'
    if (!form.description.trim()) newErrors.description = 'Description is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit() {
    if (!validate()) return

    if (task) {
      dispatch(updateTask({ ...task, ...form }))
    } else {
      dispatch(addTask(form))
    }

    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={task ? 'Edit task' : 'New task'}
    >
      <div className="flex flex-col gap-4">
        <Input
          label="Title"
          placeholder="Task title..."
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          error={errors.title}
        />

        <Input
          label="Description"
          placeholder="Task description..."
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
          error={errors.description}
        />

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0f4c5c]">Status</label>
          <select
            value={form.status}
            onChange={e => setForm({ ...form, status: e.target.value as TaskStatus })}
            className="w-full px-3 py-2 rounded-lg text-sm border border-[#e2e8f0] outline-none focus:border-[#0f4c5c]"
          >
            <option value="todo">To do</option>
            <option value="in_progress">In progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-[#0f4c5c]">Priority</label>
          <select
            value={form.priority}
            onChange={e => setForm({ ...form, priority: e.target.value as TaskPriority })}
            className="w-full px-3 py-2 rounded-lg text-sm border border-[#e2e8f0] outline-none focus:border-[#0f4c5c]"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {task ? 'Save changes' : 'Create task'}
          </Button>
        </div>
      </div>
    </Modal>
  )
}