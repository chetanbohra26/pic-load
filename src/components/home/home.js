import React, { Component } from "react";
import { fetchTokenAndData } from "../../util/token";

class Home extends Component {
    componentDidMount() {
        const data = fetchTokenAndData();
        if (data && data.payload) {
            this.props.onSetUser({
                id: data.payload.id,
                userName: data.payload.name,
                email: data.payload.email,
            });
        }
    }
    getUserGreeting() {
        const name = this.props.user.userName;
        return `Welcome ${name}`;
    }
    render() {
        return <div>{this.getUserGreeting()}</div>;
    }
}

export default Home;
