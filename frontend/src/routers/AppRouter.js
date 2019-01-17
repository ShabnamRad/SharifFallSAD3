import React from 'react';
import Header from '../components/Header'
import HomePage from '../components/HomePage'
import Login from "../components/Login";
import Register from "../components/Register";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import AddItem from "../components/AddItem";
import SearchResults from "../components/SearchResults";
import ForgetPassword from "../components/ForgetPassword"

const AppRouter = () => (
    <BrowserRouter>
        <Grid style={{width: '100%', backgroundImage: "url(http://localhost:8080/images/bg.png)", backgroundSize: "cover", minHeight: "100vh"}}>
            <Row><Header/></Row>
            <Row><Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/addItem" component={AddItem}/>
                <Route path="/results" component={SearchResults}/>
                <Route path="/forgetPassword" component={ForgetPassword}/>
            </Switch></Row>
        </Grid>
    </BrowserRouter>
);

export default AppRouter;
