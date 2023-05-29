import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileType } from '@/modules/profileModules/createProfile/createProfileApi'

const initialState = {
	profile: {} as ProfileType
}

export type AuthInitialStateType = typeof initialState

const slice = createSlice({
	name: 'createProfile',
	initialState,
	reducers: {
		// setUser: (state, action: PayloadAction<{profile: ProfileType}>) => {
		// 	state.profile = action.payload.profile
		// },
	}
})

export const createProfileReducer = slice.reducer
export const createProfileActions = slice.actions
