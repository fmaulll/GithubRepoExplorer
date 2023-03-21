import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  value: number
}

const initialState: UiState = {
  value: 0,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
  },
})

// Action creators are generated for each case reducer function
export const { } = uiSlice.actions

export default uiSlice.reducer