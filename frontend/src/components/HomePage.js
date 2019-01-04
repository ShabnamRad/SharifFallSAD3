import React, {Component} from 'react';
import Col from "react-bootstrap/lib/Col";
import {Redirect} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            redirect: false,
            redirectToAddItem: false
        };
    }

    validateForm() {
        return this.state.searchInput.length > 0
    }

    handleSearchInputChange = event => {
        this.setState({
            searchInput: event.target.value
        });
    };

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            redirect: true
        })
    };

    handleAddItem = event => {
        event.preventDefault();
        this.setState({
            redirectToAddItem: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        if (this.state.redirectToAddItem) {
            return <Redirect push to="/addItem"/>
        }
        return (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "25vh 0"}}>
                <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}>
                    <div className="well bs-component">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Search Item Or Barcode</legend>
                                <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                    <label className="col-xs-1 col-sm-1 col-lg-1 col-xl-1"><img src="http://localhost:8080/search-icon.png" alt="search icon"
                                                style={{width: "40px", height: "40px", marginLeft: "20px"}}/></label>
                                    <Col xs={9} sm={9} md={9} lg={9}>
                                        <input
                                            autoFocus
                                            type="text"
                                            id="searchInput"
                                            className="form-control"
                                            placeholder="What item are you looking for?"
                                            value={this.state.searchInput}
                                            onChange={this.handleSearchInputChange}
                                        />
                                    </Col>
                                    <button
                                        className='btn btn-primary col-xs-1 col-sm-1 col-md-1 col-lg-1'
                                        disabled={!this.validateForm()}
                                        type="submit"
                                    >Search
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <button
                        className='btn btn-default col-xs-offset-4 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 col-xs-4 col-sm-4 col-md-4 col-lg-4'
                        onClick={this.handleAddItem}
                    >Need to Add an Item?
                    </button>
                </Col>
            </div>
        )
    }
}