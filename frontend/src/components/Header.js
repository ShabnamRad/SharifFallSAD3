import React from 'react';
import {NavLink, Link} from 'react-router-dom';
// import { LoginLink, LogoutLink, Authenticated, NotAuthenticated } from 'react-stormpath';
import Grid from 'react-bootstrap/lib/Grid';

const Header = () => (
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
            <div className='navbar-collapse collapse' id="navbar-main" aria-expanded="false" style={{height: "1px"}}>
                <ul className='nav navbar-nav'>
                    <li><NavLink to="/" activeClassName="is-active" exact={true}>Home</NavLink></li>
                    {/*<NotAuthenticated>*/}
                        {/*<li>*/}
                            {/*<LoginLink />*/}
                        {/*</li>*/}
                    {/*</NotAuthenticated>*/}
                    <li><NavLink to="/login" activeClassName="is-active">Login</NavLink></li>
                    <li><NavLink to="/register" activeClassName="is-active">Register</NavLink></li>
                    <li><NavLink to="/forgetPassword" activeClassName="is-active">Forget Password</NavLink></li>
                    <li><NavLink to="/account/current_user" activeClassName="is-active">Profile</NavLink></li>
                    <li><NavLink to="/" activeClassName="is-active">Logout</NavLink></li>
                </ul>
            </div>
        </Grid>
    </div>
);

export default Header;
