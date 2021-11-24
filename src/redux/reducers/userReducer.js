
import {LOGIN, LOGOUT, GET_USERS} from "../types"


const INIT_STATE = {
   admin: {},
   users: [],
};

function userReducer(state = INIT_STATE, action) 
{
    switch (action.type) {
        case LOGIN:
            return {
                ...state, 
                admin: action.payload,
            };
        case GET_USERS:
            return {
                ...state, 
                users: action.payload,
            };    
        case LOGOUT:
            return {...state}

        default: 
            return state;
    }
}



export default userReducer;