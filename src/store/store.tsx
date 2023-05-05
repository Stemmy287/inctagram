import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";
import { api } from '@/common/api/common.api'

const rootReducer = combineReducers({
	[api.reducerPath]: api.reducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

