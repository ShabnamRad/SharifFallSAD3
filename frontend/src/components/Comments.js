import React, {Component} from 'react';
import Comment from './Comment';

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            comments: props.comments,
            what_to_render: null
        }
    }

    componentWillMount() {
        let rows = [];
        for (let i = 0; i < this.state.comments.length; i++) {
            rows.push(<Comment key={i} comment={this.state.comments[i]}/>);
        }
        this.setState({
            what_to_render: <div>{rows}</div>
        })
    }

    render() {
        return (
            <div>{this.state.what_to_render}</div>
        );
    }
}