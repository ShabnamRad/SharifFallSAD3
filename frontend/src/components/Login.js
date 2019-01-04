import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';
import {Redirect} from "react-router-dom";

$('input.className').change(function() {

});

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            redirect:false,
            auth_key: "",
            login_response: ""
        };
    }

    validateForm() {
        //const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        return this.state.username.length > 0 && this.state.password.length > 0; //&& emailReg.test(this.state.username);
    }

    handleKeyUp = event => {
        if (event.target.value.length){
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
        //const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        if (event.target.id === 'inputUsername' && event.target.value.length > 0)
            event.currentTarget.setAttribute('class', 'form-group has-error');
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
        const that = this;
        console.log(this.state);
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function(response) {
            console.log((response));
            console.log(response.status);     //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers);    //=> Headers
            console.log(response.url);        //=> String
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
            <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Login</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="inputUsername">Username</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
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
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="passwordInput">Password</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
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