import client from '../api/client'
import type { Task } from '../store/types'

export const taskRepository = {
  async getAll(): Promise<Task[]> {
    const response = await client.get('/tasks')
    return response.data
  },

  async create(task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> {
    const response = await client.post('/tasks', {
      ...task,
      createdAt: new Date().toISOString(),
    })
    return response.data
  },

  async update(task: Task): Promise<Task> {
    const response = await client.put(`/tasks/${task.id}`, task)
    return response.data
  },

  async remove(id: string): Promise<void> {
    await client.delete(`/tasks/${id}`)
  },
}