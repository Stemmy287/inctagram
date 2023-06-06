import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserType } from 'modules/authModules/authApi/authApi'

const initialState = {
	isLoggedIn: false,
	user: {} as UserType
}

export type AuthInitialStateType = typeof initialState

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: UserType }>) => {
			state.user = action.payload.user
		},
		setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
			state.isLoggedIn = action.payload.isLoggedIn
		}
	}
})

export const authReducer = slice.reducer
export const authActions = slice.actions
