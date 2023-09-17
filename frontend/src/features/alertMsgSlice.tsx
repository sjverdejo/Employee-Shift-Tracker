/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

const initialState = {
  message: '',
  show: false
}

export const alertMsgSlice = createSlice({
  name: 'alertMsg',
  initialState,
  reducers: {
    alert_message: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.show = true
    },
    clear_message: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.show = false
    }
  }
})

export const { alert_message, clear_message } = alertMsgSlice.actions

export const selectUser = (state: RootState) => state.user

export default alertMsgSlice.reducer