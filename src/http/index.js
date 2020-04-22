import axios from 'axios'

export default (method = 'get', path = '/posts', requestObject = {}) => {
    const BASE_URL = 'https://jsonplaceholder.typicode.com';
    return axios[method](`${BASE_URL}${path}`, {
    body: requestObject,
  })
}

const { error, log } = console;

export const errorLogger = error;
export const Logger = log;
