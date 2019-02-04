import React from 'react';
import Comment from './Comment';

const Comments = (props) => (
            <section className="">
                {
                    props.comments.map((comment, index) => {
                        return <Comment key={index} comment={comment} />
                    })
                }
            </section>
        );

export default Comments;