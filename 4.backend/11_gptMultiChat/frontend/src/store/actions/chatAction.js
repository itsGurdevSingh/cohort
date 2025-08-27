import axios from "../../api/axiosConfig"
import { loadChat } from "../reducers/chatSlice"


export const getChatsAction = () => async (dispatchEvent) => {


    const res = await axios.get('/message')

    dispatchEvent(loadChat(res))

}

