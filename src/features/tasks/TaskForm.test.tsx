import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import tasksReducer from './tasksSlice'
import settingsReducer from '../settings/settingsSlice'
import { TaskForm } from './TaskForm'

jest.mock('../../repositories/taskRepository', () => ({
  taskRepository: {
    getAll:  jest.fn().mockResolvedValue([]),
    create:  jest.fn().mockResolvedValue({
      id:          '999',
      title:       'Nova task',
      description: 'Descrição teste',
      status:      'todo',
      priority:    'medium',
      createdAt:   '2026-01-01T00:00:00.000Z',
    }),
    update: jest.fn(),
    remove: jest.fn(),
  },
}))

function makeStore() {
  return configureStore({
    reducer: {
      tasks:    tasksReducer,
      settings: settingsReducer,
    },
  })
}

describe('TaskForm — integration', () => {

})