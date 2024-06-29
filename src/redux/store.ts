import { combineReducers, configureStore } from '@reduxjs/toolkit'
import menuJobSlice from './slices/menuJob.slice'
import nameJobSlice from './slices/nameJob.slice'
import listJobSlice from './slices/listJob.slice'
import detailTypeJobSlice from './slices/detailOfTypeJob.slice'
import userSlice from './slices/user.slice'

const rootReducer = combineReducers({
    menuJob: menuJobSlice.reducer,
    nameJob: nameJobSlice.reducer,
    listJob: listJobSlice.reducer,
    detailOfListJob: detailTypeJobSlice.reducer,
    user: userSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare()
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch