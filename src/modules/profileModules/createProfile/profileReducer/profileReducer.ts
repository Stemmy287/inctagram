import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	ava: ''
}

const slice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setAva: (state, action: PayloadAction<{ ava: string }>) => {
			state.ava = action.payload.ava
		}
	}
})

export const profileReducer = slice.reducer
export const profileActions = slice.actions
