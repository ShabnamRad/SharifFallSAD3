import React from 'react';
import Header from '../components/Header'
import HomePage from '../components/HomePage'
import Login from "../components/Login";
import Register from "../components/Register";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';

const AppRouter = () => (
    <BrowserRouter>
        <Grid style={{width: '100%'}}>
            <Row><Header/></Row>
            <Row><Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
            </Switch></Row>
        </Grid>
    </BrowserRouter>
);

export default AppRouter;