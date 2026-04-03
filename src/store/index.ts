import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from '../features/tasks/tasksSlice'
import settingsReducer from '../features/settings/settingsSlice'

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    settings: settingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch