import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { appReducer } from '@/modules/appModules/appReducer'
import { authReducer } from '@/modules/authModules/authReducer/authReducer'
import { authApi } from '@/modules/authModules'
import { api } from '@/modules/authModules/authApi/api'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	[api.reducerPath]: api.reducer,
	app: appReducer,
	authReducer: authReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware).concat(api.middleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

if (typeof window !== "undefined") {
	//@ts-ignore
	window.store = store;
}