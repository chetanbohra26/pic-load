import React, { Component } from "react";
import { toast } from "react-toastify";
import { fetchTokenAndData } from "../util/token";

class Home extends Component {
    componentDidMount() {
        const data = fetchTokenAndData();
        if (data && data.payload) {
            this.props.onSetUser({
                id: data.payload.id,
                name: data.payload.name,
                email: data.payload.email,
            });
        }
    }
    getUserGreeting() {
        const name = this.props.user.name;
        return `Welcome ${name}`;
    }
    handleAddPost() {
        if (this.props.user && this.props.user.id) {
            this.props.history.replace("/addPost");
        } else {
            toast.error("User must be logged in to post");
        }
    }
    render() {
        return (
            <div className="d-flex flex-column flex-grow-1 flex-shrink-1 align-items-start">
                {this.getUserGreeting()}
                {this.props.user && this.props.user.id && (
                    <button
                        className="btn btn-primary rounded-circle btn-lg position-fixed bottom-0 end-0 m-4"
                        onClick={() => this.handleAddPost()}
                        title="Add a new post"
                    >
                        +
                    </button>
                )}
            </div>
        );
    }
}

export default Home;
