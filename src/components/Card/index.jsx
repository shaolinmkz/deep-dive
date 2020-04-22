import React, { useState } from 'react';
import { editPost, deletePost } from '../../store/actions/postAction';
import { useAppStore } from '../../store/context';
import './index.scss';

export default ({ userId, id, title, body }) => {
    const [isEdit, setIsEdit] = useState(false);
    const [init, setInit] = useState({ id, title, body, userId });
    const [modified, setModified] = useState({ id, title, body, userId });
    const { dispatch } = useAppStore().postReducer;


    const handleChange = ({ target: { name, value }}) => {
        setModified(prevModified => ({ ...prevModified, [name]: value }))
    }
    const handleSave = () => {
        setInit(modified); // accelerate edit prior to when editPost action is finishes
        setIsEdit(false);
        editPost(dispatch, id, modified);
    }

    const handleCancel = () => {
        setModified(init);
        setIsEdit(false);
    }

    const handleDelete = () => {
        if(window.confirm('Are you sure?')) {
            dispatch({ type: 'DELETE_POST', payload: { id } }); // accelerate delete prior to when deletePost action is finishes
            deletePost(dispatch, id);
        }
    }

    return (
    <div id={id} className="card-container">
        {
           isEdit
           ? (<div className="card-content">
                <input type="text" onChange={handleChange} name="title" value={modified.title} />
                <textarea type="text" onChange={handleChange} name="body" value={modified.body} />
               </div>)
            : (<div className="card-content">
                <h2>{init.title}</h2>
                <p>{init.body}</p>
              </div>)
        }
        <div className="button-container">
            <button onClick={isEdit ? handleSave : () => setIsEdit(true)} type="button">{isEdit ? 'Save' : 'Edit'}</button>
            {!isEdit && (<button onClick={handleDelete} type="button">Delete</button>)}
            {isEdit && <button onClick={handleCancel} type="button">Cancel</button>}
        </div>
    </div>
   )
};
