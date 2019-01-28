import React, {Component} from 'react';
import Col from "react-bootstrap/lib/Col";
import Rating from "react-rating";

export default class ItemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: null,
            logged_in: false
        }
    }

    componentWillMount() {
        if (this.props.location.state) {
            this.setState({
                logged_in: this.props.location.state.logged_in
            });
        }

        const itemCode = this.props.match.params.itemCode;
        console.log(itemCode);

        const that = this;
        console.log('http://127.0.0.1:8000/api/v1/search/items/' + itemCode);
        fetch('http://127.0.0.1:8000/api/v1/search/items/' + itemCode, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function (response) {
            that.state.itemList = response.json();
            console.log(response);
            console.log(response.status);     //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers);    //=> Headers
            console.log(response.url);        //=> String
            this.setState({
                item: response.json()
            });
            return response.json();
        }, function (error) {
            console.log(error.message); //=> String
        });

        //temporary
        this.setState({
            item: {
                name: "Split Peas",
                brand: "Holia",
                itemPage: "/items/holiaSplitPeas",
                code: itemCode,
                price: "$10",
                imgsrc: "http://localhost:8080/images/lappe1.png",
                description: "Holia Split Peas is a new product of the company which was found popular as soon as it came to markets. Pure oil is used it it!",
                rating: {score__avg: "3.5"}
            },

        });

    };

    handleRating = (value) => {
        console.log("rating sent. value: " + value);
        fetch('http://127.0.0.1:8000/api/v1/rest-auth/login/', {
            method: "POST",
            body: JSON.stringify({
                score: value,
                item: this.state.item
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "same-origin"
        }).then(function (response) {
            console.log((response));
            console.log(response.status);     //=> number 100–599
            console.log(response.statusText); //=> String
            console.log(response.headers);    //=> Headers
            console.log(response.url);        //=> String
            return response.text();
        }, function (error) {
            console.log(error.message); //=> String
        });
    };

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <img src={this.state.item.imgsrc} alt="item"
                             style={{width: "400px", height: "400px", marginRight: "50px"}}/>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <div>
                                <h2>{this.state.item.name + ", Brand: " + this.state.item.brand}</h2>
                                <p>{this.state.item.description}</p>
                            </div>
                            <div>
                                <p style={{
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                }}>Price: {this.state.item.price}</p>
                                <Rating placeholderRating={this.state.item.rating.score__avg} onChange={this.handleRating}/>
                                <h6>barcode: {this.state.item.code}</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
        )
    }
}