import { AppRootStateType } from 'store/store'

export const loggedIn = (state: AppRootStateType) => state.authReducer.isLoggedIn
