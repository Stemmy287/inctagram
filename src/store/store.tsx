import { ThunkDispatch, configureStore } from "@reduxjs/toolkit";
import { AnyAction, combineReducers } from "redux";

const rootReducer = combineReducers({})

export const store = configureStore({
	reducer: rootReducer,
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>

