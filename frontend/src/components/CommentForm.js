import React from 'react';
import {addComment} from "../actions/comments";
import Col from "./Login";

class CommentForm extends React.Component {

    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
    }

    addComment(e) {
        e.preventDefault();
        console.log(e.target.elements);
        // const comment = e.target.elements.rating.value.trim();
        // const name = e.target.elements.name.value.trim();
        //
        // if (name && comment) {
        //     const commentObject = {
        //         name: name,
        //         text: comment,
        //         articleID: this.props.articleID,
        //         date: moment().valueOf()
        //     };
        //
        //     this.props.dispatch(addComment(commentObject));
        //
        //     e.target.elements.rating.value = '';
        //     e.target.elements.name.value = '';
        // }
    }

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.addComment}>
                        <fieldset>
                            <legend>Your Opinion</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <textarea autoFocus
                                              name="comment"
                                              id="commentText"
                                              className="form-control"
                                              placeholder="write your comment on this item, here"/></Col>
                            </div>
                            <Col xs={1} sm={1} md={1} lg={1} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Send Comment
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}

export default CommentForm;