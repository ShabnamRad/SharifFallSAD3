import React from 'react';

const Comment = (props) => (
    <article className="comment">
        <div className="comment-header">
            <img className='logo' src={props.rating.user.image} alt="Avatar"/>
            <strong style={{paddingTop: '30px'}}>{props.rating.user.name}</strong>
        </div>
        <div className="comment-content">{props.rating.rating}</div>
    </article>
);


export default Comment;