import React, { useState } from 'react';
import { createPost } from '../../store/actions/postAction';
import { useAppStore } from '../../store/context';
import './index.scss';

export default ({ setModalOpen }) => {
    const [state, setState] = useState({
        title: '',
        body: '',
        userId: 1
      });
    const [creating, setCreating] = useState(false);

    const { dispatch } = useAppStore().postReducer;
    
      const handleChange = ({ target: { name, value } }) => {
        setState(prevState => ({ ...prevState, [name]: value }))
      }

      const handleSubmit = (event) => {
            event.preventDefault();
            setCreating(true);
            const createPromise = createPost(dispatch, state);
            Promise.all([createPromise])
            .then(() => {
                setCreating(false);
                setModalOpen(false);
            })
      }

      const handleCloseModal = ({ target: { id }}) => {
        if(id === 'create-post-modal') {
            setModalOpen(false);
        }
    }
      
    return (
        <section
            id="create-post-modal"
            onClick={handleCloseModal}
            className="create-post-modal">
            <form
               onSubmit={handleSubmit}>
                <input
                    placeholder="Post title"
                    required minLength="1"
                    maxLength="100"
                    type="text"
                    value={state.title}
                    name="title"
                    onChange={handleChange}
                />
                <textarea
                    placeholder="Post body"
                    required
                    minLength="1"
                    maxLength="250"
                    value={state.body}
                    name="body"
                    onChange={handleChange}
                />
                <div className="submit-btn-container">
                   <button type="submit" disabled={creating}>{creating ? 'Creating...' : 'Create'}</button>
                </div>
            </form>
        </section>
    )
}
