import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            image: "",
            type: "Customer",
            redirect: false
        };
    }

    validateForm() {
        return (
            this.state.fullName.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.confirmPassword
        );
    }

    handleNameChange = event => {
      this.setState({
          fullName: event.target.value
      });
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    handlePasswordChange = event => {
        this.setState({
            password: event.target.value
        });
    };

    handleConfirmPasswordChange = event => {
        this.setState({
            confirmPassword: event.target.value
        });
    };

    handleImageChange = event => {
        this.setState({
            image: event.target.value
        });
    };

    handleTypeChange = event => {
        this.setState({
            type: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        console.log(this.state.type);
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Register</legend>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="fullName">Full Name</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="fullName"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={this.state.fullName}
                                        onChange={this.handleNameChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
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
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="passwordInput">Password</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="password"
                                        id="passwordInput"
                                        className="form-control"
                                        placeholder="Password"
                                        value={this.state.password}
                                        onChange={this.handlePasswordChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="repeatInput">Repeat Password</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="password"
                                        id="repeatInput"
                                        className="form-control"
                                        placeholder="Repeat Password"
                                        value={this.state.confirmPassword}
                                        onChange={this.handleConfirmPasswordChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="imageInput">Profile Image</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="file"
                                        id="imageInput"
                                        className="form-control"
                                        value={this.state.image}
                                        onChange={this.handleImageChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label">User type</label>
                                <Col xs={2} sm={2} md={2} lg={2}>
                                    <input
                                        checked={this.state.type === 'Customer'}
                                        name="type"
                                        type="radio"
                                        value="Customer"
                                        onClick={this.handleTypeChange}
                                    /> Customer</Col>
                                <Col xs={5} sm={5} md={5} lg={5} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
                                    <input
                                        checked={this.state.type === 'Owner'}
                                        name="type"
                                        type="radio"
                                        value="Owner"
                                        onClick={this.handleTypeChange}
                                    /> Company/Store Owner
                                </Col>
                            </div>
                            <Col xs={1} sm={1} md={1} lg={1} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Register
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}