import React, {Component} from 'react';
import Col from "react-bootstrap/lib/Col";
import {Redirect} from "react-router-dom";
import axios from "axios";

export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInput: "",
            redirect: false,
            redirectToAddItem: false,
            logged_in: false,
            itemList: null
        };
    }

    componentWillMount() {
        axios.defaults.headers.common = {'Authorization': 'Token ' + sessionStorage.getItem('token')};
        const that = this;
        axios.get('http://127.0.0.1:8000/api/v1/accounts/current_user')
            .then(response => {
                if (response.status === 200) {
                    that.setState({
                        logged_in: true
                    });
                } else {
                    that.setState({
                        logged_in: false
                    });
                }
                return response;
            }).catch(error => {
            that.setState({
                logged_in: false
            });
        });
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
        } else {
            event.currentTarget.setAttribute('class', 'form-group has-error');
        }
    };

    handleSubmit = event => {
        event.preventDefault();
        const key = {'Authorization': 'Token ' + sessionStorage.getItem('token')};
        console.log(key);
        axios.defaults.headers.common = key;
        const that = this;
        axios.get('http://127.0.0.1:8000/api/v1/items/items/?search=' + this.state.searchInput)
            .then(response => {
                that.setState({
                    itemList: response.data,
                    redirect: true
                });
                return response;
            }).catch(error => {
            console.log(error.message); //=> String
        });
    };

    handleAddItem = event => {
        event.preventDefault();
        this.setState({
            redirectToAddItem: true
        })
    };

    render() {
        if (this.state.redirect) {
            const that = this;
            return <Redirect to={{
                pathname: "/results",
                state: {
                    itemsList: that.state.itemList
                    //     [
                    //     {name: "Split Peas", brand: "Holia",  itemPage: "/items/holiaSplitPeas", code: "214142", price: "$10", imgsrc: "http://localhost:8080/images/lappe1.png"},
                    //     {name: "Split Peas", brand: "Golzar", itemPage: "/items/golzarSplitPeas", code: "34534", price: "$12", imgsrc: "http://localhost:8080/images/lappe2.png"},
                    //     {name: "Split Peas", brand: "Mosamma", itemPage: "/items/mosamaSplitPeas", code: "346lkn23", price: "$8", imgsrc: "http://localhost:8080/images/lappe3.png"},
                    //     {name: "Split Peas", brand: "Hamgol", itemPage: "/items/hamgolSplitPeas", code: "345iejt", price: "$11", imgsrc: "http://localhost:8080/images/lappe4.png"}
                    // ]
                }
            }}/>;
        }
        if (this.state.redirectToAddItem)
            return <Redirect push to="/addItem"/>
        return (
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center", padding: "25vh 0"}}>
                <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1}>
                    <div className="well bs-component">
                        <form className="form-horizontal" onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Search Item Or Barcode</legend>
                                <div className="form-group" onChange={this.handleKeyUp} onKeyUp={this.handleKeyUp}>
                                    <label className="col-xs-1 col-sm-1 col-lg-1 col-xl-1"
                                           style={{alignItems: "center"}}><img
                                        src="http://localhost:8080/images/search-icon.png" alt="search icon"
                                        style={{width: "40px", height: "40px", marginLeft: "10px"}}/></label>
                                    <Col xs={10} sm={9} md={9} lg={9}>
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
                                        className='btn btn-primary'
                                        style={{display: "inline-block", textAlign: "center"}}
                                        disabled={!this.validateForm()}
                                        type="submit"
                                    >Search
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <button
                        className='btn btn-default col-xs-offset-3 col-sm-offset-4 col-md-offset-4 col-lg-offset-4 col-xs-5 col-sm-4 col-md-4 col-lg-4'
                        onClick={this.handleAddItem}
                    >Need to Add an Item?
                    </button>
                </Col>
            </div>
        )
    }
}