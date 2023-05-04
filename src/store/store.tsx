import {combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import {AnyAction} from "redux";

const rootReducers = combineReducers({

})

export const store = configureStore({
  reducer: rootReducers
})

export type AppRootStateType = ReturnType<typeof rootReducers>
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AnyAction>
