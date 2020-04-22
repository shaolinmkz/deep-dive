import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../store/actions/postAction';
import { useAppStore } from '../../store/context';
import Card from '../../components/Card';
import Loader from '../../components/Loader';


export default () => {
    const [loading, setLoading] = useState(true);
    const { dispatch, state: { posts } } = useAppStore().postReducer;

    useEffect(() => {
      const promise = fetchPosts(dispatch);
      Promise.all([promise])
      .then(() => {
        setLoading(false);
      }).catch(err => err);
    }, [dispatch]);

    return (
        <>
          {loading ?
              <Loader /> : 
              posts.map(({ body, id, title, userId, }) => (
              <Card
                key={id}
                id={id}
                title={title}
                body={body}
                userId={userId}
                />))}
        </>
    )
}