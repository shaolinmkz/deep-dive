import http, { errorLogger } from '../../http';
import { GET_POSTS, EDIT_POSTS } from '../actionTypes/posts';


export const fetchPosts = async (dispatch) => {
    try {
        const { data } = await http();
        const action = { type: GET_POSTS, payload: data };
        dispatch(action);
        return action;
    } catch (error) {
        errorLogger(error.message);
    }
}

export const editPost = async (dispatch, id, requestObject) => {
    try {
        const { data: { body } } = await http('put', `/posts/${id}`, requestObject);
        const action = { type: EDIT_POSTS, payload: body };
        console.log(body)
        dispatch(action);
        return action;
    } catch (error) {
        errorLogger(error.message);
    }
}
