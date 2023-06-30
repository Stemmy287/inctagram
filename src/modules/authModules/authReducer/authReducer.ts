import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isLoggedIn: false,
	token: null as null | string
}

export type AuthInitialStateType = typeof initialState

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		},
		setToken: (state, action: PayloadAction<{ token: string | null }>) => {
			state.token = action.payload.token
		}
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
