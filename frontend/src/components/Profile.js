import React, {Component} from 'react';
import Col from "react-bootstrap/lib/Col";
import {NavLink} from "react-router-dom";
import axios from "axios";

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profile: null
        }
    }

    componentWillMount() {

        //temporary
        this.setState({
            profile: {
                username: "arashMoayyedi",
                first_name: "Arash",
                last_name: "moayyedi",
                email: "arash.moayyedi1@gmail.com",
                image: "https://ct.cs.univie.ac.at/fileadmin/user_upload/i_ct/img/person/arash2.jpg",
                type: "Store/Company Owner",
                contactInfo: "Rasht, Iran",
                propertyName: "porteghal-foroushi",
                propertyDesc: "portheghal foroukhte mishavad",
                regID: "16274gjhgj21",
                propType: "Store",
                storeLocation: "Rasht, khiaban akbari",
                storeWH: "everyday, 8:00 - 19:00"
            }
        });

        axios.defaults.headers.common = {'Authorization': 'Token ' + sessionStorage.getItem('token')};
        const that = this;
        axios.get('http://127.0.0.1:8000/api/v1/accounts/current_user').then(response => {
            if (response.status === 200) {
                console.log(response.data.username);
                that.setState({
                    profile: response.data
                });
            } else {
                console.log("wtfhellkhiar")
            }
            return response;
        }, function (error) {
            console.log(error.message); //=> String
        });



    };

    render() {
        return (
            <Col xs={12} md={10} mdOffset={1} lg={10} lgOffset={1} sm={10} smOffset={1} style={{marginTop: "50px"}}>
                <div className="well bs-component">
                    <div style={{display: "flex"}}>
                        <img src={this.state.profile.image} alt="item"
                             style={{width: "400px", height: "400px", marginRight: "50px"}}/>
                        <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                            <h5>Username: {this.state.profile.username}</h5>
                            <h5>First Name: {this.state.profile.first_name}</h5>
                            <h5>Last Name: {this.state.profile.last_name}</h5>
                            <h5>Email: {this.state.profile.email}</h5>
                            <h5>Type: {this.state.profile.type}</h5>
                            <h5>Contact Info: {this.state.profile.contactInfo}</h5>
                            <h5>Property Name: {this.state.profile.propertyName}</h5>
                            <h5>Property Description: {this.state.profile.propertyDesc}</h5>
                            <h5>regID: {this.state.profile.regID}</h5>
                            <h5>Property Type: {this.state.profile.propType}</h5>
                            <h5>Store Location: {this.state.profile.storeLocation}</h5>
                            <h5>Store Working Hours: {this.state.profile.storeWH}</h5>
                        </div>
                    </div>
                    <NavLink to={"/account/edit"} activeClassName="is-active" className='btn btn-primary'>Edit Profile</NavLink>
                </div>
            </Col>
        )
    }
}