import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import Col from 'react-bootstrap/lib/Col';

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            barcode: "",
            storeList: [],
            redirect: false
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.barcode.length > 0
        );
    }

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        }
        else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleNameChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    handleBarcodeChange = event => {
        this.setState({
            barcode: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        this.setState({
            redirect: true
        })
    };

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/"/>;
        }
        return (
            <Col xs={10} xsOfffset={1} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add Item</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="itemName">
                                    Name</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="itemName"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={this.state.name}
                                        onChange={this.handleNameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="itemBarcode">Barcode</label>
                                <Col xs={8} sm={8} md={8} lg={8}>
                                    <input
                                        type="email"
                                        id="itemBarcode"
                                        className="form-control"
                                        placeholder="Email"
                                        value={this.state.barcode}
                                        onChange={this.handleBarcodeChange}
                                    /></Col>
                            </div>
                            <Col xs={2} sm={2} md={2} lg={2} xsOffset={2} smOffset={2} mdOffset={2} lgOffset={2}>
                                <button
                                    className='btn btn-primary'
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >Request to Add Item
                                </button>
                            </Col>
                        </fieldset>
                    </form>
                </div>
            </Col>
        );
    }
}