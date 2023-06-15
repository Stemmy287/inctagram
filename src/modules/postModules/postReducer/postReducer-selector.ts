import { AppRootStateType } from 'store/store'
import App from 'next/app'

export const selectOriginalPics = (state: AppRootStateType) => state.postReducer.originalPics
export const selectUrlOriginalPics = (state: AppRootStateType) => state.postReducer.urlOriginalPics
export const selectCroppedPics = (state: AppRootStateType) => state.postReducer.croppedPics
export const selectUrlCroppedPics = (state: AppRootStateType) => state.postReducer.urlCroppedPics
export const selectPageNumber = (state: AppRootStateType) => state.postReducer.pageNumber
export const selectShowedPost = (state: AppRootStateType) => state.postReducer.showedPost
