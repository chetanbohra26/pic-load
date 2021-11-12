import React, { Component } from "react";
import { fetchTokenAndData } from "../../util/token";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { id: "", email: "", name: "User" },
        };
    }
    componentDidMount() {
        const data = fetchTokenAndData();
        if (data && data.payload) this.setState({ data: data.payload });
    }
    getUserGreeting() {
        const name = this.state.data.name;
        return `Welcome ${name}`;
    }
    render() {
        return <div>{this.getUserGreeting()}</div>;
    }
}

export default Home;
