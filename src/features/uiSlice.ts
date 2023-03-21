import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface UiState {
  loading: boolean
}

const initialState: UiState = {
  loading: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setIsLoading(state) {
        state.loading = !state.loading
    } 
  },
})

// Action creators are generated for each case reducer function
export const { setIsLoading } = uiSlice.actions

export default uiSlice.reducer