import { AppRootStateType } from 'store/store'

export const selectAva = (state: AppRootStateType) => state.profileReducer.user?.avatars
export const selectUser = (state: AppRootStateType) => state.profileReducer.user

