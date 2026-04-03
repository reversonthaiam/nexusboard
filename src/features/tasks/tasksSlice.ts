import { createSlice, createSelector } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { Task, TasksState, TaskStatus } from '../../store/types'

// ─── State inicial ───────────────────────────────────────────
const initialState: TasksState = {
  items: [
    {
      id: '1',
      title: 'Criar layout do relatório mensal',
      description: 'Definir estrutura de seções e exportação PDF',
      status: 'todo',
      priority: 'high',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Revisar pull requests do time',
      description: 'Checar 3 PRs pendentes no repositório principal',
      status: 'in_progress',
      priority: 'medium',
      createdAt: new Date().toISOString(),
    },
    {
      id: '3',
      title: 'Configurar ambiente Docker',
      description: 'Dockerfile + docker-compose para o novo serviço',
      status: 'done',
      priority: 'low',
      createdAt: new Date().toISOString(),
    },
  ],
  filter: 'all',
}

// ─── Slice ────────────────────────────────────────────────────
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action: PayloadAction<Omit<Task, 'id' | 'createdAt'>>) {
      state.items.push({
        ...action.payload,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
      })
    },

    updateTask(state, action: PayloadAction<Task>) {
      const index = state.items.findIndex(t => t.id === action.payload.id)
      if (index !== -1) state.items[index] = action.payload
    },

    deleteTask(state, action: PayloadAction<string>) {
      state.items = state.items.filter(t => t.id !== action.payload)
    },

    changeStatus(state, action: PayloadAction<{ id: string; status: TaskStatus }>) {
      const task = state.items.find(t => t.id === action.payload.id)
      if (task) task.status = action.payload.status
    },

    setFilter(state, action: PayloadAction<TaskStatus | 'all'>) {
      state.filter = action.payload
    },
  },
})

export const { addTask, updateTask, deleteTask, changeStatus, setFilter } =
  tasksSlice.actions

export default tasksSlice.reducer

const selectItems = (state: RootState) => state.tasks.items
const selectFilter = (state: RootState) => state.tasks.filter

export const selectFilteredTasks = createSelector(
  [selectItems, selectFilter],
  (items, filter) =>
    filter === 'all' ? items : items.filter(t => t.status === filter)
)

export const selectStats = createSelector([selectItems], (items) => ({
  total:       items.length,
  todo:        items.filter(t => t.status === 'todo').length,
  in_progress: items.filter(t => t.status === 'in_progress').length,
  done:        items.filter(t => t.status === 'done').length,
  progress:    items.length === 0
    ? 0
    : Math.round((items.filter(t => t.status === 'done').length / items.length) * 100),
}))
