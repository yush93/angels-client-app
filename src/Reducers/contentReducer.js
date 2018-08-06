import { FETCH_CONTENTS, NEW_CONTENT, FETCH_CONTENT, EDIT_CONTENT, DELETE_CONTENT } from '../Actions/types';

const initialState = {
    items: [],
    item: {},
    gitem: {}
}

export default function (state = initialState, action) {
    switch(action.type) {
        case FETCH_CONTENTS:
            return {
                ...state,
                items: action.payload
            }
        case NEW_CONTENT:
            return {
                ...state,
                item: action.payload
            }
        case FETCH_CONTENT:
            return {
                ...state,
                gitem: action.payload
            }
        case EDIT_CONTENT:
            return {
                ...state,
                gitem: action.payload
            }
        case DELETE_CONTENT:
            return {
                ...state,
                gitem: true
            }
        default:
            return state;
    }
}

