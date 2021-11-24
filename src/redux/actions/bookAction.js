import {GET_BOOKS} from "../types"
import { getBooks_URL } from "../apis"
export const getAllBook = () => async dispatch =>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(getBooks_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_BOOKS,
                payload: data
            })
        }
    } catch (error) {
        console.log(error);
    }
}