import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { appReducer } from 'modules/appModules/appReducer'
import { authReducer } from 'modules/authModules/authReducer/authReducer'
import { authApi } from 'modules/authModules'
import { profileApi } from 'modules/profileModules/profileApi/profileApi'
import { postApi } from 'modules/postModules/postApi/postApi'
import { postReducer } from 'modules/postModules/postReducer/postReducer'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
	app: appReducer,
	authReducer: authReducer,
	postReducer: postReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(profileApi.middleware)
			.concat(postApi.middleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
