import {GET_POSTS} from "../types"
import { getPosts_URL } from "../apis"
export const getAllPost = () => async dispatch =>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(getPosts_URL, {
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
                type: GET_POSTS,
                payload: data
            })
        }
    } catch (error) {
        console.log(error);
    }
}