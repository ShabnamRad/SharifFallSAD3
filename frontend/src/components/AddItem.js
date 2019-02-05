import React, {Component} from "react";
import Col from 'react-bootstrap/lib/Col';

export default class AddItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            code: "",
            brand: "",
            store: "",
            price: "",
            addItemDone: false,
            showError: false,
            error: "Couldn't add the item!"
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.code.length > 0 &&
            this.state.brand.length > 0 &&
            this.state.store.length > 0 &&
            this.state.price > 0
        );
    }

    handleKeyUp = event => {
        if (event.target.value.length) {
            event.currentTarget.setAttribute('class', 'form-group');
        } else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
        if (event.target.id === 'itemPrice' && !(event.target.value > 0)) {
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
            code: event.target.value
        });
    };

    handleBrandChange = event => {
        this.setState({
            brand: event.target.value
        });
    };

    handleStoreChange = event => {
        this.setState({
            store: event.target.value
        });
    };

    handlePriceChange = event => {
        this.setState({
            price: event.target.value
        });
    };

    handleSubmit = event => {
        event.preventDefault();
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/items/items/', {
            method: "POST",
            body: JSON.stringify({
                name: that.state.name,
                code: that.state.code,
                // brand: that.state.brand,
                // store: that.state.store,
                price: that.state.price
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: "same-origin"
        }).then(function (response) {
            if (response.status === 200) {
                that.setState({
                    addItemDone: true,
                    login_response: response
                })
            } else {
                that.setState({
                    showError: true,
                    error: response.statusText + "!"
                })
            }
            return response;
        }, function (error) {
            that.setState({
                showError: true,
                error: error.message()
            })
        });
    };

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}
                 style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    {this.state.addItemDone && <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Well done!</strong> Your request for adding this item was submitted successfully!
                    </div>}
                    {this.state.showError && <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">×</button>
                        <strong>Error! </strong>{this.state.error}</div>}
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Add Item</legend>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label" htmlFor="itemName">
                                    Name</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        autoFocus
                                        type="text"
                                        id="itemName"
                                        className="form-control"
                                        placeholder="item name"
                                        value={this.state.name}
                                        onChange={this.handleNameChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="itemBarcode">Code</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="text"
                                        id="itemBarcode"
                                        className="form-control"
                                        placeholder="item code"
                                        value={this.state.code}
                                        onChange={this.handleBarcodeChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="itemBrand">Brand</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="text"
                                        id="itemBrand"
                                        className="form-control"
                                        placeholder="Name of the producer company"
                                        value={this.state.brand}
                                        onChange={this.handleBrandChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="itemStore">Store</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <input
                                        type="text"
                                        id="itemStore"
                                        className="form-control"
                                        placeholder="Which store are you at?"
                                        value={this.state.store}
                                        onChange={this.handleStoreChange}
                                    /></Col>
                            </div>
                            <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                <label className="col-xs-2 col-sm-2 col-lg-2 col-xl-2 control-label"
                                       htmlFor="itemPrice">Price</label>
                                <Col xs={10} sm={9} md={8} lg={8}>
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            id="itemPrice"
                                            className="form-control"
                                            placeholder="How much does it cost in this store?"
                                            value={this.state.price}
                                            onChange={this.handlePriceChange}
                                        /><span className="input-group-addon">$</span>
                                    </div>
                                </Col>
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