import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';

$('input.className').change(function() {

});

export default class ForgetPassword extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            emailSent: false,
            showError: false,
            error: "Could not reset password!"
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
        event.preventDefault();
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/password/reset/', {
            method: "POST",
            body: JSON.stringify({
                email: that.state.email
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function (response) {
            if (response.status === 200) {
                that.setState({
                    addItemDone: true,
                    login_response: response
                })
            } else {
                that.setState({
                    showError: true,
                    error: response.statusText + "!"
                })
            }
            return response.text();
        }, function (error) {
            that.setState({
                showError: true,
                error: error.message()
            })
        });
    };

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    {this.state.emailSent && <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        A link was sent to your email successfully!
                    </div>}
                    {this.state.showError && <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Error! </strong>{this.state.error}</div>}
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