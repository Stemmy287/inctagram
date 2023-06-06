import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { appReducer } from 'modules/appModules/appReducer'
import { authReducer } from 'modules/authModules/authReducer/authReducer'
import { authApi } from 'modules/authModules'
import { createProfileApi } from 'modules/profileModules/createProfile/createProfileApi'
import { uploadImageApi } from 'modules/profileModules/uploadImage/uploadImageApi'
import { uploadImageReducer } from 'modules/profileModules/uploadImage/uploadImageReducer'
import { postApi } from 'modules/postModules/postApi/postApi'
import { postReducer } from 'modules/postModules/postReducer/postReducer'
import { createProfileReducer } from 'modules/profileModules/createProfile/createProfileReducer'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[createProfileApi.reducerPath]: createProfileApi.reducer,
	[uploadImageApi.reducerPath]: uploadImageApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
	uploadImage: uploadImageReducer,
	createProfileReducer: createProfileReducer,
	app: appReducer,
	authReducer: authReducer,
	postReducer: postReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware()
			.concat(authApi.middleware)
			.concat(createProfileApi.middleware)
			.concat(uploadImageApi.middleware)
			.concat(postApi.middleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

if (typeof window !== 'undefined') {
	//@ts-ignore
	window.store = store
}
