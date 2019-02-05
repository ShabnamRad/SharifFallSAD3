import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            first_name: "",
            last_name: "",
            email: "",
            password1: "",
            password2: "",
            image: "",
            type: "Customer",
            contactInfo: "",
            propertyName: "",
            propertyDesc: "",
            regID: "",
            propType: "Company",
            storeLocation: "",
            storeWH: "",
            redirect: false
        };
    }

    validateForm() {
        const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        return (
            this.state.first_name.length > 0 &&
            this.state.last_name.length > 0 &&
            this.state.email.length > 0 &&
            emailReg.test(this.state.email) &&
            this.state.password1.length > 0 &&
            this.state.password1 === this.state.password2 &&
            (this.state.type === "Customer" || (
                this.state.contactInfo.length > 0 &&
                this.state.propertyName.length > 0 &&
                this.state.propertyDesc.length > 0 &&
                this.state.regID.length > 0 &&
                (this.state.propType === "Company" || (
                    this.state.storeLocation.length > 0 &&
                    this.state.storeWH.length > 0
                ))
            ))
        );
    }

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
        if (event.target.id === 'repeatInput' && this.state.password1 !== this.state.password2)
            event.currentTarget.setAttribute('class', 'form-group has-error');
        const emailReg = /[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,3}$/;
        if (event.target.id === 'inputEmail' && !emailReg.test(event.target.value))
            event.currentTarget.setAttribute('class', 'form-group has-error');
    };

    handleFirstNameChange = event => {
        this.setState({
            first_name: event.target.value
        });
    };

    handleLastNameChange = event => {
        this.setState({
            last_name: event.target.value
        });
    }

    handleUsernameChange = event => {
        this.setState({
            username: event.target.value
        });
    };

    handleEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    handlePasswordChange = event => {
        this.setState({
            password1: event.target.value
        });
    };

    handleConfirmPasswordChange = event => {
        this.setState({
            password2: event.target.value
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

    handleContactInfoChange = event => {
        this.setState({
            contactInfo: event.target.value
        });
    };

    handlePropNameChange = event => {
        this.setState({
            propertyName: event.target.value
        });
    };

    handlePropDescChange = event => {
        this.setState({
            propertyDesc: event.target.value
        });
    };

    handleRegIDChange = event => {
        this.setState({
            regID: event.target.value
        });
    };

    handlePropTypeChange = event => {
        this.setState({
            propType: event.target.value
        });
    };

    handleStoreLocationChange = event => {
        this.setState({
            storeLocation: event.target.value
        });
    };

    handleStoreWHChange = event => {
        this.setState({
            storeWH: event.target.value
        });
    };

    handleSubmit = event => {
        const that = this;
        console.log(this.state);
        console.log(JSON.stringify(this.state));
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/registration/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
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
        event.preventDefault();
        event.preventDefault();
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}  style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Register</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="first_name">First
                                    Name</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="first_name"
                                        className="form-control"
                                        placeholder="First Name"
                                        value={this.state.first_name}
                                        onChange={this.handleFirstNameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="last_name">Last
                                    Name</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="last_name"
                                        className="form-control"
                                        placeholder="Last Name"
                                        value={this.state.last_name}
                                        onChange={this.handleLastNameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="username">Username</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="username"
                                        className="form-control"
                                        placeholder="username"
                                        value={this.state.username}
                                        onChange={this.handleUsernameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="inputEmail">Email</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="email"
                                        id="inputEmail"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.email}
                                        onChange={this.handleEmailChange}
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
                                        value={this.state.password1}
                                        onChange={this.handlePasswordChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="repeatInput">Repeat Password</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="password"
                                        id="repeatInput"
                                        className="form-control"
                                        placeholder="Repeat Password"
                                        value={this.state.password2}
                                        onChange={this.handleConfirmPasswordChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="imageInput">Profile Image</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="file"
                                        id="imageInput"
                                        className="form-control"
                                        value={this.state.image}
                                        onChange={this.handleImageChange}
                                    /></Col>
                            </div>
                            <div className="form-group">
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label">User type</label>
                                <Col xs={3} sm={3} md={2} lg={2}>
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
                            {
                                this.state.type === 'Owner' && <div>
                                    <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                        <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                               htmlFor="contactInfo">Contact Info</label>
                                        <Col xs={10} sm={9} md={8} lg={8}>
                                            <input
                                                type="text"
                                                id="contactInfo"
                                                className="form-control"
                                                placeholder="Contact Info"
                                                value={this.state.contactInfo}
                                                onChange={this.handleContactInfoChange}
                                            /></Col>
                                    </div>
                                    <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                        <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                               htmlFor="propertyName">Property Name</label>
                                        <Col xs={10} sm={9} md={8} lg={8}>
                                            <input
                                                type="text"
                                                id="propertyName"
                                                className="form-control"
                                                placeholder="Property Name"
                                                value={this.state.propertyName}
                                                onChange={this.handlePropNameChange}
                                            /></Col>
                                    </div>
                                    <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                        <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                               htmlFor="propertyDesc">Property Description</label>
                                        <Col xs={10} sm={9} md={8} lg={8}>
                                            <input
                                                type="text"
                                                id="propertyDesc"
                                                className="form-control"
                                                placeholder="Property Description"
                                                value={this.state.propertyDesc}
                                                onChange={this.handlePropDescChange}
                                            /></Col>
                                    </div>
                                    <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                        <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                               htmlFor="regIDInput">Registration ID</label>
                                        <Col xs={10} sm={9} md={8} lg={8}>
                                            <input
                                                type="text"
                                                id="regIDInput"
                                                className="form-control"
                                                placeholder="Registration ID"
                                                value={this.state.regID}
                                                onChange={this.handleRegIDChange}
                                            /></Col>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label">Property type</label>
                                        <Col xs={3} sm={3} md={2} lg={2}>
                                            <input
                                                checked={this.state.propType === 'Company'}
                                                name="propType"
                                                type="radio"
                                                value="Company"
                                                onClick={this.handlePropTypeChange}
                                            /> Company</Col>
                                        <Col xs={5} sm={5} md={5} lg={5} xsOffset={1} smOffset={1} mdOffset={1} lgOffset={1}>
                                            <input
                                                checked={this.state.propType === 'Store'}
                                                name="propType"
                                                type="radio"
                                                value="Store"
                                                onClick={this.handlePropTypeChange}
                                            /> Store</Col>
                                    </div>
                                    {
                                        this.state.propType === "Store" && <div>
                                            <div className="form-group" onChange={this.handleKeyUp}
                                                 onKeyUp={this.handleKeyUp}>
                                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                                       htmlFor="storeLocation">Store Location</label>
                                                <Col xs={10} sm={9} md={8} lg={8}>
                                                    <input
                                                        type="text"
                                                        id="storeLocation"
                                                        className="form-control"
                                                        placeholder="Store Location"
                                                        value={this.state.storeLocation}
                                                        onChange={this.handleStoreLocationChange}
                                                    /></Col>
                                            </div>
                                            <div className="form-group" onChange={this.handleKeyUp}
                                                 onKeyUp={this.handleKeyUp}>
                                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                                       htmlFor="storeWH">Working Hours</label>
                                                <Col xs={10} sm={9} md={8} lg={8}>
                                                    <input
                                                        type="text"
                                                        id="storeWH"
                                                        className="form-control"
                                                        placeholder="Store Working Hours"
                                                        value={this.state.storeWH}
                                                        onChange={this.handleStoreWHChange}
                                                    /></Col>
                                            </div>
                                        </div>
                                    }
                                </div>
                            }
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
