import { useReducer } from 'react';
import {
    CREATE_POST,
    GET_POSTS,
    EDIT_POSTS,
    DELETE_POST,
} from '../actionTypes/posts';


const initialState = {
    posts: [],
}

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
        case CREATE_POST:
            return {
                ...state,
                posts: state.posts.concat(payload),
            }
        case GET_POSTS:
            return {
                ...state,
                posts: payload
            }
        case EDIT_POSTS:
            return {
                ...state,
                posts: state.posts.map(post => post.id === payload.id ? payload : post),
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== payload.id),
            }
        default:
            return state;
    }
}

export default () => {
    const [state, dispatch] = useReducer(postReducer, initialState);
    return {
        state,
        dispatch,
    }
};
