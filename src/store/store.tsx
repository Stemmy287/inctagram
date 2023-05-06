import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { authApi } from '@/modules/authModules/api/auth.api'

const rootReducer = combineReducers({
	[authApi.reducerPath]: authApi.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(authApi.middleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
