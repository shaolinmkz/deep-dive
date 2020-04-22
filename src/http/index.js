import axios from 'axios'

export default (method = 'get', path = '/posts', requestObject = {}) => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    return axios[method](`${BASE_URL}${path}`, {
    body: requestObject,
  })
}

// Ignore this line -> Just an error logger being exported for use
const { error } = console;
export const errorLogger = error;
