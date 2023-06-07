import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	ava: ''
}

const slice = createSlice({
	name: 'createProfile',
	initialState,
	reducers: {
		setAva: (state, action: PayloadAction<{ ava: string }>) => {
			state.ava = action.payload.ava
		}
		// setProfileData: (state, action: PayloadAction<FetchUserResponseType>) => {
		// 	state.profileData = action.payload
		// }
	}
})

export const createProfileReducer = slice.reducer
export const createProfileActions = slice.actions
