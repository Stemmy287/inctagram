import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { authApi } from '@/modules/authModules/api/auth.api'
import { appReducer } from '@/modules/app/app.reducer'
import { authReducer } from '@/modules/authReducer/authReducer'

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