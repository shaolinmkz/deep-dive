![](https://res.cloudinary.com/shaolinmkz/image/upload/v1587312364/Blogs/React%20Context-API/Screen_Shot_2020-04-19_at_3.19.01_PM.png)
# Deep Dive
Deep Dive is a simple example that shows you how to structure your React application to have the `React-Redux` work flow using `React context API` & `Hooks` (No state management tool needed).

The essence is to show you how flexible React is by enabling you combine multiple reducer hooks into an App-Store then create a custom hook that enables you access the store.
I used [JSON place holder](https://jsonplaceholder.typicode.com/guide.html), to mimick a RESTful API, but you can use any API and explore more possibilities of the flexibility of REACT.

## Structured to implement
- Create
- Read
- Update
- Delete

## Installation
After you cloning `cd deep-dive` and run `npm install`

## Flow Description
![](https://res.cloudinary.com/shaolinmkz/image/upload/v1587312369/Blogs/React%20Context-API/Screen_Shot_2020-04-19_at_5.02.29_PM.png)

# Basic Setup
I will assume you have [NodeJs](https://nodejs.org/en/download) installed on your local machine and you have your preferred [text editor](https://code.visualstudio.com) installed.

* Run the command on your terminal (The Angle brackets are placeHolders)

`npx create-react-app <insert-your-apps-name>`

 **E.g** `npx create-react-app deep-dive`

* When if finished `cd` into the app directory, install `node-sass` and start the app. (The `&&` sign is used to chain series of commands you will like to run)

`cd <app-directory> && npm install node-sass -D && npm install axios && npm start`

 **E.g** `cd deep-dive && npm install node-sass -D && npm install axios && npm start`

### Context/index.jsx
- Create the application context to manage the whole applications state
```
    import React, { createContext, useContext } from 'react';
    import rootReducer from '../Reducers/rootReducer';

    const AppContext = createContext();

    export const useAppStore = () => useContext(AppContext);

    const AppContextTheme = ({ children }) => (
        <AppContext.Provider
            value={{ store: rootReducer() }}>
                {children}
        </AppContext.Provider>);

    export default AppContext;
```

### App.js
- Wrap the app with the App context
```
    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';
    import App from './App';
    import * as serviceWorker from './serviceWorker';
    import AppContextTheme from './store/context';

    ReactDOM.render(
    <React.StrictMode>
        <AppContextTheme>
        <App />
        </AppContextTheme>
    </React.StrictMode>,
    document.getElementById('root')
    );
```

### reducer/postReducer.js
The reducer be structured this way:
Notice we are exporting a function that returns the `state` and `dispatch` of the `useReducer` hook.

```
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
```

### reducer/index.js
This forms the root reducers, several reducer can be added here.
Remember you are importing the exported function that returns the state and dispatch of that paticular(postReducer) reducer and then invoking it.

```
import postReducer from './postReducer';

export default () => ({
    postReducer: postReducer(),
});
```

### actions/postAction.js
Notice we are parsing a dispatch as an argument which will be acquired from the app-store

```
import http, { errorLogger } from '../../http';
import { GET_POSTS } from '../actionTypes/posts';


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
```

### views/Posts.jsx
Notice how the useAppStore hook is used to extract the `state` and `dispatch` from the postReducer
You can add several reducers to the store and access them this way.

*extracts*
`const { dispatch, state: { posts } } = useAppStore().postReducer;`

*Same as above*
`const { postReducer } = useAppStore();`
`const { dispatch, state: { posts } } = postReducer;`

*Same as above*
`const reducerCollection = useAppStore();`
`const postReducer = reducerCollection.postReducer;`
`const dispatch = postReducer.dispatch`
`const posts = postReducer.state.posts;`

```
import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../store/actions/postAction';
import { useAppStore } from '../../store/context'; // <== import useAppStore hook <==
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import CreatePost from '../../components/CreatePost';
import './index.scss';


export default () => {
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { dispatch, state: { posts } } = useAppStore().postReducer; // <== useAppStore hook usaged <==

    useEffect(() => {
      const promise = fetchPosts(dispatch);
      Promise.all([promise])
      .then(() => {
        setLoading(false);
      }).catch(err => err);
    }, [dispatch]);

    return (
        <section>
            {!loading && <div className="btn-container">
                <button type="button" onClick={() => setModalOpen(true)}>Create Post</button>
            </div>}

          {modalOpen && <CreatePost setModalOpen={setModalOpen} />}
        
          {loading ? <Loader /> : 
              posts.map(({ body, id, title, userId, }) => (
                  <Card
                    key={id}
                    id={id}
                    title={title}
                    body={body}
                    userId={userId}
                    />)).reverse()}
        </section>
    )
}
```
Explore the code base and try buiding an app with the custom App store leveraging on the power of hooks.
