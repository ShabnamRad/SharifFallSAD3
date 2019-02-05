import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class Logout extends Component {

    componentWillMount() {
        sessionStorage.clear();
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/logout/', {
            method: "POST",
            body: "",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(response => {
            if(response.status !== 200)
                throw new Error(response.statusText);
            return response.text();
        }, function (error) {
            that.setState({
                showError: true,
                error: error.message()
            });
        })
    }

    render () {
        return <Redirect push to="/"/>;
    }
}