import React from 'react';

const Comment = (props) => (
    <article className="comment">
        <div className="comment-header">
            <strong style={{paddingTop: '30px'}}>{props.comment[0]}</strong>
        </div>
        <div className="comment-content">{props.comment[2]} (rated the item with score {props.comment[1]})</div>
    </article>
);


export default Comment;