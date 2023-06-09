import { AppRootStateType } from 'store/store'

export const selectAva = (state: AppRootStateType) => state.profileReducer.ava
export const selectUser = (state: AppRootStateType) => state.profileReducer.user
