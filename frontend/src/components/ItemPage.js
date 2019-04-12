import React, {Component} from 'react';
import Col from "react-bootstrap/lib/Col";
import Rating from "react-rating";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import axios from "axios";

export default class ItemPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item: {
                rating: {
                    score_avg: 0
                }
            },
            imageCounter: 0
        }
    }

    componentWillMount() {
        const itemCode = this.props.match.params.itemCode;

        const that = this;
        axios.get('http://127.0.0.1:8000/api/v1/items/items/' + itemCode + "/")
            .then(response => {
                that.setState({
                    item: response.data
                });
                return response;
            }).catch(error => {
            console.log(error.message); //=> String
        });
        //temporary
        // this.setState({
        //     item: {
        //         name: "Split Peas",
        //         brand: "Holia",
        //         itemPage: "/items/"+itemCode,
        //         code: itemCode,
        //         price: "$10",
        //         img1: "http://localhost:8080/images/lappe1.png",
        //         img2: "http://localhost:8080/images/lappe2.png",
        //         img3: "http://localhost:8080/images/lappe3.png",
        //         img4: "http://localhost:8080/images/lappe4.png",
        //         img5: "http://localhost:8080/images/lappe3.png",
        //         description: "Holia Split Peas is a new product of the company which was found popular as soon as it came to markets. Pure oil is used it it!",
        //         rating: {score__avg: "3.5"},
        //         comments: [
        //             [
        //                 "Name of user 1",
        //                 2,
        //                 "comment of user 1"
        //             ],
        //             [
        //                 "Name of user 2",
        //                 4,
        //                 "comment of user 2"
        //             ]
        //         ]
        //     }
        // });

    };

    handlePicChange = () => {
        this.setState({
            imageCounter: (this.state.imageCounter + 1)%5
        })
    };

    getImage = () => {
        switch (this.state.imageCounter) {
            case 0:
                return this.state.item.img1;
            case 1:
                return this.state.item.img2;
            case 2:
                return this.state.item.img3;
            case 3:
                return this.state.item.img4;
            case 4:
                return this.state.item.img5;
            default:
                return null;
        }
    };

    handleRating = (value) => {
        console.log("rating sent. value: " + value + " item: " + this.state.item.code);
        const that = this;
        fetch('http://127.0.0.1:8000/api/v1/items/rate/', {
            method: "POST",
            body: JSON.stringify({
                score: value,
                comment: null,
                user: 1,
                item: that.state.item.code
            }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Token " + sessionStorage.getItem('token')
            },
            credentials: "same-origin"
        }).then(function (response) {
            return response.text();
        }, function (error) {
            console.log(error.message); //=> String
        });
    };

    render() {
        return (
            <div>
                <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                    <div className="well bs-component">
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            {this.getImage() && <img src={this.getImage()} alt="item"
                                 style={{width: "400px", height: "400px", marginRight: "50px"}} onClick={this.handlePicChange}/>}
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
                                    <Rating placeholderRating={this.state.item.rating.score__avg}
                                            onChange={this.handleRating}/>
                                    <h6>barcode: {this.state.item.code}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                    <div className="well bs-component">
                        <CommentForm item={this.state.item}/>
                        <Comments comments={this.state.item.comments}/>

                    </div>
                </Col>
            </div>
        )
    }
}