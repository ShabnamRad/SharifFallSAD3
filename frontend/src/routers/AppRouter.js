import React from 'react';
import Header from '../components/Header'
import HomePage from '../components/HomePage'
import Login from "../components/Login";
import Register from "../components/Register";
import {BrowserRouter, Route, Switch} from 'react-router-dom';

const AppRouter = () => (
    <BrowserRouter>
        <div className='container'>
            <Header />
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch>
        </div>
    </BrowserRouter>
);

export default AppRouter;