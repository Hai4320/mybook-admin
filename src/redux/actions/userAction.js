import {LOGIN, GET_USERS} from "../types"
import { login_URL, getUsers_URL, deleteUser_URL, sendMessage_URL} from "../apis"

export const LoginAdmin = (data) => async dispatch =>{
    try {
        const result = await fetch(login_URL, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        const datax = await result.json()
        if (result.status===200)
        {
            localStorage.setItem('islogin', true);
            localStorage.setItem('userData', JSON.stringify(datax.data));
            dispatch({
                type: LOGIN,
                payload: datax.data
            })
        }
        return {status: result.status, data: datax}
    } catch (error) {
        console.error(error);
    }
}
export const getAllUser = () => async dispatch =>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(getUsers_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
            })
        });
        const data = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_USERS,
                payload: data
            })
        }
    } catch (error) {
        console.log(error);
    }
}
export const deleteUser = (data) => async dispatch=>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(deleteUser_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userCall: user.id,
                userDel: data.id,
                password: data.password,
            })
        });
        const datax = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_USERS,
                payload: datax.users
            })
        }
        return {status: result.status, data: datax}
    } catch (error) {
        console.log(error);
        return {};
    }
}
export const sendMessage = (data) => async dispatch=>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(sendMessage_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userADMIN: user.id,
                userID: data.id,
                password: data.password,
                message: data.message
            })
        });
        const datax = await result.json()
        return {status: result.status, data: datax}
    } catch (error) {
        console.log(error);
        return {};
    }
}