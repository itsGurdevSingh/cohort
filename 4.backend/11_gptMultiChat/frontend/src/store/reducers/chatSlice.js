import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeChatId:'',
    chats:[]
}

const chatSlice = createSlice({
    name:'chat',
    initialState,
    reducers:{
        loadChat:(state,actions)=>{
            state.chats.push(actions.payload);
        }
    }
})

export default chatSlice.reducer;
export const {loadChat} = chatSlice.actions;