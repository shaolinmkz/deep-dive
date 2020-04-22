import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../../store/actions/postAction';
import { useAppStore } from '../../store/context';
import Card from '../../components/Card';
import Loader from '../../components/Loader';
import CreatePost from '../../components/CreatePost';
import './index.scss';


export default () => {
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const { dispatch, state: { posts } } = useAppStore().postReducer;

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
              posts.map(({
                  body,
                  id,
                  title,
                  userId,
                }) => (<Card
                        key={id}
                        id={id}
                        title={title}
                        body={body}
                        userId={userId}
                      />)).reverse()}
        </section>
    )
}