import React, {Component} from 'react';
import {NavLink, Link} from 'react-router-dom';
// import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import Grid from 'react-bootstrap/lib/Grid';
import axios from "axios";

export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            logged_in: false,
            name: ""
        }
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        axios.defaults.headers.common = {'Authorization': 'Token ' + sessionStorage.getItem('token')};
        const that = this;
        axios.get('http://127.0.0.1:8000/api/v1/accounts/current_user')
            .then(response => {
                if (response.status === 200) {
                    that.setState({
                        logged_in: true
                    });
                } else {
                    that.setState({
                        logged_in: false
                    });
                }
                return response;
            }).catch(error => {
            console.log(error.message);
            that.setState({
                logged_in: false
            });
        });
    }

    render() {
        return (
            <div className='navbar navbar-default col-lg-12 col-md-12 col-sm-12 col-xs-12' style={{marginBottom: 0}}>
                <Grid>
                    <Link to={"/"} className='navbar-header'>
                        <a href="../" className='navbar-brand'>SHAP</a>
                        <button className="navbar-toggle collapsed" type="button" data-toggle="collapse"
                                data-target="#navbar-main" aria-expanded="false">
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                            <span className="icon-bar"> </span>
                        </button>
                    </Link>
                    <div className='navbar-collapse collapse' id="navbar-main" aria-expanded="false"
                         style={{height: "1px"}}>
                        <ul className='nav navbar-nav'>
                            <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
                            {!this.state.logged_in &&
                            <li><NavLink to="/login" activeClassName="is-active">Login</NavLink></li>}
                            {!this.state.logged_in &&
                            <li><NavLink to="/register" activeClassName="is-active">Register</NavLink></li>}
                            {!this.state.logged_in &&
                            <li><NavLink to="/forgetPassword" activeClassName="is-active">Forget Password</NavLink>
                            </li>}
                            {this.state.logged_in &&
                            <li><NavLink to="/account/current_user" activeClassName="is-active">Profile</NavLink></li>}
                            {this.state.logged_in &&
                            <li><NavLink to="/logout" activeClassName="is-active">Logout</NavLink></li>}
                        </ul>
                    </div>
                </Grid>
            </div>);
    }
}
