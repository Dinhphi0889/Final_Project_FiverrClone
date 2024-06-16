import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    nameJob: [],
    loading: true
}

const nameJobSlice = createSlice({
    name: 'nameJob',
    initialState,
    reducers: {
        setNameJob: (state, { payload }) => {
            state.nameJob = payload
            state.loading = false
        }
    },
})

export const nameJobAction = nameJobSlice.actions
export default nameJobSlice