import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import { AnyAction, combineReducers } from 'redux'
import { appReducer } from '@/modules/appModules/appReducer'
import { authReducer } from '@/modules/authModules/authReducer/authReducer'
import { authApi } from '@/modules/authModules'
import { createProfileApi } from '@/modules/profileModules/profileSettingsModule/createProfile/createProfileApi'
import { uploadImageApi } from '@/modules/profileModules/profileSettingsModule/uploadImage/uploadImageApi'
import { uploadImageReducer } from '@/modules/profileModules/uploadImage/uploadImageReducer'
import { postApi } from '@/modules/postModules/postApi/postApi'
import { profileApi } from '@/modules/profileModules/profileApi/profileApi'
import { postReducer } from '@/modules/postModules/postReducer/postReducer'
import { createProfileReducer } from '@/modules/profileModules/profileSettingsModule/createProfile/createProfileReducer'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[createProfileApi.reducerPath]: createProfileApi.reducer,
	[uploadImageApi.reducerPath]: uploadImageApi.reducer,
	[postApi.reducerPath]: postApi.reducer,
	[profileApi.reducerPath]: profileApi.reducer,
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
			.concat(profileApi.middleware)
			.concat(postApi.middleware)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

