import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';
import {Redirect} from "react-router-dom";
import axios from "axios";

$('input.className').change(function () {

});

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect: false,
            auth_key: "",
            showError: false,
            error: "Login Failed!"
        };
    }

    validateForm() {
        return this.state.username.length > 0 && this.state.password.length > 0;
    }

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        } else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handlePasswordChange = event => {
        this.setState(
            {
                password: event.target.value
            }
        );
    };

    handleSubmit = event => {
        event.preventDefault();
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
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
        if (this.state.redirect) {
            const that = this;
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    {this.state.showError && <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Error! </strong>{this.state.error}</div>}
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Login</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="inputUsername">Username</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="username"
                                        id="inputUsername"
                                        className="form-control"
                                        placeholder="Username"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="passwordInput">Password</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="password"
                                        id="passwordInput"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    /></Col>
                            </div>
                            <Col xs={1} sm={1} md={1} lg={1} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Login
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}