import { useReducer } from 'react';
import { GET_POSTS, EDIT_POSTS } from '../actionTypes/posts';


const initialState = {
    posts: [],
}

const postReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch(type) {
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
