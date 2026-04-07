import { createSlice, createSelector, createAsyncThunk } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { Task, TasksState, TaskStatus } from '../../store/types'
import { taskRepository } from '../../repositories/taskRepository'

// ─── Async Thunks ─────────────────────────────────────────────
export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async () => {
    return await taskRepository.getAll()
  }
)

export const createTask = createAsyncThunk(
  'tasks/create',
  async (task: Omit<Task, 'id' | 'createdAt'>) => {
    return await taskRepository.create(task)
  }
)

export const editTask = createAsyncThunk(
  'tasks/update',
  async (task: Task) => {
    return await taskRepository.update(task)
  }
)

export const removeTask = createAsyncThunk(
  'tasks/remove',
  async (id: string) => {
    await taskRepository.remove(id)
    return id
  }
)

// ─── State inicial ────────────────────────────────────────────
const initialState: TasksState = {
  items:   [],
  filter:  'all',
  loading: false,
  error:   null,
}

// ─── Slice ────────────────────────────────────────────────────
const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setFilter(state, action: PayloadAction<TaskStatus | 'all'>) {
      state.filter = action.payload
    },
  },
  extraReducers: (builder) => {
    // fetchTasks
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false
        state.items   = action.payload
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.loading = false
        state.error   = 'Failed to load tasks'
      })

    // createTask
    builder
      .addCase(createTask.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })

    // editTask
    builder
      .addCase(editTask.fulfilled, (state, action) => {
        const index = state.items.findIndex(t => t.id === action.payload.id)
        if (index !== -1) state.items[index] = action.payload
      })

    // removeTask
    builder
      .addCase(removeTask.fulfilled, (state, action) => {
        state.items = state.items.filter(t => t.id !== action.payload)
      })
  },
})

export const { setFilter } = tasksSlice.actions
export default tasksSlice.reducer

// ─── Selectors ────────────────────────────────────────────────
const selectItems  = (state: RootState) => state.tasks.items
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

export const selectLoading = (state: RootState) => state.tasks.loading
export const selectError   = (state: RootState) => state.tasks.error