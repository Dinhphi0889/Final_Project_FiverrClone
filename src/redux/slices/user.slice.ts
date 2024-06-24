import { createSlice} from "@reduxjs/toolkit";


const getUserLocal = localStorage.getItem('user')
const initialState = {
    currentUser: getUserLocal ? JSON.parse(getUserLocal) : null
};
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: (state, { payload }) => {
            state.currentUser = payload
        }
    },
})
export const { setCurrentUser } = userSlice.actions
export default userSlice