import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { appReducer } from '@/modules/appModules/appReducer'
import { authReducer } from '@/modules/authModules/authReducer/authReducer'
import { authApi } from '@/modules/authModules'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer,
	app: appReducer,
	authReducer: authReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

if (typeof window !== "undefined") {
	//@ts-ignore
	window.store = store;
}