import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { UserInterface } from '../interfaces/users'

const initialState: UserInterface = {
  is_admin: null,
  e_ID: '0',
  is_signed_in: false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    //Reducer for setting the user after sign in or after re-validation
    user_sign_in: (state, action: PayloadAction<UserInterface>) => {
      state.is_admin = action.payload.is_admin
      state.e_ID = action.payload.e_ID
      state.is_signed_in = action.payload.is_signed_in
    },
    //Reducer for setting user back to initial state
    user_sign_out: (state) => {
      state.is_admin = initialState.is_admin
      state.e_ID = initialState.e_ID
      state.is_signed_in = initialState.is_signed_in
    },
  }
})

export const { user_sign_in, user_sign_out } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer