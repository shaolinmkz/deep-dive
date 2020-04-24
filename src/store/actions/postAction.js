import http, { errorLogger } from '../../http';
import {
    GET_POSTS,
    EDIT_POSTS,
    CREATE_POST,
    DELETE_POST,
} from '../actionTypes/posts';


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

export const createPost = async (dispatch, requestObject) => {
    try {
        const { data: { body, id } } = await http('post','/posts', requestObject);
        const action = { type: CREATE_POST, payload: { ...body, id, ...requestObject } };
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
        dispatch(action);
        return action;
    } catch (error) {
        errorLogger(error.message);
    }
}

export const deletePost = async (dispatch, id) => {
    try {
        const { data } = await http('delete', `/posts/${id}`);
        const action = { type: DELETE_POST, payload: { ...data, id } };
        dispatch(action);
        return action;
    } catch (error) {
        errorLogger(error.message);
    }
}
