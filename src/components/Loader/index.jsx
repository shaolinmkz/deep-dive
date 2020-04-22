import React from 'react';
import imageLoader from '../../assets/loader.gif';
import './index.scss';

export default () => (
    <div className="loader-container">
        <img src={imageLoader} alt="loader" />
    </div>
);
