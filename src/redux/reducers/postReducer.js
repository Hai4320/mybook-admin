import {GET_POSTS} from "../types"
const INIT_STATE = {
    posts: [],
 };
 
 function postReducer(state = INIT_STATE, action) 
 {
     switch (action.type) {
         case GET_POSTS:
             return {
                 ...state, 
                 posts: action.payload,
             };    
         default: 
             return state;
     }
 }
 
 
 
 export default postReducer;