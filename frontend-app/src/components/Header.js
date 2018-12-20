import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => (
    <header>
        <Link to={"/"}>
            <h1 className='header'>SHAP</h1>
        </Link>
        <div className='navs-container'>
            <NavLink to="/" className='nav' activeClassName="is-active" exact={true}>Home</NavLink>
            <NavLink to="/login" className='nav' activeClassName="is-active">Login</NavLink>
            <NavLink to="/register" className='nav' activeClassName="is-active">Register</NavLink>
        </div>
    </header>
);

export default Header;