import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';

$('input.className').change(function() {

});

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        return this.state.email.length > 0 && this.state.password.length > 0 && emailReg.test(this.state.email);
    }

    handleKeyUp = event => {
        if (event.target.value.length){
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
        const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        if (event.target.id === 'inputEmail' && !emailReg.test(event.target.value))
            event.currentTarget.setAttribute('class', 'form-group has-error');
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
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
        fetch('http://localhost:8000/api/v1/accounts')
            .then(function(response) {
                return response.json();
            })
            .then(function(myJson) {
                console.log(JSON.stringify(myJson));
            });
        event.preventDefault();
    };

    render() {
        return (
            <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Login</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="inputEmail">Email</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
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