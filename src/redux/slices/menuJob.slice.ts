import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menuJob: null
}

const menuJobSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuJob: (state, { payload }) => {
            state.menuJob = payload
        }
    },
})

export const { setMenuJob } = menuJobSlice.actions
export default menuJobSlice