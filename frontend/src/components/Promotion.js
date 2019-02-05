import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";
import $ from 'jquery';
import {Redirect} from "react-router-dom";

$('input.className').change(function() {

});

export default class Promotion extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: "",
            redirect:false,
        };
    }

    validateForm() {
        return this.state.item.length > 0;
    }

    handleKeyUp = event => {
        if (event.target.value.length){
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleItemChange = event => {
        this.setState({
            item: event.target.value
        });
    };

    handleSubmit = event => {
        const that = this;
        console.log(this.state);
        fetch('http://127.0.0.1:8000/api/v1/items/promote/', {
            method: "POST",
            body: JSON.stringify(this.state),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
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
        this.setState({
            redirect: true
        });
        event.preventDefault();
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Promote Item</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="inputItem">Item</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="item"
                                        id="inputItem"
                                        className="form-control"
                                        placeholder="Item ID"
                                        value={this.state.item}
                                        onChange={this.handleItemChange}
                                    /></Col>
                            </div>
                            <Col xs={1} sm={1} md={1} lg={1} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Submit Request
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}