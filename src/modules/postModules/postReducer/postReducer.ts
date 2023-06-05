import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	originalPics: {} as File,
	urlOriginalPics: '',

	croppedPics: {} as File,
	urlCroppedPics: '',

	filteredPics: {} as File,
	urlFilteredPics: '',

	uploadId: ''
}

type PostInitialStateType = typeof initialState

const slice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setOriginalPics: (state, action: PayloadAction<{ originalPics: File }>) => {
			state.originalPics = action.payload.originalPics
		},
		setUrlOriginalPics: (state, action: PayloadAction<{ urlOriginalPics: string }>) => {
			state.urlOriginalPics = action.payload.urlOriginalPics
		},
		setCroppedPics: (state, action: PayloadAction<{ croppedPics: File }>) => {
			state.croppedPics = action.payload.croppedPics
		},
		setUrlCroppedPics: (state, action: PayloadAction<{ urlCroppedPics: string }>) => {
			state.urlCroppedPics = action.payload.urlCroppedPics
		},
		setFilteredPics: (state, action: PayloadAction<{ filteredPics: File }>) => {
			state.filteredPics = action.payload.filteredPics
		},
		setUrlFilteredPics: (state, action: PayloadAction<{ urlFilteredPics: string }>) => {
			state.urlFilteredPics = action.payload.urlFilteredPics
		},
		setUploadId: (state, action: PayloadAction<{ uploadId: string }>) => {
			state.uploadId = action.payload.uploadId
		}
	}
})

export const postReducer = slice.reducer
export const postActions = slice.actions
