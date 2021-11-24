import { combineReducers } from 'redux';
import userReducer from './userReducer'
import postReducer from './postReducer'
import bookReducer from './bookReducer'


export const reducer = combineReducers({userReducer, postReducer, bookReducer});