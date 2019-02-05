import React, {Component} from 'react';
import Comment from './Comment';

export default class Comments extends Component {
    constructor(props) {
        super(props);

        this.state = {
            what_to_render: <div> </div>
        }
    }

    componentWillReceiveProps(nextProps, nextContext) {
        const comments = nextProps.comments;
        const len = comments.length;
        let rows = [];
        for (let i = 0; i < len; i++) {
            rows.push(<Comment key={i} comment={comments[i]}/>);
            if(i === len - 1)
                break;
            rows.push(<hr style={{borderColor: "gray"}}/>);
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