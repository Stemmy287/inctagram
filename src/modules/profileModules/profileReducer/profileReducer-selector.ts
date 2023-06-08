import { AppRootStateType } from 'store/store'

export const selectAva = (state: AppRootStateType) => state.profile.ava
