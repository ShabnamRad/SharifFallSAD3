import React from 'react';
import Col from "react-bootstrap/lib/Col";

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            item: "",
            comment_text: ""
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({
            item: nextProps.item
        });
    }

    validateForm() {
        return this.state.comment_text.length > 0;
    }

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        } else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleCommentChange = event => {
        this.setState(
            {
                comment_text: event.target.value
            }
        );
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log("comment sent: " + this.state.comment_text);
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/items/rate/', {
            method: "POST",
            body: JSON.stringify({
                score: 3,
                comment: that.state.comment_text,
                user: 2,
                item: that.state.item.code
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function (response) {
            return response.text();
        }, function (error) {
            console.log(error.message); //=> String
        });
    };

    render() {
        return (
            <div className="well bs-component">
                <form className="form-horizontal" onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Your Opinion</legend>
                        <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                            <Col xs={12} sm={12} md={12} lg={12}>
                                    <textarea autoFocus
                                              name="comment"
                                              id="commentText"
                                              className="form-control"
                                              placeholder="write your comment on this item, here"
                                              value={this.state.comment_text}
                                              onChange={this.handleCommentChange}
                                    /></Col>
                        </div>
                        <Col xs={1} sm={1} md={1} lg={1}>
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
        );
    }
}

export default CommentForm;