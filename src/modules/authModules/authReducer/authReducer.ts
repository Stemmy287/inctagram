import { UserType } from '@/modules/authModules'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


const slice = createSlice({
	name: 'auth',
	initialState: {
		user: {} as UserType,
		isLoggedIn: false
	},
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