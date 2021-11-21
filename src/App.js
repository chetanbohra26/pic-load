import React from "react";

import Navbar from "./components/navbar";
import "react-toastify/dist/ReactToastify.min.css";

import { connect } from "react-redux";
import { setUser, removeUser } from "./actions/userActions";

import { ToastContainer } from "react-toastify";
import { Redirect, Route, Switch } from "react-router";
import Login from "./components/login/login";
import Home from "./components/home";
import AddPost from "./components/addPost";

class App extends React.Component {
    render() {
        return (
            <div
                className="d-flex bg-gradient flex-column"
                style={{ height: "100vh" }}
            >
                <ToastContainer />
                <Navbar
                    user={this.props.user}
                    onRemoveUser={this.props.removeUser}
                />
                <Switch>
                    <Route
                        path="/login"
                        render={(props) => (
                            <Login {...props} user={this.props.user} />
                        )}
                    />
                    <Route
                        path="/addPost"
                        render={(props) => <AddPost {...props} />}
                    />
                    <Route
                        exact
                        path="/"
                        render={(props) => (
                            <Home
                                {...props}
                                user={this.props.user}
                                onSetUser={this.props.setUser}
                            />
                        )}
                    />
                    <Redirect path="*" to="/" />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => {
            dispatch(setUser(user));
        },
        removeUser: () => {
            dispatch(removeUser());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
