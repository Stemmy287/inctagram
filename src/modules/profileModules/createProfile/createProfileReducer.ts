import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	// profile: {} as FetchUserResponseType,
	ava: ''
}

export type AuthInitialStateType = typeof initialState

const slice = createSlice({
	name: 'createProfile',
	initialState,
	reducers: {
		// setUser: (state, action: PayloadAction<{ profile: FetchUserResponseType }>) => {
		// 	state.profile = action.payload.profile
		// },
		setAva: (state, action: PayloadAction<{ ava: string }>) => {
			state.ava = action.payload.ava
		}
	}
})

export const createProfileReducer = slice.reducer
export const createProfileActions = slice.actions
