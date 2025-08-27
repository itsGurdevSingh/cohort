import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: '',
    isAuthenticated: false,
    loading: true
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        loadUser: (state, actions) => {
            console.log(actions.payload)
            state.currentUser = actions.payload
            state.isAuthenticated = true;
            state.loading = false
        },

        setLoading: (state, actions) => {
            state.loading = actions.payload;
        }

    }
})

export default authSlice.reducer;
export const { loadUser, setLoading } = authSlice.actions

