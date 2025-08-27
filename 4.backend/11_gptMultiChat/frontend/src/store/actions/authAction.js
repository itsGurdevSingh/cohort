import axios from "../../api/axiosConfig"
import { loadUser, setLoading } from "../reducers/authSlice"


export const registerUserAction = (userData) => async (dispatchEvent) => {

    try {
        dispatchEvent(setLoading(true))

        const res = await axios.post('/auth/register', userData, { withCredentials: true })

        const user = res.data?.user

        localStorage.setItem('userId', user._id)

        dispatchEvent(loadUser(user))
    } catch (error) {

        console.log(error.message)

    }
}
export const loginUserAction = (userData) => async (dispatchEvent) => {

    try {
        dispatchEvent(setLoading(true))

        const res = await axios.post('/auth/login', userData, { withCredentials: true })

        const user = res.data?.user

        dispatchEvent(loadUser(user))
    } catch (error) {

        console.log(error.message)

    }
}
export const isUserLoginAction = () => async (dispatchEvent) => {

    try {

        dispatchEvent(setLoading(true))
        const res = await axios.get('/auth/verify', { withCredentials: true })

        console.log('verify res :', res)

        const user = res.data?.user

        dispatchEvent(loadUser(user))

    } catch (error) {
        dispatchEvent(setLoading(false));
        console.log(error)

    }
}


