import { createSlice } from "@reduxjs/toolkit";


const getUserLocal = localStorage.getItem('user')

const initialState = {
    currentUser: getUserLocal ? JSON.parse(getUserLocal) : null
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }) => {
            const cloneUser = { ...payload }
            state.currentUser = cloneUser
        }
    },
})
export const currentUserAction = userSlice.actions
export default userSlice