import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';
import {Redirect} from "react-router-dom";

$('input.className').change(function() {

});

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            redirect:false,
        };
    }

    validateForm() {
        return this.state.email.length > 0;
    }

    handleKeyUp = event => {
        if (event.target.value.length){
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    handleSubmit = event => {
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/password/reset/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function(response) {
            that.setState({
                login_response: response
            });
            return response.text();
        }, function(error) {
            console.log(error.message); //=> String
        });
        this.setState({
            redirect: true
        });
        event.preventDefault();
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Forget Password</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="inputEmail">Email</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
                                    /></Col>
                            </div>
                            <Col xs={1} sm={1} md={1} lg={1} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Reset Password
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}