import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { getMenuJob } from '../apis/apiMenuJob'
import menuJobSlice from './slices/menuJob.slice'

const rootReducer = combineReducers({
    menuJob : menuJobSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch