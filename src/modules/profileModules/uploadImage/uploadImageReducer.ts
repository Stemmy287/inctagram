import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
	avatar: '' as string
}

export type initialStateType = typeof initialState

const slice = createSlice({
	name: 'uploadImage',
	initialState,
	reducers: {
		setAva: (state, action: PayloadAction<{ ava: string }>) => {
			state.avatar = action.payload.ava
		}
	}
})

export const uploadImageReducer = slice.reducer
export const uploadImageActions = slice.actions
