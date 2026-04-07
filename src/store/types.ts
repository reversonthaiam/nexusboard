export type TaskStatus = 'todo' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id:          string
  title:       string
  description: string
  status:      TaskStatus
  priority:    TaskPriority
  createdAt:   string
}

export interface TasksState {
  items:   Task[]
  filter:  TaskStatus | 'all'
  loading: boolean
  error:   string | null
}

export interface SettingsState {
  userName:      string
  theme:         'light' | 'dark'
  notifications: boolean
}