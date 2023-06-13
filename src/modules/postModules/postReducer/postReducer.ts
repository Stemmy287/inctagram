import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	originalPics: {} as File,
	urlOriginalPics: '',

	croppedPics: {} as File,
	urlCroppedPics: '',

	filteredPics: {} as File,
	urlFilteredPics: '',

	uploadId: '',

	pageNumber: 1,

	showedPost: null as null | string
}

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
		setPageNumber: (state, action: PayloadAction<number>) => {
			state.pageNumber = action.payload
		},
		setShowedPost: (state, action: PayloadAction<{ value: string | null }>) => {
			state.showedPost = action.payload.value
		}
	}
})

export const postReducer = slice.reducer
export const postActions = slice.actions
