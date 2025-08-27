import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "./reducers/chatSlice";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
    reducer: {
        chat: chatSlice,
        auth: authSlice
    },

})