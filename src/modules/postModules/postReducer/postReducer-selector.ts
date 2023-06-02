import { AppRootStateType } from '@/store/store'

export const selectOriginalPics = (state: AppRootStateType) => state.postReducer.originalPics
export const selectUrlOriginalPics = (state: AppRootStateType) => state.postReducer.urlOriginalPics
