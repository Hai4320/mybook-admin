import {GET_BOOKS} from "../types"
import { getBooks_URL, deleteBook_URL, addBook_URL, updateBook_URL } from "../apis"
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
export const deleteBook = (data) => async dispatch=>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(deleteBook_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                bookID: data.id,
                password: data.password,
            })
        });
        const datax = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_BOOKS,
                payload: datax.books
            })
        }
        return {status: result.status, data: datax}
    } catch (error) {
        console.log(error);
        return {};
    }
}
export const updateBook = (data) => async dispatch=>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(updateBook_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                bookID: data._id,
                Title: data.Title,
                Author: data.Author, 
                Description: data.Description, 
                Image: data.Image, 
                Audio: data.Audio, 
                Company: data.Company, 
                PDF: data.PDF, 
                Status: data.Status,
                PublishingCompany: data.PublishingCompany,
                Star: data.Star, 
                Type: data.Type,
            })
        });
        const datax = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_BOOKS,
                payload: datax.books
            })
        }
        return {status: result.status, data: datax}
    } catch (error) {
        console.log(error);
        return {};
    }
}
export const addBook = (data) => async dispatch=>{
    try {
        const user = JSON.parse(localStorage.getItem('userData'));
        console.log(user);
        const result = await fetch(addBook_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userID: user.id,
                Title: data.Title,
                Author: data.Author, 
                Description: data.Description, 
                Image: data.Image, 
                Audio: data.Audio, 
                Company: data.Company, 
                PDF: data.PDF, 
                Status: data.Status,
                PublishingCompany: data.PublishingCompany,
                Star: data.Star, 
                Type: data.Type,
            })
        });
        const datax = await result.json()
        if (result.status===200)
        {
            dispatch({
                type: GET_BOOKS,
                payload: datax.books
            })
        }
        return {status: result.status, data: datax}
    } catch (error) {
        console.log(error);
        return {};
    }
}