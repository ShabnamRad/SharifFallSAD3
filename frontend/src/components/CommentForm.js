import React from 'react';
import {addComment} from "../actions/comments";
import Col from "./Login";
import axios from "axios";

class CommentForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    addComment(e) {
        e.preventDefault();
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/items/rate', {
            method: "POST",
            body: JSON.stringify({
                //TODO
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(response => {
            if(response.status !== 200)
                throw new Error(response.statusText);
            return response.text();
        }, function (error) {
            that.setState({
                showError: true,
                error: error.message()
            });
        }).then(response => {
            const token = JSON.parse(response).token;
            console.log("setting token " + token);
            sessionStorage.setItem('token', token);
            axios.defaults.headers.common = {'Authorization': 'Token ' + sessionStorage.getItem('token')};
            that.setState({
                redirect: true
            });
            return response;
        }, function (error) {
            that.setState({
                showError: true,
                error: error.message()
            });
        })
    };

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