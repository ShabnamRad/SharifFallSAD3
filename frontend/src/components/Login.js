import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

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
        event.preventDefault();
    };

    render() {
        return (
            <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Login</legend>
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