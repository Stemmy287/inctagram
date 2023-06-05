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
	}
})

export const createProfileReducer = slice.reducer
export const createProfileActions = slice.actions
