import { AppRootStateType } from 'store/store'

export const selectOriginalPics = (state: AppRootStateType) => state.postReducer.originalPics
export const selectUrlOriginalPics = (state: AppRootStateType) => state.postReducer.urlOriginalPics
export const selectCroppedPics = (state: AppRootStateType) => state.postReducer.croppedPics
export const selectUrlCroppedPics = (state: AppRootStateType) => state.postReducer.urlCroppedPics

