import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listJob: null || []
}

const listJobSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setListJob: (state, { payload }) => {
            state.listJob = payload
        },

    },
})

export const listJobAction = listJobSlice.actions
export default listJobSlice