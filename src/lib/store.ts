import { combineReducers, configureStore } from '@reduxjs/toolkit'
import StateReducer from '../lib/feature/myState/stateSlice'
import AlertReducer from '../lib/feature/alert/alertSlice'

export const makeStore = () => {
    return configureStore({
        reducer: combineReducers({
            myState: StateReducer,
            alert: AlertReducer,
        }),
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']