import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    detailOfTypeJob: null || []
}

const detailTypeJobSlice = createSlice({
    name: 'detailOfListJob',
    initialState,
    reducers: {
        setDetailOfTypeJob: (state, { payload }) => {
            state.detailOfTypeJob = payload
        }
    }
})
export const detailOfListJobAction = detailTypeJobSlice.actions
export default detailTypeJobSlice