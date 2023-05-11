import { AppRootStateType } from '@/store/store'

export const loggedIn = (state: AppRootStateType) => state.authReducer.isLoggedIn
export const userInfo = (state: AppRootStateType) => state.authReducer.user