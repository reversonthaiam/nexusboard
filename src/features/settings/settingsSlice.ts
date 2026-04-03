import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { SettingsState } from '../../store/types'

const initialState: SettingsState = {
  userName:      'Reverson',
  theme:         'light',
  notifications: true,
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload
    },

    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
    },

    toggleNotifications(state) {
      state.notifications = !state.notifications
    },
  },
})

export const { updateUserName, toggleTheme, toggleNotifications } =
  settingsSlice.actions

export default settingsSlice.reducer