import { combineReducers } from 'redux';
import projectReducer from './projectReducer';
import contentReducer from './contentReducer';

export default combineReducers({
    projects: projectReducer,
    contents: contentReducer
})