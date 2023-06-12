import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FetchUserResponseType } from '../profileApi/profileApi'

const initialState = {
	ava: '',
	user: null as null | FetchUserResponseType
}

const slice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		setAva: (state, action: PayloadAction<{ ava: string }>) => {
			state.ava = action.payload.ava
		},
		setUser: (state, action: PayloadAction<{ user: FetchUserResponseType | null }>) => {
			state.user = action.payload.user
		}
	}
})

export const profileReducer = slice.reducer
export const profileActions = slice.actions
