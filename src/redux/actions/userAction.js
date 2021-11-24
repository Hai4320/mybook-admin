import {LOGIN, LOGOUT} from "../types"
import { login_URL } from "../apis"

export const Login = (data) => async dispatch =>{
    try {
        const result = await fetch(login_URL, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            }),
        });
        console.log(result.status);
        if (result.status===200){
            dispatch(LOGIN)
        }
    } catch (error) {
        
    }
}