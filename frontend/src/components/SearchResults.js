import React, {Component} from "react";
import Col from "react-bootstrap/lib/Col";

export default class SearchResults extends Component {
    constructor(props) {
        super(props);

        this.state = this.handleState()
    }

    handleState = () => {
        const itemsList = this.props.location.state.itemsList;
        let rows = [];
        for (let i = 0; i < itemsList.length; i++) {
            rows.push(<a key={i} className="list-group-item" href={itemsList[i].itemPage}>
                {<div style={{display: "flex", justifyContent: "space-between"}}>
                    <h2 style={{float: "left"}}><img src={itemsList[i].imgsrc} alt="item" style={{width: "80px", height: "80px"}}/>
                    {itemsList[i].name + ", Brand: " + itemsList[i].brand}
                    <h6>barcode: {itemsList[i].code}</h6>
                    </h2>
                    <p style={{float: "right", margin: "auto 10px", fontSize: "25px", fontWeight: "bold"}}>{itemsList[i].price}</p>
                </div>
                }
                </a>);
        }
        return {
            namesList: <div>{rows}</div>
        };
    };

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="list-group table-of-contents">
                    {this.state.namesList}
                </div>
            </Col>
        );
    }
}